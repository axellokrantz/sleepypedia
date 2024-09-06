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
    <h1 className="text-3xl mb-4 font-linux">
      <span className="font-figtree font-se">
        Welcome to{" "}
        <span className="font-semibold text-lazy-purple">
          Sleepypedia<span className="text-xxs align-super"> TM</span>
        </span>
      </span>
      <p className="font-linux font-semibold text-base text-yellow-200">
        The Night-time Ensycolopedia
      </p>
    </h1>
    <p className="text-sm mb-8 max-w-md font-figtree">
      Drift off to dreamland as we guide you through everything from the mating
      habits of <span className="font-semibold">dust mites</span> to the history
      of
      <span className="font-semibold"> left-handed scissors</span>. Doze
      peacefully to riveting detours through medieval{" "}
      <span className="font-semibold">hat-making traditions </span> and the
      aerodynamics of
      <span className="font-semibold"> falling leaves.</span>
    </p>
    <button
      onClick={onEnterApp}
      className="font-figtree text-sm bg-transparent hover:bg-yellow-200 text-yellow-200 hover:text-black py-2 px-4 border border-yellow-200 hover:border-transparent rounded">
      Enter Sleepypedia
    </button>
  </div>
);
export default WelcomeScreen;
