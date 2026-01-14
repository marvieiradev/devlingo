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
  const variants: Record<string, string> = {
    primary: "bg-primary border-primary-dark text-default",
    secondary: "bg-default border-primary-light text-primary",
    signup: "bg-primary-light border-primary-dark text-primary-dark",
    success: "bg-success border-success-dark text-default",
    error: "bg-error border-error-dark text-default",
    disabled:
      "bg-foreground-extralight border-foreground-light text-foreground-light",
  };
  variant = variants[variant];

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
