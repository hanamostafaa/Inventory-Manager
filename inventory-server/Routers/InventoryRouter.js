import express from 'express'
const inv_router = express.Router();
import * as InventoryController from "../Controllers/InventoryController.js";


inv_router.get('/items/:user_id', InventoryController.get_items);
inv_router.post('/items', InventoryController.add_item);


export default inv_router;
