export const Separator = ({ module }: { module: string }) => {
  return (
    <div className="flex justify-center items-center px-6">
      <div className="w-full h-1 rounded-full bg-foreground-light"></div>
      <p className="font-semibold text-foreground-light p-4">{module}</p>
      <div className="w-full h-1 rounded-full bg-foreground-light"></div>
    </div>
  );
};

export default Separator;
