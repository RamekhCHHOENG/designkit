import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// The component catalog was deleted for a full shadcn/ui-based redesign.
// This is a placeholder shell until that design work lands.
function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">DesignKit is being rebuilt</h1>
        <p className="mt-2 text-muted-foreground">
          The component catalog was cleared for a shadcn/ui-based redesign. Nothing to see here yet.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
