export const ProgressBar = ({
  style,
  progress,
}: {
  style: string;
  progress: number;
}) => {
  let bg = "";
  let detail = "";

  switch (style) {
    case "primary":
      bg = "bg-primary";
      detail = "bg-primary-light/30";
      break;
    case "secondary":
      bg = "bg-secondary";
      detail = "bg-secondary-light/30";
      break;
    case "variant":
      bg = "bg-variant";
      detail = "bg-variant-light/30";
      break;
  }

  return (
    <div
      className={`h-4 w-full bg-foreground-extralight/50 rounded-full overflow-hidden`}
    >
      <div
        className={`relative h-full  transition-all duration-500 pt-1 ${bg}`}
        style={{ width: `${progress}%` }}
      >
        <div className={`h-1/3 relative z-99 ${detail}`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
