import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routesHandler } from "./routes/routes";
import config from "./config";

const server : Server = createServer((req: IncomingMessage, res: ServerResponse) => {
       routesHandler(req, res);
});

server.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`)
})