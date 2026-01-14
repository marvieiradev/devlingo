export const ProgressBar = ({
  style,
  progress,
}: {
  style: string;
  progress: number;
}) => {
  const styleMap = {
    primary: ["bg-primary", "border-primary-light/30"],
    secondary: ["bg-secondary", "border-secondary-light/30"],
    variant: ["bg-variant", "border-variant-light/30"],
  } as any;

  const [bg = "", detail = ""] = styleMap[style] ?? [];

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
