import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SlideShow.css";

// Put your images in /public for reliable prod paths
const IMAGES = ["./images/cover18.webp", "./images/cover1.webp", "./images/cover7.webp"];

const SENTENCES = [
  "GET OUR DAILY UPDATES ON NEWS, STYLES AND ENTERTAINMENT",
  "AN EXPERIENCE THAT EXTENDS BEYOND BLOG",
  "WHERE TALENT IS NURTURED FROM BINTIN TO BIG THING",
];

const TYPE_SPEED_MS = 60;     // time per character
const HOLD_AFTER_TYPE_MS = 1200; // how long to keep full sentence before delete
const DELETE_SPEED_MS = 40;   // time per character delete
const HOLD_AFTER_DELETE_MS = 300; // brief pause before next sentence

function usePreloadImages(urls = []) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const loaders = urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = () => {
            console.warn("Failed to load image:", src);
            resolve(); // resolve anyway so slideshow continues
          };
          img.src = src;
        })
    );
    Promise.all(loaders).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; };
  }, [urls]);
  return ready;
}


const Slideshow = () => {
  // Ensure we have same count (map sentence -> image).
  const slides = useMemo(() => {
    // If images < sentences, reuse; if more images, cut to match sentences
    const imgs =
      IMAGES.length >= SENTENCES.length
        ? IMAGES.slice(0, SENTENCES.length)
        : Array.from({ length: SENTENCES.length }, (_, i) => IMAGES[i % IMAGES.length]);
    return SENTENCES.map((text, i) => ({ text, image: imgs[i] }));
  }, []);

  const imagesReady = usePreloadImages(slides.map((s) => s.image));

  // Typewriter state
  const [index, setIndex] = useState(0);       // which sentence
  const [display, setDisplay] = useState("");  // currently typed text
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const timerRef = useRef(null);

  // Crossfade state (use index)
  const activeImage = slides[index]?.image;

  useEffect(() => {
    if (!imagesReady || slides.length === 0) return;

    const full = slides[index].text;

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (fn, ms) => {
      clear();
      timerRef.current = setTimeout(fn, ms);
    };

    if (phase === "typing") {
      if (display.length < full.length) {
        schedule(() => setDisplay(full.slice(0, display.length + 1)), TYPE_SPEED_MS);
      } else {
        schedule(() => setPhase("holding"), HOLD_AFTER_TYPE_MS);
      }
    } else if (phase === "holding") {
      schedule(() => setPhase("deleting"), HOLD_AFTER_TYPE_MS);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        schedule(() => setDisplay(full.slice(0, display.length - 1)), DELETE_SPEED_MS);
      } else {
        schedule(() => {
          setIndex((i) => (i + 1) % slides.length);
          setPhase("typing");
        }, HOLD_AFTER_DELETE_MS);
      }
    }

    return () => clear();
  }, [phase, display, index, slides, imagesReady]);

  // Start fresh when images become ready
  useEffect(() => {
    if (imagesReady) {
      setIndex(0);
      setDisplay("");
      setPhase("typing");
    }
  }, [imagesReady]);

  return (
    <div className="slideshow">
      {/* Background layers for crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.image + i}
          className={`slide ${i === index ? "is-active" : ""}`}
          style={{ backgroundImage: `url('${s.image}')` }}
          aria-hidden={i === index ? "false" : "true"}
        />
      ))}

      {/* Text overlay */}
      <div className="slideshow-text">
        <h2 className="EXP">{display}</h2>
        <h1>Welcome to MyNation Blog</h1>
      </div>

      {/* Optional: loading state while images preload */}
      {!imagesReady && <div className="slideshow-loading">Loading…</div>}
    </div>
  );
};

export default Slideshow;
