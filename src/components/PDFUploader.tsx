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
      className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:border-emerald-500/30 hover:bg-emerald-500/[0.01] transition-all group"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-4 w-full">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-gray-300 font-semibold">Generating Presentation...</p>
          <div className="w-full max-w-xs bg-white/10 h-1.5 rounded-full overflow-hidden mt-1 border border-white/5">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-mono">{progress}% Complete</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Upload Presentation PDF</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
              Drag and drop any PDF presentation file, or click to browse. Processing runs 100% locally.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-xs mt-2 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg w-full justify-center">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
