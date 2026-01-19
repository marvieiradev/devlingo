import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { lessonsData } from "@/mocks/lessonsData";
import AnswerFeedbackPopUp from "@/components/AnswerFeedbackPopUp";
import { useAuth } from "@/contexts/AuthContext";
import { saveLessonsScore } from "@/services/saveLessonsScore";
import { PiBatteryChargingFill } from "react-icons/pi";
import Button from "@/components/Button";
import { updateUserProfile } from "@/services/updateCurrentModule";
import ProgressBar from "@/components/ProgressBar";

interface LessonModuleState {
  moduleId: string;
  styles: string;
}

const LessonScreen = () => {
  const location = useLocation();
  const { moduleId, styles } = (location.state as LessonModuleState) || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedbackPopUp, setShowFeedbackPopUp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [clicked, setClicked] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const lessonModule = lessonsData.find((m) => m.id === moduleId);
  const lesson = lessonModule!.lessons.find((l) => l.id === lessonId);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const saveCurrentModule = () => {
    if (lesson?.unitId !== 10) return moduleId;

    const nextModule: Record<string, string> = {
      html: "css",
      css: "js",
      js: "html",
    };

    return nextModule[moduleId] ?? "html";
  };

  const styleMap = {
    primary: ["bg-primary/15", "border-primary"],
    secondary: ["bg-secondary/15", "border-secondary"],
    variant: ["bg-variant/15", "border-variant"],
  } as any;

  const [bg = "", border = ""] = styleMap[styles] ?? [];

  if (!lesson) {
    console.warn("[Lesson] lesson not found", { lessonId });
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">Lição não encontrada</p>
          <Button
            variant="primary"
            text="Voltar"
            action={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleCheck = async () => {
    if (selected === null || clicked) return;

    setClicked(true);

    const isAnswerCorrect = selected === currentQuestion.correctAnswer;

    setIsCorrect(isAnswerCorrect);

    setCorrectOption(
      currentQuestion.options
        ? currentQuestion.options[currentQuestion.correctAnswer as number]
        : ""
    );

    if (isAnswerCorrect) {
      const nextCorrect = correctAnswers + 1;
      setCorrectAnswers(nextCorrect);
      setShowFeedbackPopUp(true);
      return;
    }

    const nextWrong = wrongAnswers + 1;
    const nextLives = lives - 1;
    setWrongAnswers(nextWrong);
    setLives(nextLives);

    if (nextWrong >= 3 && nextLives <= 0) {
      setShowFeedbackPopUp(false);

      navigate("/lesson-failure/", {
        state: {
          moduleId: moduleId,
          lessonId: lesson.id,
          correctAnswers: correctAnswers,
          wrongAnswers: nextWrong,
          totalQuestions,
          styles,
        },
      });
      return;
    }

    setShowFeedbackPopUp(true);
  };

  const handleContinue = async () => {
    setShowFeedbackPopUp(false);
    setClicked(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => {
        const next = prev + 1;
        return next;
      });
      setSelected(null);
      setIsCorrect(null);
    } else {
      console.log(loading);

      if (correctAnswers === totalQuestions) {
        if (user?.id) {
          setLoading(true);
          console.log(loading);
          try {
            const result = await saveLessonsScore({
              userId: user?.id,
              lessonId: lesson.id,
              correctAnswers: correctAnswers,
              wrongAnswers: wrongAnswers,
              xpEarned: lesson.xpReward,
            });

            const update = await updateUserProfile(user.id, {
              current_module: saveCurrentModule(),
            });

            console.debug("[Lesson] saved score successfully", result);
            console.debug("[Lesson] saved current module successfully", update);
          } catch (error) {
            console.error("[Lesson] error saving score/navigating:", error);
          }

          console.debug("[Lesson] navigating to success", {
            lessonId: lesson.id,
            xpEarned: lesson.xpReward,
            accuracy: 100,
          });
          navigate("/lesson-success/", {
            state: {
              lessonId: lesson.id,
              xpEarned: lesson.xpReward,
              accuracy: 100,
              time: seconds,
            },
          });
        }
      } else {
        console.debug("[Lesson] navigating to failure", {
          lessonId: lesson.id,
          correctAnswers,
          wrongAnswers,
          totalQuestions,
        });

        navigate("/lesson-failure/", {
          state: {
            lessonId: lesson.id,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            totalQuestions,
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-default max-w-3xl mx-auto text-foreground-light flex justify-center items-center">
        <span className="text-[60px]">...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-default max-w-3xl mx-auto ">
      <div className="sticky top-0 z-30 bg-default">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-foreground hover:text-foreground-dark cursor-pointer"
            aria-label="Fechar"
            onClick={() => navigate("/", { replace: true })}
          >
            <HiMiniXMark className="w-7 h-7" />
          </button>

          <div className="flex-1 px-6">
            <ProgressBar style={styles} progress={progress} />
          </div>

          <div className="flex items-center gap-2 text-batery-icon">
            <PiBatteryChargingFill className="w-6 h-6 sm:w-8 sm:h-8 " />
            <span className="font-semibold">{lives}</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl md:text-3xl font-bold text-foreground-dark mb-8">
          {currentQuestion.question}
        </h1>

        <div className="space-y-4">
          {currentQuestion.options?.map((label, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                disabled={clicked}
                key={label}
                onClick={() => setSelected(idx)}
                className={`w-full text-left rounded-2xl shadow-sm p-4 flex items-center justify-between $ ${
                  isSelected
                    ? `${bg} border-2 ${border} border-b-4`
                    : "bg-default  border-2 border-foreground-extralight hover:bg-foreground-extralight/50 border-b-4"
                }${clicked || loading ? " opacity-75 cursor-not-allowed" : ""}`}
              >
                <span className="text-foreground-dark">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div
            className={`${selected === null ? "opacity-50" : ""}${
              clicked ? "opacity-0 cursor-not-allowed" : ""
            }`}
          >
            <Button
              variant="success"
              text="VERIFICAR"
              action={handleCheck}
              disabled={clicked}
            />
          </div>
        </div>
      </div>

      <AnswerFeedbackPopUp
        open={showFeedbackPopUp}
        type={isCorrect ? "correct" : "incorrect"}
        correctOption={correctOption}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default LessonScreen;
