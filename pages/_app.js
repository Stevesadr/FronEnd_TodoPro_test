import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2. GSAP ScrollTrigger Sync
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Animation Frame Loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
