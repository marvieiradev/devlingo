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

  const style = () => {
    let styleModule;
    switch (module) {
      case "html":
        styleModule = "bg-primary border-b-primary-dark text-default";
        break;
      case "css":
        styleModule = "bg-secondary border-b-secondary-dark text-default";
        break;
      case "js":
        styleModule = "bg-variant border-b-variant-dark text-default";
        break;
    }
    return styleModule;
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`relative overflow-hidden flex items-center justify-center w-18 h-18 rounded-full drop-shadow-lg  border-b-6 ${
          !isLocked
            ? style()
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
