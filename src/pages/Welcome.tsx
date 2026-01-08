import { useNavigate } from "react-router-dom";
import Char from "@/assets/images/char.svg";

export const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-x-hidden max-w-3xl mx-auto">
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex align-center w-full h-28 sm:h-32">
            <img
              src={Char}
              alt="Mascote"
              className="w-full h-full object-contain"
            />
          </div>
          <h1>Bem vindo!</h1>
          <h2>Vamos iniciar?</h2>
          <div
            className="mt-4 rounded-xl bg-blue-400 text-white shadow-lg"
            onClick={() => navigate("/login")}
          >
            <div className="flex gap-4 items-center px-6 py-6">
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide">
                Fazer login
              </h2>
            </div>
          </div>

          <div
            className="mt-4 rounded-xl bg-blue-400 text-white shadow-lg"
            onClick={() => navigate("/signup")}
          >
            <div className="flex gap-4 items-center px-6 py-6">
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide">
                Criar conta
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
