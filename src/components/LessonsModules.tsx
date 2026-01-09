import { useNavigate } from "react-router-dom";
import IconTecnology from "./IconTecnology";

export const LessonsModules = () => {
  const navigate = useNavigate();
  const handleStartUnit = (lessonModule: string) => {
    navigate(`/${lessonModule}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden max-w-3xl mx-auto">
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-4">
          <div
            className="mt-4 rounded-xl bg-blue-400 text-white shadow-lg"
            onClick={() => handleStartUnit("html")}
          >
            <div className="flex gap-4 items-center px-6 py-6">
              <IconTecnology tecnology={"html"} />
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide">
                Módulo HTML
              </h2>
            </div>
          </div>

          <div
            className="mt-4 rounded-xl bg-blue-400 text-white shadow-lg"
            onClick={() => handleStartUnit("css")}
          >
            <div className="flex gap-4 items-center px-6 py-6">
              <IconTecnology tecnology={"css"} />
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide">
                Módulo CSS
              </h2>
            </div>
          </div>

          <div
            className="mt-4 rounded-xl bg-blue-400 text-white shadow-lg"
            onClick={() => handleStartUnit("js")}
          >
            <div className="flex gap-4 items-center px-6 py-6">
              <IconTecnology tecnology={"js"} />
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide">
                Módulo JavaScript
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsModules;
