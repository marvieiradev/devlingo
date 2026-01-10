export const Button = ({
  variant,
  text,
}: {
  variant: string;
  text: string;
}) => {
  switch (variant) {
    case "primary":
      variant =
        "bg-primary border-primary-dark text-default hover:border-primary-dark hover:bg-primary/50 hover:text-primary-dark";
      break;
    case "secondary":
      variant =
        "bg-default border-primary-light text-primary hover:text-default hover:border-default hover:bg-primary-dark";
      break;
    case "success":
      variant =
        "bg-success border-success-dark text-default hover:border-success hover:bg-success-dark";
      break;
    case "error":
      variant =
        "bg-error border-error-dark text-default hover:border-error hover:bg-error-dark";
      break;

    case "disabled":
      variant =
        "bg-foreground-extralight border-foreground-light/50 text-foreground-light/50 cursor-not-allowed";
      break;
  }
  return (
    <div
      className={`shrink-0 px-4 sm:px-8 py-3 border-b-4 rounded-xl font-semibold uppercase text-center cursor-pointer ${variant}`}
    >
      {text}
    </div>
  );
};

export default Button;
