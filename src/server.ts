import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server = createServer((req: IncomingMessage, res: ServerResponse) => {
       //console.log(req.url);   // '/', '/user", '/product'
      // console.log(req.method);  // "Get", "post", "put", "delete"

      const url = req.url;
      const method = req.method;

      if(url === "/" && method === "GET"){
            // console.log("this is Root route");
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify({ message: "this is Root route" }));
      }
      else if (url?.startsWith('/products')){
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify({ message: "this is Products route" }));
      }
       else{
            res.writeHead(404, {"content-type": "application/json"})
            res.end(JSON.stringify({ error: "Route not found" }));
      }
});

server.listen(3000, () => {
      console.log("server is listening on port 3000")
})