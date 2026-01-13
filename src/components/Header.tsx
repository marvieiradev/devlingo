import { CodeXml, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { PiBatteryChargingFill, PiFireFill } from "react-icons/pi";
import { TbDiamondFilled } from "react-icons/tb";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const { profile, loading } = useUserProfile();

  return (
    <header className="w-full bg-default max-w-3xl mx-auto">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-md bg-orange-400 text-white text-sm font-bold w-7 h-7 select-none">
            <CodeXml />
          </span>
          <div className="h-6 w-px bg-default" />
        </div>

        <div className="flex items-center gap-5 text-gray-800">
          <div className="flex items-center gap-2">
            <PiFireFill className="w-6 h-6 sm:w-8 sm:h-8 text-fire-icon" />
            <span className="font-semibold text-fire-icon">∞</span>
          </div>

          <div className="flex items-center gap-2">
            <TbDiamondFilled className="w-6 h-6 sm:w-8 sm:h-8 text-diamond-icon" />
            <span className="font-semibold text-diamond-icon">
              99
              {loading ? "..." : profile?.total_xp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PiBatteryChargingFill className="w-6 h-6 sm:w-8 sm:h-8 text-batery-icon" />
            <span className="font-semibold text-batery-icon">∞</span>
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 text-blue-400 hover:text-indigo-400 font-medium cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
