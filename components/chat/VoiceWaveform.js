"use client";

import { useState, useEffect, useRef } from "react";

export default function VoiceWaveform({ url, mine }) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bars = 20;

    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * 40 + 5;

        ctx.fillStyle = mine ? "#fff" : "#555";
        ctx.fillRect(i * 6, 50 - height / 2, 4, height);
      }

      if (playing) requestAnimationFrame(drawWave);
    }

    if (playing) requestAnimationFrame(drawWave);
  }, [playing]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          if (playing) {
            audio.pause();
            setPlaying(false);
          } else {
            audio.play();
            setPlaying(true);
          }
        }}
        style={{
          width: 30,
          height: 30,
          background: mine ? "#fff" : "#ddd",
          borderRadius: "50%",
          fontSize: 14,
        }}
      >
        {playing ? "⏸" : "▶️"}
      </button>

      <canvas ref={canvasRef} width={120} height={50} />
    </div>
  );
}
