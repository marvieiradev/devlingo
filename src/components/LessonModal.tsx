import { HiMiniXMark } from "react-icons/hi2";
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
  if (!selectedModuleId) return;

  const moduleStyles = {
    html: ["primary", "text-primary", "border-b-primary-light"],
    css: ["secondary", "text-secondary", "border-b-secondary-light"],
    js: ["variant", "text-variant", "border-b-variant-light"],
  } as any;

  const [style, styleText, styleBorder] =
    moduleStyles[selectedModuleId] ?? moduleStyles.js;

  const selectedModule = lessonsData.find(
    (module) => module.id === selectedModuleId
  );

  const unitLessons = selectedModule
    ? selectedModule.lessons.filter(
        (lesson) => lesson.unitId === selectedUnitId
      )
    : [];

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`, {
      state: {
        moduleId: selectedModuleId,
        styles: style,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative z-50 w-full max-w-2xl mx-4">
        <div
          className={`rounded-3xl bg-${style} border-b-6 border-b-${style}-dark text-default shadow-2xl`}
        >
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
                  <div className="mt-8 mb-8 w-[70%] mx-auto min-h-13.75">
                    <button
                      onClick={() => handleStartLesson(lesson.id)}
                      className={`w-full bg-default ${styleBorder} ${styleText} hover:border-none hover:transform hover:translate-y-1 shrink-0 px-4 sm:px-8 py-3 border-b-4 rounded-xl font-semibold uppercase text-center cursor-pointer`}
                    >
                      {completed
                        ? "Revisar"
                        : `Começar + ${lesson.xpReward} XP`}
                    </button>
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
              <HiMiniXMark className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
