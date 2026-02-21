import app from './app'
import config from './configs/config'
import { mongoConnect } from './models/mongoConnection'
const PORT = config.port


async function startServer(){
    await mongoConnect()
    app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`listening to port ${config.port}. Server starts at ${config.nodeEnv} environment`)
    }
    )
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});


