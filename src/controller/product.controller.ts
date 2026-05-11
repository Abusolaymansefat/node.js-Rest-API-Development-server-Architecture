import type { IncomingMessage, ServerResponse } from "node:http";
import { productData } from "../service/product.service";
import type { Iproducrt } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

      console.log("Request received at product controller", req);
      const url = req.url;
      const method = req.method;

      const urlParts = url?.split("/");
      // console.log(urlParts);
      const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

      // console.log("this is path param id", id)
      // Get All products
      if (url === "/products" && method === "GET") {

            const products = productData();
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: "product retrived successfully .", data: products }))
      }
      else if (method === "GET" && id !== null) {
            const products = productData();
            const product = products.find((p: Iproducrt) => p.id === id);
            // console.log(product);
            res.writeHead(200, { "content-type": "application/json" })
            res.end(
                  JSON.stringify({
                        message: "product retrived successfully .",
                        data: product
                  }))

      }else if (method === "post" && url === "/products"){

            const body = await parseBody(req);
            console.log(body);
            res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({message: "Product created successfully.",
                  // data: product
            }))
      }
};

// explor e more about url parsing and query params in node js without express. 