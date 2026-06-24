"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { Slide } from "@/types/gesture";

interface PDFUploaderProps {
  onSlidesLoaded: (slides: Slide[]) => void;
}

export function PDFUploader({ onSlidesLoaded }: PDFUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processPDF = async (file: File) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Dynamic import to prevent SSR (Server-Side Rendering) import errors in Next.js
      const pdfjsLib = await import("pdfjs-dist");
      
      // Set up CDN worker corresponding to the exact version of the imported pdfjs-dist
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      const loadedSlides: Slide[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // High-quality rendering
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not construct 2D canvas context");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        }).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        loadedSlides.push({
          id: i,
          title: `Slide ${i}`,
          image: dataUrl
        });

        setProgress(Math.round((i / totalPages) * 100));
      }

      onSlidesLoaded(loadedSlides);
    } catch (err: any) {
      console.error(err);
      setError("Failed to parse PDF. Please ensure it is a valid, unencrypted file.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processPDF(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        processPDF(file);
      } else {
        setError("Unsupported file format. Please upload a PDF.");
      }
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] border-dashed backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_20px_40px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-5 text-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/[0.02] transition-all duration-300 group relative overflow-hidden"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 via-violet-500/[0.01] to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-6 w-full relative z-10">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-violet-500 animate-spin opacity-50 absolute inset-0 blur-md" />
            <Loader2 className="w-12 h-12 text-fuchsia-400 animate-spin relative" />
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-violet-300">Generating Presentation</p>
          <div className="w-full max-w-[200px] bg-white/[0.05] h-1 rounded-full overflow-hidden mt-2 shadow-[inset_0_1px_0_rgba(0,0,0,0.5)]">
            <div 
              className="bg-gradient-to-r from-violet-500 to-fuchsia-400 h-full transition-all duration-300 shadow-[0_0_10px_rgba(217,70,239,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-white/40 font-mono font-medium">{progress}% Complete</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4 relative z-10">
          <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-all duration-500">
            <Upload className="w-6 h-6 group-hover:text-fuchsia-300 transition-colors" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors tracking-wide">Upload PDF Deck</h4>
            <p className="text-[11px] text-white/40 mt-2 max-w-xs leading-relaxed font-medium px-4">
              Drag and drop any presentation file. Processing runs 100% locally on the edge.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-xs mt-2 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl w-full justify-center shadow-[inset_0_1px_0_rgba(244,63,94,0.2)]">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium tracking-wide">{error}</span>
        </div>
      )}
    </div>
  );
}
