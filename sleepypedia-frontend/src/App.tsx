import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import AmazonPolly from "./components/AmazonPolly";
import Background from "./components/Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-[#13131d] min-h-screen">
        {showWelcome && <Background />}
        <div className="relative z-10 h-full">
          {showWelcome ? (
            <WelcomeScreen onEnterApp={() => setShowWelcome(false)} />
          ) : (
            <AmazonPolly />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
