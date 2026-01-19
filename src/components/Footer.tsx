import Home from "@/assets/images/icons/home.svg";
import Chest from "@/assets/images/icons/chest.svg";
import Dumbbell from "@/assets/images/icons/dumbbell.svg";
import Headphone from "@/assets/images/icons/headphone.svg";
import Options from "@/assets/images/icons/options.svg";
import Trophy from "@/assets/images/icons/trophy.svg";
import { useState } from "react";
import ExitModal from "./ExitModal";
import Profile from "@/assets/images/icons/profile.svg";
import Close from "@/assets/images/icons/close.svg";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const handleExitClick = () => {
    setMenuIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <footer className="w-full bg-default max-w-3xl mx-auto border-t-2 border-foreground-light/65">
      <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-around">
        <div className="flex items-center gap-2">
          <img src={Home} className="w-7 h-7 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Headphone} className="w-7 h-7 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Dumbbell} className="w-7 h-7 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Chest} className="w-7 h-7 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2">
          <img src={Trophy} className="w-7 h-7 hover:scale-[110%]" />
        </div>

        <div className="flex items-center gap-2" onClick={handleMenuClick}>
          <img src={Options} className="w-7 h-7 hover:scale-[110%]" />
        </div>
      </div>
      {menuIsOpen && (
        <div
          className="z-50 absolute bottom-17 w-full bg-default border-t-2  border-t-foreground-light/65 flex flex-col justify-center items-start"
          onMouseLeave={() => setMenuIsOpen(false)}
        >
          <div
            className="flex justify-start items-center p-2 py-4 gap-2 border-b-2  border-b-foreground-light/65 w-full cursor-pointer"
            onClick={() => setMenuIsOpen(false)}
          >
            <img src={Profile} className="w-7 h-7" alt="" />
            <span className="font-semibold">Perfil</span>
          </div>

          <div
            className="flex justify-start items-center p-2 py-4 gap-2 border-b-2  border-b-foreground-light/65 w-full cursor-pointer"
            onClick={handleExitClick}
          >
            <img src={Close} className="w-7 h-7" alt="" />
            <span className="font-semibold">Fazer Logout</span>
          </div>
        </div>
      )}
      <ExitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;
