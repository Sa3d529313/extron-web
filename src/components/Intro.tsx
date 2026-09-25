"use client";

import { useEffect, useState } from "react";
import Image from "@/components/Img";

export default function Intro() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLeaving(true), 2600);
    const removeTimer = setTimeout(() => setGone(true), 3800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="intro-mask" data-leaving={leaving}>
      <div className="intro-logo">
        <Image src="/brand/logo-clean.png" alt="EXTRON" width={400} height={400}
          priority className="intro-logo-base h-24 w-24 md:h-36 md:w-36" />
        <Image src="/brand/logo-clean.png" alt="" aria-hidden="true" width={400} height={400}
          priority className="intro-logo-glow h-24 w-24 md:h-36 md:w-36" />
      </div>
    </div>
  );
}
