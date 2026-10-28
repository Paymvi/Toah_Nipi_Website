import { useEffect, useRef, useState } from "react";

// pdf.js is loaded only when a PDF is opened, so other pages stay light.
const loadPdfJs = async () => {
  const [pdfjs, worker] = await Promise.all([
    import("pdfjs-dist/legacy/build/pdf.min.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url"),
  ]);

  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs;
};

export default function PdfPages({ src, title, fallback }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let cancelled = false;
    let loadingTask;

    const render = async () => {
      try {
        const pdfjs = await loadPdfJs();

        if (cancelled) {
          return;
        }

        loadingTask = pdfjs.getDocument(src);
        const pdf = await loadingTask.promise;
        const width = container.clientWidth;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
        const canvases = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({
            scale: (width / baseViewport.width) * pixelRatio,
          });

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.setAttribute("aria-hidden", "true");

          await page.render({
            canvasContext: canvas.getContext("2d"),
            viewport,
          }).promise;

          if (cancelled) {
            return;
          }

          canvases.push(canvas);
        }

        container.replaceChildren(...canvases);
        setStatus("ready");
      } catch (error) {
        if (!cancelled) {
          console.error("Could not display PDF:", error);
          setStatus("error");
        }
      }
    };

    render();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [src]);

  return (
    <div
      className="pdf-pages"
      role="img"
      aria-label={title}
      aria-busy={status === "loading"}
    >
      <div ref={containerRef} className="pdf-pages-canvases" />

      {status === "loading" && (
        <p className="pdf-pages-status">Loading story…</p>
      )}

      {status === "error" && fallback}
    </div>
  );
}
