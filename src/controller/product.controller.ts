import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, productData } from "../service/product.service";
import type { Iproducrt } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

      // console.log("Request received at product controller", req);
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

      }else if (method === "POST" && url === "/products"){

            const body = await parseBody(req);
            // console.log("Body", body);
            const products = productData();
            const newProduct = {
                  id: Date.now(),
                  ...body,
            };
            // console.log("New product", newProduct);
            products.push(newProduct);
            // console.log(products);


            insertProduct(products);

            res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({message: "Product created successfully.",
                  data: products
            }))
      }

      else if (method === "PUT" && id !== null){
            const body = await parseBody(req);
            const products = productData();
            const productIndex = products.findIndex((p: Iproducrt) => p.id === id);
            // console.log(productIndex);
            if(productIndex < 0){
                  res.writeHead(404, {"content-type" : "application/json"});
                   res.end(JSON.stringify({message: "Product Not Found.",
                  data: null,
            }))
      }
      // console.log(products[productIndex]);
      products[productIndex] = {
            id: products[productIndex].id,
            ...body
      }
      insertProduct(products);
      res.writeHead(200, {"content-type" : "application/json"});
                   res.end(JSON.stringify({message: "Product updated successfully.",
                  data: products[productIndex],
            }))
}
}