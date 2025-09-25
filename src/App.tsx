import "./App.css";
import { useEffect } from "react";
import About from "./sections/About";
import { Contact } from "./sections/Contact";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { smoothScrollTo, smoothScrollToElement, smoothScrollToTop } from "./utils/smoothScroll";

function App() {
  useEffect(() => {
    // Make smooth scroll functions globally available
    (window as any).customScrollTo = smoothScrollTo;
    (window as any).customScrollToElement = smoothScrollToElement;
    (window as any).customScrollToTop = smoothScrollToTop;

    return () => {
      // Cleanup
      delete (window as any).customScrollTo;
      delete (window as any).customScrollToElement;
      delete (window as any).customScrollToTop;
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
