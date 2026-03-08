import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import EMICalculator from "./components/EMICalculator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/AboutUs";
import Articles from "./components/Articles";
import ArticlesView from "./components/ArticlesView";
import PFCalculator from "./components/PFCalculator";
import MFCalculator from "./components/MFCalculator";
/*function App() {
  return <EMICalculator />;
} */

  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/articles" element={<Articles/>}></Route>
        <Route path="/articles/:slug" element={<ArticlesView />} />
        <Route path="/" element={<EMICalculator />} />
        <Route path="/pf-calculator" element={<PFCalculator />} />
        <Route path="/mf-calculator" element={<MFCalculator />} />
        
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;