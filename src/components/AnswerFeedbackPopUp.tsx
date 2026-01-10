import { Check, X } from "lucide-react";
import Button from "./Button";

type FeedbackType = "correct" | "incorrect";

interface AnswerFeedbackPopUpProps {
  open: boolean;
  type?: FeedbackType;
  onContinue?: () => void;
}

const AnswerFeedbackPopUp = ({
  open,
  type,
  onContinue,
}: AnswerFeedbackPopUpProps) => {
  if (!open) return null;

  const isSuccess = type === "correct";

  const bg = isSuccess ? "bg-success-light/50" : "bg-error-light/50";
  const border = isSuccess ? "border-success" : "border-error";
  const text = isSuccess ? "text-success-dark" : "text-error-dark";
  const Icon = isSuccess ? Check : X;

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-50 "
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div
          className={`w-full ${bg} ${text} border ${border} rounded-2xl shadow-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-default ${
                  isSuccess ? "bg-success" : "bg-error"
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="font-semibold  text-xl sm:text-2xl">
                {isSuccess ? "Na mosca!" : "Incorreto!"}
              </span>
            </div>
            {!isSuccess && (
              <p className="font-bold text-lg mt-2">
                Teste: <span className="font-medium">0001</span>
              </p>
            )}
          </div>

          <div onClick={onContinue} className="w-full sm:w-auto">
            <Button
              variant={isSuccess ? "success" : "error"}
              text={isSuccess ? "Continuar" : "Ok!"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerFeedbackPopUp;
