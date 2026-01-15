import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { PiBatteryChargingFill, PiFireFill } from "react-icons/pi";
import { TbDiamondFilled } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { useState } from "react";
import ExitModal from "./ExitModal";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { profile, loading } = useUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExitClick = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="w-full bg-default max-w-3xl mx-auto">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-sm bg-success text-default text-sm font-bold w-8 h-6 select-none">
            <FaLaptopCode className="w-4 h-4" />
          </span>
          <div className="h-6 w-px bg-default" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <PiFireFill className="w-6 h-6 sm:w-8 sm:h-8 text-fire-icon" />
            <span className="font-semibold text-fire-icon">99</span>
          </div>

          <div className="flex items-center gap-2">
            <TbDiamondFilled className="w-6 h-6 sm:w-8 sm:h-8 text-diamond-icon" />
            <span className="font-semibold text-diamond-icon">
              {loading ? "..." : profile?.total_xp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PiBatteryChargingFill className="w-6 h-6 sm:w-8 sm:h-8 text-batery-icon" />
            <span className="font-semibold text-batery-icon">99</span>
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleExitClick}
              className="items-center gap-2 text-primary border-primary hover:text-secondary font-medium cursor-pointer hidden sm:flex"
            >
              <ImExit className="w-5 h-5" />
              <span>Sair</span>
            </button>
          )}
        </div>
      </div>
      <ExitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
