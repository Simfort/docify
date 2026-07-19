"use client";

import { useCode } from "@/lib/store/useCode";
import { X } from "lucide-react";
import { useRef, useState } from "react";

export default function FilesPick() {
  const { setFile, file } = useCode();
  const [isDragged, setIsDragged] = useState(false);
  const pickRef = useRef<HTMLInputElement | null>(null);

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
  const handleClick = () => {
    setFile(null);
    const pick = pickRef.current;
    if (pick) {
      pick.value = "";
      pick.click();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) setFile(file);
    }
  };
  const handleDeleteFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };
  return (
    <div
      onClick={handleClick}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      aria-label={
        file ? `File loaded: ${file.name}` : "Drag or click for select file"
      }
      aria-describedby={file ? "file-info" : undefined}
      className={`w-full h-[50vh] border-2 border-dashed flex items-center justify-center rounded-lg bg-card cursor-pointer hover:bg-muted transition-colors ${isDragged ? "opacity-50 border-accent" : ""}`}>
      {file ? (
        <div id="file-info" className="text-center text-xl">
          <p className="mb-2">Loaded file:</p>{" "}
          <div className="flex w-full items-center">
            <p className="font-mono bg-background p-1 rounded-lg border-accent border">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>{" "}
            <button onClick={handleDeleteFile} aria-label="Delete file">
              <X />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4>
            Drag or click for select file{" "}
            <span className="bg-background p-1 rounded-lg border-accent border font-mono">
              .zip
            </span>
          </h4>
        </>
      )}
      <input
        onChange={handleChange}
        ref={pickRef}
        type="file"
        hidden
        accept=".zip"
      />
    </div>
  );
}
