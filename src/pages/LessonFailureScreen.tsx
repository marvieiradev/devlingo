import Char from "@/assets/images/char.svg";
import Button from "@/components/Button";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

interface LessonFailureState {
  moduleId: string;
  lessonId: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  styles: string;
}

const LessonFailureScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    moduleId,
    lessonId,
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    styles,
  } = (location.state as LessonFailureState) || {};

  const accuracyPercent =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const handleTryAgain = () => {
    if (lessonId) {
      navigate(`/lesson/${lessonId}`, {
        replace: true,
        state: { moduleId, styles },
      });
    } else {
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center max-w-3xl mx-auto">
      <div className="w-full max-w-2xl px-4 sm:px-0">
        <div className="flex justify-center">
          <img
            src={Char}
            alt="Mascote"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-foreground-dark text-center">
          Você quase conseguiu!
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Continue praticando para melhorar
        </p>
        <div className="mt-10 flex items-stretch gap-2 justify-center">
          <div className="w-25 h-20 p-1 pt-1 bg-success rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              CORRETAS
            </span>
            <div className=" bg-default h-12 rounded-lg text-success flex items-center justify-center gap-2 px-4">
              <FaCheckCircle className="h-5 w-5" />
              <span className="text-xl font-bold">{correctAnswers}</span>
            </div>
          </div>

          <div className="w-25 h-20 p-1 pt-1 bg-error rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              INCORRETAS
            </span>
            <div className="bg-default h-12 rounded-lg text-error flex items-center justify-center gap-2 px-4">
              <FaCircleXmark className="h-5 w-5" />
              <span className="text-xl font-bold">{wrongAnswers}</span>
            </div>
          </div>

          <div className="w-25 h-20 p-1 pt-1 bg-primary rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              PRECISÃO
            </span>
            <div className="bg-default h-12 rounded-lg text-primary flex items-center justify-center gap-2 px-2">
              <TbTargetArrow className="h-6 w-6" />
              <span className="text-xl font-bold">{accuracyPercent}%</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4 ">
          <Button
            variant="disabled"
            text="VOLTAR"
            action={() => navigate("/")}
          />

          <Button
            variant="success"
            text="TENTAR NOVAMENTE"
            action={handleTryAgain}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonFailureScreen;
