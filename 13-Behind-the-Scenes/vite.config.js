import MillionLint from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [MillionLint.vite({ auto: true }), react()],
});
