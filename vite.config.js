<<<<<<< HEAD
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
=======
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
>>>>>>> 293af5ef5fed1e49ded1c9d665b5a0ced0292413

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
})
=======
});
>>>>>>> 293af5ef5fed1e49ded1c9d665b5a0ced0292413
