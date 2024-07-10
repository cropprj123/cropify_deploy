// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "https://cropify-server.vercel.app",
        changeOrigin: true,
        secure: false,
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
// // vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// export default defineConfig({
//   plugins: [react(), eslint()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://cropify-deploy-server.vercel.app/",
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^/api/, ''),
//       },
//     },
//   },
// });
