import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  SERVER_PORT: number | undefined;
  DB_HOST: string | undefined;
  DB_PORT: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
}

interface Config {
  NODE_ENV: string;
  SERVER_PORT: number;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

// Loading process.env as ENV interface
console.log(process.env.NODE_ENV);
const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
