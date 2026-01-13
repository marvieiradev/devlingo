import Char from "@/assets/images/char.svg";
import Goal from "@/assets/images/goal.svg";
import LessonNode from "./LessonNode";
import { useState } from "react";
import LessonModal from "./LessonModal";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";
import { lessonsData } from "@/mocks/lessonsData";
import { useUserProfile } from "@/hooks/useUserProfile";

const LessonsPath = ({ module }: { module: string }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { completedLessons } = useCompletedLessons();

  const { profile } = useUserProfile();

  const mapUnitToLessonId = (unitId: number): string | null => {
    const lessonModule = lessonsData.find((m) => m.id === module);
    const lesson = lessonModule!.lessons.find((l) => l.unitId === unitId);

    const id = lesson?.id ?? null;
    return id;
  };

  const handleUnitClick = (
    unitId: number,
    status: "available" | "completed" | "locked"
  ) => {
    if (status === "available" || status === "completed") {
      setSelectedUnitId(unitId);
      setSelectedModuleId(module);
      setIsModalOpen(true);
      status === "completed" ? setHasCompleted(true) : setHasCompleted(false);
    }
  };

  const getUnitStatus = (
    unitId: number
  ): "available" | "completed" | "locked" => {
    const lessonId = mapUnitToLessonId(unitId);
    const prevLessonId = mapUnitToLessonId(unitId - 1);

    const isCompleted = !!lessonId && completedLessons.includes(lessonId);
    if (isCompleted) {
      return "completed";
    }

    if (unitId === 1 && module === profile?.current_module) {
      return "available";
    }

    if (prevLessonId && completedLessons.includes(prevLessonId)) {
      return "available";
    }

    return "locked";
  };

  return (
    <div className="relative w-full flex justify-center py-8 max-w-3xl mx-auto">
      <div className="flex flex-col gap-4">
        <LessonNode
          status={getUnitStatus(1)}
          onClick={() => handleUnitClick(1, getUnitStatus(1))}
          type="star"
        />

        <div style={{ transform: "translateX(-40px)" }}>
          <LessonNode
            status={getUnitStatus(2)}
            onClick={() => handleUnitClick(2, getUnitStatus(2))}
            type="star"
          />
        </div>

        <div
          className="relative w-full flex justify-center"
          style={{ transform: "translateX(-60px)" }}
        >
          <LessonNode
            status={getUnitStatus(3)}
            onClick={() => handleUnitClick(3, getUnitStatus(3))}
            type="star"
          />

          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-24">
            <div className="w-32 h-32 animate-float">
              <img
                src={Char}
                alt="Mascote"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div style={{ transform: "translateX(-40px)" }}>
          <LessonNode
            status={getUnitStatus(4)}
            onClick={() => handleUnitClick(4, getUnitStatus(4))}
            type="star"
          />
        </div>

        <div style={{ transform: "translateX(0px)" }}>
          <LessonNode
            status={getUnitStatus(5)}
            onClick={() => handleUnitClick(5, getUnitStatus(5))}
            type="star"
          />
        </div>

        <div style={{ transform: "translateX(40px)" }}>
          <LessonNode
            status={getUnitStatus(6)}
            onClick={() => handleUnitClick(6, getUnitStatus(6))}
            type="star"
          />
        </div>

        <div
          className="relative w-full flex justify-center"
          style={{ transform: "translateX(60px)" }}
        >
          <LessonNode
            status={getUnitStatus(7)}
            onClick={() => handleUnitClick(7, getUnitStatus(7))}
            type="star"
          />

          <div className="absolute right-55 top-1/2 -translate-y-1/2 translate-x-24">
            <div className="w-28 h-28 animate-float">
              <img
                src={Goal}
                alt="Meta"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div style={{ transform: "translateX(40px)" }}>
          <LessonNode
            status={getUnitStatus(8)}
            onClick={() => handleUnitClick(8, getUnitStatus(8))}
            type="star"
          />
        </div>

        <div style={{ transform: "translateX(0px)" }}>
          <LessonNode
            status={getUnitStatus(9)}
            onClick={() => handleUnitClick(9, getUnitStatus(9))}
            type="star"
          />
        </div>

        <div style={{ transform: "translateX(-40px)" }}>
          <LessonNode
            status={getUnitStatus(10)}
            onClick={() => handleUnitClick(10, getUnitStatus(10))}
            type="trophy"
          />
        </div>
      </div>

      <LessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedUnitId={selectedUnitId ?? undefined}
        selectedModuleId={selectedModuleId ?? undefined}
        completed={hasCompleted}
      />
    </div>
  );
};

export default LessonsPath;
