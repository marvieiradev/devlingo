import Home from "@/assets/images/home.svg";
import Config from "@/assets/images/config.svg";
import Bio from "@/assets/images/bio.svg";
import Exit from "@/assets/images/exit.svg";
import { useState } from "react";
import ExitModal from "./ExitModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExitClick = () => {
    setIsModalOpen(true);
  };
  return (
    <footer className="w-full bg-default max-w-3xl mx-auto border-t-2 border-foreground-light/65 ">
      <div className="mx-auto max-w-6xl px-8 py-3 flex items-center justify-around">
        <div className="flex items-center gap-2">
          <img src={Home} className="w-10 h-10 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Config} className="w-10 h-10 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Bio} className="w-10 h-10 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2" onClick={handleExitClick}>
          <img src={Exit} className="w-10 h-10 hover:scale-[110%]" />
        </div>
      </div>
      <ExitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;
