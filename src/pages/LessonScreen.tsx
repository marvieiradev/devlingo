import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { replace, useParams } from "react-router";
import { lessonsData } from "@/mocks/lessonsData";
import AnswerFeedbackPopUp from "@/components/AnswerFeedbackPopUp";
import { useAuth } from "@/contexts/AuthContext";
import { saveLessonsScore } from "@/services/saveLessonsScore";
import { PiBatteryChargingFill } from "react-icons/pi";
import Button from "@/components/Button";

const LessonScreen = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();

  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedbackPopUp, setShowFeedbackPopUp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState<string>("");

  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  const lessonModule = lessonsData.find((m) => m.id === moduleId);
  const lesson = lessonModule!.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    console.warn("[Lesson] lesson not found", { lessonId });
    return;
  }
  /*if (!lesson) {
    console.warn("[Lesson] lesson not found", { lessonId });
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Lição não encontrada</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#58CC02] text-white px-6 py-2 rounded-xl cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }*/

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleCheck = async () => {
    if (selected === null) return;

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
        },
      });
      return;
    }

    setShowFeedbackPopUp(true);
  };

  const handleContinue = async () => {
    console.log("[Lesson] handleContinue", {
      currentQuestionIndex,
      counters: { correctAnswers, wrongAnswers, lives },
      totalQuestions,
    });
    setShowFeedbackPopUp(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => {
        const next = prev + 1;
        console.log("[Lesson] next question", {
          nextIndex: next,
          totalQuestions,
        });
        return next;
      });
      setSelected(null);
      setIsCorrect(null);
    } else {
      if (correctAnswers === totalQuestions) {
        if (user?.id) {
          try {
            const result = await saveLessonsScore({
              userId: user?.id,
              lessonId: lesson.id,
              correctAnswers: correctAnswers,
              wrongAnswers: wrongAnswers,
              xpEarned: lesson.xpReward,
            });

            console.debug("[Lesson] saved score successfully", result);
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

  return (
    <div className="min-h-screen bg-default max-w-3xl mx-auto">
      <div className="sticky top-0 z-30 bg-default">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-foreground hover:text-foreground-dark cursor-pointer"
            aria-label="Fechar"
            onClick={() => navigate(`/${moduleId}`, { replace: true })}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 px-6">
            <div className="h-4 w-full bg-primary-light/30 rounded-full overflow-hidden">
              <div
                className={`h-full bg-primary transition-all duration-500 pt-1`}
                style={{ width: `${progress}%` }}
              >
                <div className="h-1/3 bg-primary-light/50"></div>
              </div>
            </div>
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
                key={label}
                onClick={() => setSelected(idx)}
                className={`w-full text-left rounded-2xl border transition shadow-sm p-4 flex items-center justify-between ${
                  isSelected
                    ? "bg-primary-light/15 border-2 border-primary border-b-4"
                    : "bg-default  border-2 border-foreground-extralight hover:bg-foreground-extralight/50 border-b-4"
                }`}
              >
                <span className="text-foreground-dark">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div
            className={selected === null ? "opacity-50" : ""}
            onClick={handleCheck}
          >
            <Button variant="success" text="VERIFICAR" />
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
