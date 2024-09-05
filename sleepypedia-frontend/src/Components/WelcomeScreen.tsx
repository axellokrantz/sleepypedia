interface Props {
  onEnterApp: () => void;
}

const WelcomeScreen = ({ onEnterApp }: Props) => (
  <div className="text-white font-figtree font-regular flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-4xl font-bold mb-4 ">Welcome to Sleepypedia</h1>
    <p className="text-xl mb-8 max-w-2xl">
      Discover random Wikipedia articles and listen to them using Amazon Polly's
      text-to-speech technology. Explore knowledge hands-free!
    </p>
    <button
      onClick={onEnterApp}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Enter App
    </button>
  </div>
);
export default WelcomeScreen;
