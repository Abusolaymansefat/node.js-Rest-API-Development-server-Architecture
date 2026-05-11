import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routesHandler = (req: IncomingMessage, res: ServerResponse) => {
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
            productController(req, res);
      }
       else{
            res.writeHead(404, {"content-type": "application/json"})
            res.end(JSON.stringify({ error: "Route not found" }));
      }
}