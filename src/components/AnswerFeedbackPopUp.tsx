import { Check, X } from "lucide-react";
import Button from "./Button";

type FeedbackType = "correct" | "incorrect";

interface AnswerFeedbackPopUpProps {
  open: boolean;
  type?: FeedbackType;
  correctOption?: string;
  onContinue?: () => void;
}

const AnswerFeedbackPopUp = ({
  open,
  type,
  correctOption,
  onContinue,
}: AnswerFeedbackPopUpProps) => {
  if (!open) return null;

  const isSuccess = type === "correct";

  const bg = isSuccess ? "bg-success-extralight" : "bg-error-light";
  const text = isSuccess ? "text-success-dark" : "text-error-dark";
  const Icon = isSuccess ? Check : X;
  const successPhrase = ["Na mosca!", "Muito bem!", "Parabéns!", "Excelente!"];
  const errorPhrase = [
    "Incorreto!",
    "Quase lá!",
    "Tente novamente!",
    "Não desista!",
  ];

  const phraseToShow = isSuccess
    ? successPhrase[Math.floor(Math.random() * successPhrase.length)]
    : errorPhrase[Math.floor(Math.random() * errorPhrase.length)];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 "
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`${bg} h-2`} />
        <div
          className={`w-full ${bg} ${text} px-8 py-4 pb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}
        >
          <div>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-default ${
                  isSuccess ? "bg-success" : "bg-error"
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="font-semibold  text-xl sm:text-2xl">
                {phraseToShow}
              </span>
            </div>
            {!isSuccess && (
              <p className="font-bold text-lg mt-2">
                Resposta correta:{" "}
                <span className="font-medium">{correctOption}</span>
              </p>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <Button
              variant={isSuccess ? "success" : "error"}
              text={isSuccess ? "Continuar" : "Ok!"}
              action={onContinue || (() => {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerFeedbackPopUp;
