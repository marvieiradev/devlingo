import { X, Check } from "lucide-react";
import Char from "@/assets/images/char.svg";
import { useNavigate } from "react-router-dom";
import { lessonsData } from "@/mocks/lessonsData";

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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-50 w-full max-w-2xl mx-4">
        <div className="rounded-3xl bg-blue-400 text-white shadow-2xl">
          <div className="px-8 pt-8 pb-4 flex items-start justify-between">
            <div className="w-full">
              <h3 className="text-2xl font-bold tracking-wide text-center">
                Escolha uma lição
              </h3>
              <p className="mt-2 text-center text-white/90">
                Unidade {selectedUnitId}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="ml-4 text-white/90 hover:text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-8 pb-10">
            {unitLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => handleStartLesson(lesson.id)}
                type="button"
                className="w-full text-left bg-blue-500/80 hover:bg-blue-600/50 transition rounded-2xl p-5 border border-blue-400/80 shadow-md cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-semibold">{lesson.title}</h4>
                    <p className="mt-1 text-sm text-white/90">
                      {lesson.description}
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      +{lesson.xpReward} XP
                    </p>
                  </div>
                  {completed && (
                    <span className="inline-flex items-center justify-center bg-green-500 rounded-full w-7 h-7 p-2">
                      <Check className="w-5 h-5 text-white font-semibold" />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-4 -right-6 w-28 h-28 sm:w-32 sm:h-32">
          <img
            src={Char}
            alt="Mascote"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
