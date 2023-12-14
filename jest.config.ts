import type { Config } from "@jest/types";
import path from "path";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.ts?$": "ts-jest",
    }
};

export default config;