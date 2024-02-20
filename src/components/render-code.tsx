import { useAppSelector } from "@/redux/hooks";

export default function RenderCode() {
  const fullCode = useAppSelector((state) => state.language.fullCode);
  const combinedCode = `
    <html>
        <style>
            ${fullCode.css}
        </style>
        <body>
            ${fullCode.html}
        </body>
        <script>
            ${fullCode.javascript}
        </script>
    </html>
  `;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="w-full h-full bg-white">
      <iframe className="w-full h-full" title="web dev code" src={iframeCode} />
    </div>
  );
}
