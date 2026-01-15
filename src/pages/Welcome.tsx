import { useNavigate } from "react-router-dom";
import Char from "@/assets/images/char/img-char-01.svg";
import Button from "@/components/Button";

export const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary to-secondary p-4 mx-auto">
      <div className="bg-default/95 w-full max-w-md rounded-2xl shadow-2xl p-8">
        <div className="h-1/2 flex flex-col items-center">
          <img
            src={Char}
            alt="Mascote"
            className="h-65 xs:h-75 object-contain animate-float"
          />
          <h1 className="mt-6 text-3xl sm:text-4xl leading-12 font-bold bg-linear-to-r from-primary-dark via-primary to-secondary inline-block text-transparent bg-clip-text text-center">
            Bem Vindo ao DevLingo!
          </h1>
          <h2 className="mt-2 text-lg sm:text-xl font-bold text-foreground text-center">
            Seu próximo nível começa aqui. Vamos começar?
          </h2>
        </div>

        <div className="h-1/2 mt-10 flex flex-col gap-2">
          <Button
            variant="primary"
            text="Fazer login"
            action={() => navigate("/login")}
          />

          <Button
            variant="signup"
            text=" Criar conta"
            action={() => () => navigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
