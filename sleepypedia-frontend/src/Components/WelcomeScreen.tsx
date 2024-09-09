import WikipediaLogo from "../assets/wikipedia-logo.png";
import "../assets/fonts.css";

interface Props {
  onEnterApp: () => void;
}

const WelcomeScreen = ({ onEnterApp }: Props) => (
  <div className="text-white flex flex-col items-center min-h-screen text-center">
    <img
      src={WikipediaLogo}
      alt="Wikipedia Logo"
      className="w-80 mt-12 object-contain"
    />
    <h1 className="mb-4 font-linux text-4xl">
      <span>
        Welcome to{" "}
        <span className="font-medium text-lazy-purple">
          Sleepypedia
          <span className="text-xxs align-super text-white">TM</span>
        </span>
      </span>
      <p className="font-linux text-base text-yellow-200">
        The Night-time Encyclopedia
      </p>
    </h1>
    <p className="text-base mb-8 max-w-lg font-figtree">
      Drift off to dreamland as we guide you through everything from the mating
      habits of <span className="font-semibold">dust mites</span> to the history
      of
      <span className="font-semibold"> left-handed scissors</span>. Doze
      peacefully to riveting detours through medieval{" "}
      <span className="font-semibold">hat-making traditions </span> and the
      aerodynamics of
      <span className="font-semibold"> falling leaves.</span>
    </p>
    <div className="relative inline-flex group">
      <div className="absolute transition-all duration-300 opacity-40 -inset-px bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-md blur-lg group-hover:opacity-70 group-hover:-inset-0.75 group-hover:duration-200 animate-tilt"></div>
      <button
        onClick={onEnterApp}
        className="relative font-figtree text-sm bg-[#191a23ff] hover:bg-yellow-200 text-yellow-200 hover:text-[#0A0A1B] py-2 px-4 border border-yellow-200 hover:border-[#0A0A1B] rounded transition-all duration-300 ease-in-out z-10"
      >
        Enter Sleepypedia
      </button>
    </div>
  </div>
);

export default WelcomeScreen;
