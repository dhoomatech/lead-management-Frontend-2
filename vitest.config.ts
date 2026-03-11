import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      include: ["src/**/*.ts", "app/**/*.ts", "di/**/*.ts"],
      exclude: [
        "src/**/*.d.ts",
        "src/infrastructure/repositories/Prisma*.ts",
        "tests/**",
      ],
    },
  },
});
