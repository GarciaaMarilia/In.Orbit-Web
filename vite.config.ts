import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
 base: "/In.Orbit-Web/", // Deve corresponder ao nome do repositório no GitHub
});
