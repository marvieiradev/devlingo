import Char from "@/assets/images/char.svg";
import Button from "@/components/Button";
import { BsLightningChargeFill } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

interface LessonSuccessState {
  xpEarned?: number;
  accuracy?: number;
}

const LessonSuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { xpEarned, accuracy } = (location.state as LessonSuccessState) || {};

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <div>
          <img
            src={Char}
            alt="Mascote"
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
          />
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-warning text-center">
          Lição concluída!
        </h1>
        <div className="mt-10 flex items-stretch gap-2">
          <div className="w-25 h-20 p-1 pt-1 bg-warning rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              TOTAL DE XP
            </span>
            <div className=" bg-default h-12 rounded-lg text-warning flex items-center justify-center gap-2 px-4">
              <BsLightningChargeFill className="h-5 w-5" />
              <span className="text-xl font-bold">{xpEarned}</span>
            </div>
          </div>

          <div className="w-25 h-20 p-1 pt-1 bg-success rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              ÓTIMA
            </span>
            <div className="bg-default h-12 rounded-lg text-success flex items-center justify-center gap-2 px-2">
              <TbTargetArrow className="h-6 w-6" />
              <span className="text-xl font-bold">{accuracy}%</span>
            </div>
          </div>

          <div className="w-25 h-20 p-1 pt-1 bg-primary rounded-xl flex flex-col justify-between gap-1">
            <span className="text-center text-default font-bold text-sm">
              SUPER ÁGIL
            </span>
            <div className="bg-default h-12 rounded-lg text-primary flex items-center justify-center gap-2 px-4">
              <LuClock4 className="h-5 w-5" />
              <span className="text-xl font-bold">1:30</span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Button
            variant="success"
            text="CONTINUAR"
            action={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonSuccessScreen;
