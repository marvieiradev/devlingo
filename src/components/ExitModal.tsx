import { HiMiniXMark } from "react-icons/hi2";
import Char from "@/assets/images/char/img-char-07.svg";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnitId?: number;
  selectedModuleId?: string;
  completed: boolean;
}

const ExitModal = ({ isOpen, onClose }: LessonModalProps) => {
  const { logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-50 w-full max-w-lg mx-4">
        <div
          className={`rounded-3xl bg-default border-b-6 border-primary-light text-foreground shadow-2xl`}
        >
          <div className="px-8 pt-8 pb-4 flex items-start justify-between">
            <div className="w-full items-center flex flex-col justify-center">
              <img
                src={Char}
                alt="Mascote"
                className="h-45 sm:h-65 object-contain animate-semirotate"
              />
              <h3 className="text-2xl font-bold tracking-wide text-center">
                Deseja fazer logout?
              </h3>
              <div className="flex gap-4 mt-10 mb-4 mx-auto items-center justify-around w-full min-h-13.75">
                <Button variant="error" text="Não" action={() => onClose()} />
                <Button variant="success" text="Sim" action={() => logout()} />
              </div>
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

export default ExitModal;
