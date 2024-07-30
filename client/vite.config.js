import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// export default defineConfig({
//   plugins: [react(), eslint()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://cropify-deploy-server.vercel.app",
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@emotion/react": "@emotion/react",
//       "@emotion/styled": "@emotion/styled",
//     },
//   },
// });
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://final-deploy-d3zh.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      "@emotion/react": "@emotion/react",
      "@emotion/styled": "@emotion/styled",
    },
  },
});
