import dotenv from 'dotenv'
//Load .env file contents into process.env by default
dotenv.config() 

interface Config{
    port: number
    nodeEnv: string
    mongoUri: string
    jwtSecret: string
    clientOrigin: string
}

const rawPort = process.env.PORT;
const mongoUri = process.env.MONGO_URI
const jwtSecret = process.env.JWT_SECRET
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000"

let port = 3000; // default if missing
//if rawport is not undefined and is not empty than 'parsed' will equal Number(rawPort)
//but if 'parsed' is not a number then we will throw an error
// if everything is fine then port's value will be replaced by parsed value
if (rawPort !== undefined && rawPort.trim() !== '') {
  const parsed = Number(rawPort);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid PORT: "${rawPort}"`);
  }
  port = parsed;
}


if (!mongoUri) {
  throw new Error("Missing MONGO_URI in environment");
}

if (!jwtSecret) {
  throw new Error("Missing JWT_SECRET in environment");
}

//we make new config after everything is checked:
const config: Config = {
  port,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri,
  jwtSecret,
  clientOrigin
};

export default config

