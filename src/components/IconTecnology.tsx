import { CodeXml, FileBracesCorner } from "lucide-react";
import "../styles/global.css";

const IconTecnology = ({ tecnology }: { tecnology: string }) => {
  return (
    <>
      {tecnology === "js" && (
        <span className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black text-sm font-bold w-7 h-7 select-none">
          JS
        </span>
      )}

      {tecnology === "css" && (
        <span className="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-xs font-bold w-7 h-7 select-none">
          <FileBracesCorner />
        </span>
      )}

      {tecnology === "html" && (
        <span className="inline-flex items-center justify-center rounded-md bg-orange-400 text-white text-sm font-bold w-7 h-7 select-none">
          <CodeXml />
        </span>
      )}
    </>
  );
};

export default IconTecnology;
