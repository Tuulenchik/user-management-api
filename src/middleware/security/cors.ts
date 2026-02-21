import cors, { CorsOptions } from "cors"

import config from "../../configs/config"

const corsOptions: CorsOptions = {
    origin: (origin, callback) =>{

        if(!origin) return callback(null, true)
        
        if(origin === config.clientOrigin) return callback(null, true)
        
        const err = new Error("Not allowed by CORS") as any;
        err.status = 403;
        return callback(err);
    },
    
    credentials:false,
    methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

export const corsMiddleware = cors(corsOptions)