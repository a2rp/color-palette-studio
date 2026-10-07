import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/color-palette-studio/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
