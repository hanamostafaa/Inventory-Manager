import pool from '../models/db.js'
const get_items = async (req, res) => {
    const { user_id } = req.params; // Get user_id from request parameters
    try {
        const inventoryItems = await pool.query(`
            SELECT 
                ii.id as item_id, 
                ii.name, 
                ii.quantity,
                mp.id as mp_id,
                mp.material,
                mp.dimensions,
                mp.weight,
                rm.id as rm_id,
                rm.type,
                rm.purity,
                ep.id as ep_id,
                ep.voltage,
                ep.current,
                ep.powerRating
            FROM InventoryItem ii
            LEFT JOIN MechanicalPart mp ON ii.id = mp.inventory_item_id
            LEFT JOIN RawMaterial rm ON ii.id = rm.inventory_item_id
            LEFT JOIN ElectricalPart ep ON ii.id = ep.inventory_item_id
            WHERE ii.user_id = $1
        `, [user_id]); 
        if (!inventoryItems.rows) {
            throw new Error("no inv items");
        }

        //console.log('inv items:', inventoryItems.rows); 

        const groupedItems = inventoryItems.rows.reduce((acc, row) => {
            let item = acc.find(i => i.id === row.item_id);
            if (!item) {
                item = {
                    id: row.item_id,
                    name: row.name,
                    quantity: row.quantity,
                    mechanicalParts: [],
                    rawMaterials: [],
                    electricalParts: []
                };
                acc.push(item);
            }

            if (row.mp_id) {
                item.mechanicalParts.push({
                    id: row.mp_id,
                    material: row.material,
                    dimensions: row.dimensions,
                    weight: row.weight,
                });
            }

            if (row.rm_id) {
                item.rawMaterials.push({
                    id: row.rm_id,
                    type: row.type,
                    purity: row.purity,
                });
            }

            if (row.ep_id) {
                item.electricalParts.push({
                    id: row.ep_id,
                    voltage: row.voltage,
                    current: row.current,
                    powerRating: row.powerRating,
                });
            }

            return acc;
        }, []);

        res.json(groupedItems);
    } catch (err) {
        console.error('Error in get_items:', err); 
        res.status(500).json({ error: err.message });
    }
};
const add_item = async (req, res) => {
    const {user_id, name, quantity, type, material, dimensions, weight, rawType, purity, voltage, current, powerRating } = req.body;
    
    try {
        //insert in parent table
        const result = await pool.query(
            `INSERT INTO InventoryItem (user_id, name, quantity) VALUES ($1, $2, $3) RETURNING id`,
            [user_id,name, quantity]
        );
        const itemId = result.rows[0].id;

        //insert in child tables
        //ASSUMING INVENTORY ITEM CAN ONLY HAVE ONE TYPEE

        if (type === 'mechanical') {
            await pool.query(
                `INSERT INTO MechanicalPart (material, dimensions, weight, inventory_item_id) VALUES ($1, $2, $3, $4)`,
                [material, dimensions, weight, itemId]
            );
        } else if (type === 'raw') {
            await pool.query(
                `INSERT INTO RawMaterial (type, purity, inventory_item_id) VALUES ($1, $2, $3)`,
                [rawType, purity, itemId]
            );
        } else if (type === 'electrical') {
            await pool.query(
                `INSERT INTO ElectricalPart (voltage, current, powerRating, inventory_item_id) VALUES ($1, $2, $3, $4)`,
                [voltage, current, powerRating, itemId]
            );
        }

        res.status(201).json({ message: 'Item added successfully' });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: err.message });
    }
};
export{add_item,get_items}