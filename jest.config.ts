/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  projects: [
    {
      displayName: "dom",
      clearMocks: true,
      coverageDirectory: "coverage",
      moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
      ],
      testEnvironment: "jsdom",
      testMatch: ["**/*.test.tsx"],
      transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
          "jest-preview/transforms/file",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/fileTransformer.ts",
      },
      transformIgnorePatterns: ["/node_modules/"],
    },
    {
      displayName: "node",
      clearMocks: true,
      coverageDirectory: "coverage",
      moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
      ],
      testEnvironment: "node",
      testMatch: ["**/*.test.ts"],
      transform: {
        "^.+\\.ts?$": "ts-jest",
      },
      transformIgnorePatterns: ["/node_modules/"],
    },
  ],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageProvider: "babel",
};

export default config;
