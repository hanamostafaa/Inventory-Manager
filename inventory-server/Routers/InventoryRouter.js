import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js';
const inv_router = express.Router();
import * as InventoryController from "../Controllers/InventoryController.js";


inv_router.get('/items/:user_id', authenticate,InventoryController.get_items);
inv_router.post('/items',authenticate, InventoryController.add_item);


export default inv_router;
