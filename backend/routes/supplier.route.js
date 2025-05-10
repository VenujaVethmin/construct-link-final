import { Router } from "express";
import { createProduct, getProduct, updateProduct } from "../controllers/supplier.controller.js";


const supplierRoute = Router();


supplierRoute.get("/getProduct", getProduct);
supplierRoute.post("/createProduct", createProduct);
supplierRoute.put("/updateProduct/:id", updateProduct);















export default supplierRoute;
