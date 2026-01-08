import { useState } from "react";
import { X } from "lucide-react";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { lessonsData } from "@/mocks/lessonsData";
import AnswerFeedbackPopUp from "@/components/AnswerFeedbackPopUp";
import { useAuth } from "@/contexts/AuthContext";
import { saveLessonsScore } from "@/services/saveLessonsScore";

const LessonScreen = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();

  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedbackPopUp, setShowFeedbackPopUp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
    <div className="min-h-screen bg-white max-w-3xl mx-auto">
      <div className="sticky top-0 z-30 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            aria-label="Fechar"
            onClick={() => navigate(-1)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 px-6">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-blue-400`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#EF4444]">
            <IoHeart className="w-5 h-5" />
            <span className="text-gray-800">{lives}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
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
                    ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="text-gray-900">{label}</span>
                <span className="text-gray-500 text-sm">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button className="px-5 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold cursor-pointer">
            PULAR
          </button>

          <button
            className={`px-6 py-3 rounded-xl bg-green-500 text-white font-bold cursor-pointer ${
              selected === null ? "opacity-50" : ""
            }`}
            disabled={selected === null}
            onClick={handleCheck}
          >
            VERIFICAR
          </button>
        </div>
      </div>

      <AnswerFeedbackPopUp
        open={showFeedbackPopUp}
        type={isCorrect ? "correct" : "incorrect"}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default LessonScreen;
