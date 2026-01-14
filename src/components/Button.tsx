export const Button = ({
  variant,
  text,
  action,
  disabled,
}: {
  variant: string;
  text: string;
  action: () => void;
  disabled?: boolean;
}) => {
  switch (variant) {
    case "primary":
      variant = "bg-primary border-primary-dark text-default ";
      break;
    case "secondary":
      variant = "bg-default border-primary-light text-primary ";
      break;
    case "signup":
      variant = "bg-primary-light border-primary-dark text-primary-dark ";
      break;
    case "success":
      variant = "bg-success border-success-dark text-default ";
      break;
    case "error":
      variant = "bg-error border-error-dark text-default ";
      break;

    case "disabled":
      variant =
        "bg-foreground-extralight border-foreground-light text-foreground-light";
      break;
  }
  return (
    <div className="min-h-13.75">
      <button
        disabled={disabled}
        className={`w-full hover:border-none hover:transform hover:translate-y-1 shrink-0 px-4 sm:px-8 py-3 border-b-4 rounded-xl font-semibold uppercase text-center cursor-pointer ${variant}`}
        onClick={action}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
