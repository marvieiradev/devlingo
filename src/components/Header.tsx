import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
//import { useUserProfile } from "@/hooks/useUserProfile";
import IconTecnology from "./IconTecnology";
import { useParams } from "react-router";
import { PiBatteryChargingFill, PiFireFill } from "react-icons/pi";
import { TbDiamondFilled } from "react-icons/tb";

const Header = () => {
  const params = useParams();
  const { logout, isAuthenticated } = useAuth();
  //const { profile, loading } = useUserProfile();

  const module =
    params.id === "html"
      ? "HTML"
      : params.id === "css"
      ? "CSS"
      : params.id === "js"
      ? "JavaScript"
      : "";

  return (
    <header className="w-full bg-default max-w-3xl mx-auto">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconTecnology tecnology={params.id!} />
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
              {/*loading ? "..." : profile?.total_xp*/}
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

      <div className="w-full">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 rounded-xl bg-primary text-default border-b-5 border-primary-dark shadow-lg">
            <div className="px-6 py-6 gap-2">
              <p className="uppercase text-xs tracking-widest opacity-90">
                Começar unidade
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-wide">
                Fundamentos {module}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
