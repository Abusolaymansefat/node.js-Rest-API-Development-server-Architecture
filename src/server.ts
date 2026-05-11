import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routesHandler } from "./routes/routes";

const server : Server = createServer((req: IncomingMessage, res: ServerResponse) => {
       routesHandler(req, res);
});

server.listen(3000, () => {
      console.log("server is listening on port 3000")
})