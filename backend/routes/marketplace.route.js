import { Router } from "express";
import { addNewAddress, getProductByid, getProducts, placeOrder } from "../controllers/marketplace.controller.js";


const marketPlaceRoute = Router();


marketPlaceRoute.get("/getProducts", getProducts );
marketPlaceRoute.get("/getProductByid/:id", getProductByid);
marketPlaceRoute.post("/placeOrder", placeOrder);
marketPlaceRoute.post("/addNewAddress", addNewAddress);






















export default marketPlaceRoute;
