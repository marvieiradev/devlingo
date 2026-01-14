import Char from "@/assets/images/loader.svg";
import "../styles/global.css";

interface LoadingScreenProps {
  isFadingOut?: boolean;
}

const LoadingScreen = ({ isFadingOut }: LoadingScreenProps) => {
  return (
    <div
      className={`fixed inset-0 bg-primary flex flex-col items-center justify-center ${
        isFadingOut ? "animate-fadeOut" : ""
      }`}
    >
      <div>
        <img
          src={Char}
          alt="Devlingo loader"
          className="w-32 h-32 object-contain animate-float"
        />
      </div>

      <h1 className="text-default text-5xl font-extrabold mt-12 tracking-wider">
        devlingo
      </h1>
    </div>
  );
};

export default LoadingScreen;
