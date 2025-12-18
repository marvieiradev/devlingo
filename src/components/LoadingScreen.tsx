import DevlingoChar from "@/assets/images/loader.png";
import "../styles/global.css";

interface LoadingScreenProps {
  isFadingOut?: boolean;
}

const LoadingScreen = ({ isFadingOut }: LoadingScreenProps) => {
  return (
    <div
      className={`fixed inset-0 bg-blue-400 flex flex-col items-center justify-center ${
        isFadingOut ? "animate-fadeOut" : ""
      }`}
    >
      <div>
        <img
          src={DevlingoChar}
          alt="Devlingo loader"
          className="w-36 h-36 object-contain animate-float"
        />
      </div>

      <h1 className="text-white text-5xl font-bold mt-12 tracking-wider">
        Devlingo
      </h1>
    </div>
  );
};

export default LoadingScreen;
