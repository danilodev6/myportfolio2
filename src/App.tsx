import "./App.css";
import { useMomentumScroll } from "./hooks/useMomentumScroll";
import About from "./sections/About";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import { Projects } from "./sections/Projects";

function App() {
  useMomentumScroll({
    friction: 0.95, // How quickly momentum dies (0.9-0.95)
    acceleration: 0.1, // How smooth the catch-up is (0.1-0.2)
    sensitivity: 0.1, // Scroll speed (0.1 = very slow, 0.5 = fast)
  });

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </>
  );
}

export default App;
