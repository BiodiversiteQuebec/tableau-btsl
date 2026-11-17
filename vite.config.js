import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  base: "/connect-btsl/",
  plugins: [react()],
  resolve: {
    // Keep CRA-style absolute imports (baseUrl: "src") working, e.g. "utils/helper"
    alias: [
      { find: /^(components|utils|hooks|services|store|styles|context|locales|css)\//, replacement: `${src}/$1/` },
      { find: /^@\/components\//, replacement: `${src}/components/` },
      { find: /^@\/src\//, replacement: `${src}/` },
      // Deep icon imports (e.g. "@mui/icons-material/Delete") point at CJS files;
      // redirect them to the package's ESM build so default imports work.
      { find: /^@mui\/icons-material\/(?!esm\/)(.+)$/, replacement: "@mui/icons-material/esm/$1" },
    ],
  },
  server: { port: 3000, open: true },
  build: { outDir: "build" },
});
