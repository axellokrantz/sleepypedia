import { useState } from "react";
import WelcomeScreen from "./Components/WelcomeScreen";
import AmazonPolly from "./Components/AmazonPolly";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {showWelcome ? (
        <WelcomeScreen onEnterApp={() => setShowWelcome(false)} />
      ) : (
        <AmazonPolly />
      )}
    </div>
  );
};

export default App;
