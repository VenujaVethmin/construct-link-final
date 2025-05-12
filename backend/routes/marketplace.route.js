import { Router } from "express";
import { addNewAddress, getProductByid, getProducts, marketplace, placeOrder, searchMarket } from "../controllers/marketplace.controller.js";


const marketPlaceRoute = Router();



marketPlaceRoute.get("/marketplace", marketplace);

marketPlaceRoute.get("/getProducts", getProducts );
marketPlaceRoute.get("/getProductByid/:id", getProductByid);
marketPlaceRoute.get("/searchMarket", searchMarket);
marketPlaceRoute.post("/placeOrder", placeOrder);
marketPlaceRoute.post("/addNewAddress", addNewAddress);
























export default marketPlaceRoute;
