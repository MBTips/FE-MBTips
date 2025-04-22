import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ShareModal from "@/components/modal/ShareModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <ShareModal />
  </StrictMode>
);
