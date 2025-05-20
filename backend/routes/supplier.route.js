import { Router } from "express";
import { createProduct, createStore, dashboard, getProduct, getSupplierById, store, updateProduct } from "../controllers/supplier.controller.js";


const supplierRoute = Router();




supplierRoute.get("/dashboard", dashboard);
supplierRoute.get("/getSupplierById/:id", getSupplierById);
supplierRoute.get("/store", store);

supplierRoute.get("/getProduct", getProduct);
supplierRoute.post("/createProduct", createProduct);
supplierRoute.post("/createStore", createStore);
supplierRoute.put("/updateProduct/:id", updateProduct);



export default supplierRoute;
