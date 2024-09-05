import { useState } from "react";
import WelcomeScreen from "./Components/WelcomeScreen";
import AmazonPolly from "./Components/AmazonPolly";
import Background from "./Components/Background";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="relative bg-gradient-to-b from-[#13131d] to-[#1c1937] min-h-screen">
      <Background />
      <div className="relative z-10 h-full">
        {showWelcome ? (
          <WelcomeScreen onEnterApp={() => setShowWelcome(false)} />
        ) : (
          <AmazonPolly />
        )}
      </div>
    </div>
  );
};

export default App;
