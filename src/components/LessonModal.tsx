import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lessonsData } from "@/mocks/lessonsData";
import Button from "./Button";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnitId?: number;
  selectedModuleId?: string;
  completed: boolean;
}

const LessonModal = ({
  isOpen,
  onClose,
  selectedUnitId,
  selectedModuleId,
  completed,
}: LessonModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const selectedModule = lessonsData.find(
    (module) => module.id === selectedModuleId
  );

  const unitLessons = selectedModule
    ? selectedModule.lessons.filter(
        (lesson) => lesson.unitId === selectedUnitId
      )
    : [];

  const handleStartLesson = (lessonId: string) => {
    navigate(`/${selectedModuleId}/lesson/${lessonId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative z-50 w-full max-w-2xl mx-4">
        <div className="rounded-3xl bg-primary text-default shadow-2xl">
          <div className="px-8 pt-8 pb-4 flex items-start justify-between">
            <div className="w-full">
              {unitLessons.map((lesson) => (
                <div key={lesson.id}>
                  <h3 className="text-2xl font-bold tracking-wide text-center">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 text-center text-default/90">
                    {lesson.description}
                  </p>
                  <div
                    className="mt-8 mb-8 w-[70%] mx-auto"
                    onClick={() => handleStartLesson(lesson.id)}
                  >
                    <Button
                      variant="secondary"
                      text={
                        completed
                          ? "Revisar"
                          : `Começar + ${lesson.xpReward} XP`
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-3 right-3 text-default/90 hover:text-default transition cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
