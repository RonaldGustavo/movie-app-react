import { useEffect, useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import SplashScreen from "../common/Splashscreen";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return <>{showSplash ? <SplashScreen /> : <PublicRoutes />}</>;
};

export default App;
