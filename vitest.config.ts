import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["empresas.test.ts", "registros.test.ts"],
    sequence: { concurrent: false },
    testTimeout: 15000,
    reporter: "verbose",
    globals: true,
  },
});
