import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { PiBatteryChargingFill, PiFireFill } from "react-icons/pi";
import { TbDiamondFilled } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa6";
import { useState } from "react";
import ExitModal from "./ExitModal";
import Close from "@/assets/images/icons/close.svg";
import Profile from "@/assets/images/icons/profile.svg";
import Options from "@/assets/images/icons/options.svg";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { profile, loading } = useUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const handleExitClick = () => {
    setMenuIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <header className="w-full bg-default max-w-3xl mx-auto">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-sm bg-success text-default text-sm font-bold w-8 h-6 sm:w-10 sm:h-8 select-none">
            <FaLaptopCode className="w-5 h-5" />
          </span>
          <div className="h-6 w-px bg-default" />
        </div>

        <div className="w-full justify-evenly flex items-center gap-5 xs:text-lg">
          <div className="flex items-center gap-2">
            <PiFireFill className="w-6 h-6 sm:w-8 sm:h-8 text-fire-icon" />
            <span className="font-semibold text-fire-icon">99+</span>
          </div>

          <div className="flex items-center gap-2">
            <TbDiamondFilled className="w-6 h-6 sm:w-8 sm:h-8 text-diamond-icon" />
            <span className="font-semibold text-diamond-icon">
              {loading ? "..." : profile?.total_xp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PiBatteryChargingFill className="w-6 h-6 sm:w-8 sm:h-8 text-batery-icon" />
            <span className="font-semibold text-batery-icon">99+</span>
          </div>
        </div>
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleMenuClick}
            className="items-center gap-2 text-primary border-primary hover:text-secondary font-medium cursor-pointer hidden sm:flex hover:scale-[110%]"
          >
            <img src={Options} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>
      {menuIsOpen && (
        <div
          className="z-50 absolute top-12 right-0 w-[200px] bg-default border-foreground-extralight border-2 shadow-md flex flex-col justify-center items-start p-1"
          onMouseLeave={() => setMenuIsOpen(false)}
        >
          <div
            className="flex justify-start items-center p-1 gap-2 my-2 border-2 border-transparent hover:border-primary rounded w-full cursor-pointer"
            onClick={() => setMenuIsOpen(false)}
          >
            <img src={Profile} className="w-7 h-7" alt="" />
            <span className="font-semibold">Perfil</span>
          </div>

          <div
            className="flex justify-start items-center p-1 gap-2 my-2 border-2 border-transparent hover:border-primary rounded w-full cursor-pointer"
            onClick={handleExitClick}
          >
            <img src={Close} className="w-7 h-7" alt="" />
            <span className="font-semibold">Fazer Logout</span>
          </div>
        </div>
      )}
      <ExitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
