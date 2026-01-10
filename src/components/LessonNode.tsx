import StarCompleted from "@/assets/images/star-completed.svg";
import StarEnabled from "@/assets/images/star-enabled.svg";
import StarDisabled from "@/assets/images/star-disabled.svg";

import GoalCompleted from "@/assets/images/goal-completed.svg";
import GoalEnabled from "@/assets/images/goal-enabled.svg";
import GoalDisabled from "@/assets/images/goal-disabled.svg";

interface LessonNodeProps {
  status: "locked" | "completed" | "available";
  onClick?: () => void;
  type: "star" | "trophy";
}

const LessonNode = ({ status, onClick, type }: LessonNodeProps) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isStar = type === "star";

  const nodeLocked = isStar ? StarDisabled : GoalDisabled;
  const nodeEnabled = isStar ? StarEnabled : GoalEnabled;
  const nodeCompleted = isStar ? StarCompleted : GoalCompleted;

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`
          relative
          transition-all duration-300 hover:scale-105
          ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <img
          src={
            isCompleted ? nodeCompleted : isLocked ? nodeLocked : nodeEnabled
          }
          alt={
            isLocked
              ? "Lição bloqueada"
              : isCompleted
              ? "Lição completada"
              : "Lição disponível"
          }
          className="w-18 h-18 object-contain drop-shadow-lg"
        />
      </button>
    </div>
  );
};

export default LessonNode;
