"use client";

import { useCode } from "@/lib/store/useCode";
import { useState } from "react";

export default function FilesPick() {
  const { setFile, file } = useCode();
  const [isDragged, setIsDragged] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragged(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    setIsDragged(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    const selectedFile = droppedFiles[0];
    const isZip = selectedFile.name.toLowerCase().endsWith(".zip");
    const isValidMime = selectedFile.type === "application/zip";
    if (!isZip && !isValidMime) {
      alert("Пожалуйста, загрузите файл с расширением .zip");
      return;
    }
    setFile(selectedFile);
    console.log("Загружен файл:", selectedFile);
    setIsDragged(false);
  };

  return (
    <div
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`w-full h-[50vh] border-2 border-dashed flex items-center justify-center rounded-lg bg-card cursor-pointer hover:bg-muted transition-colors ${isDragged ? "opacity-50 border-accent" : ""}`}>
      {file ? (
        <div className="text-center text-xl">
          <p className="mb-2">Загружен файл:</p>
          <p className="font-mono bg-background p-1 rounded-lg border-accent border">
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      ) : (
        <>
          <h4>
            Перетащите файл{" "}
            <span className="bg-background p-1 rounded-lg border-accent border font-mono">
              .zip
            </span>
          </h4>
        </>
      )}
    </div>
  );
}
