import { FaStar, FaTrophy } from "react-icons/fa6";
import Shine from "@/assets/images/shine.svg";

interface LessonNodeProps {
  status: "locked" | "completed" | "available";
  onClick?: () => void;
  type: "star" | "trophy";
  module: "html" | "css" | "js";
}

const LessonNode = ({ status, onClick, type, module }: LessonNodeProps) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isStar = type === "star";
  const isTrophy = type === "trophy";

  const style = {
    html: "bg-primary border-b-primary-dark text-default",
    css: "bg-secondary border-b-secondary-dark text-default",
    js: "bg-variant border-b-variant-dark text-default",
  }[module];

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`relative overflow-hidden flex items-center justify-center w-18 h-18 rounded-full drop-shadow-lg border-b-6 cursor-pointer hover:scale-[105%] ${
          !isLocked
            ? style
            : "bg-foreground-extralight border-b-foreground-light text-foreground-light"
        }`}
      >
        {isCompleted && (
          <img src={Shine} alt="" className="object-cover relative z-0" />
        )}
        {isTrophy && <FaTrophy className="w-9 h-9  absolute z-99" />}
        {isStar && <FaStar className="w-9 h-9  absolute z-99" />}
      </button>
    </div>
  );
};

export default LessonNode;
