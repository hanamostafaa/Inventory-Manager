import React, { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import '../styles/inventory.css'; // Import the CSS file

const InventoryList = ({user_id}) => {
    console.log(user_id)
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('fetchingg')
        fetch(`http://localhost:8080/inventory/items/${user_id}`)
            .then(response => response.json())
            .then(data => {
                // Ensure the data is an array
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setItems([]); // Set to an empty array if not an array
                }
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                setItems([]); // Handle fetch error
            });
    }, []);

    return (
        <div className="container inventory-list">
            <h2>Inventory List</h2>
            <ul>
                {items.map(item => (
                    <InventoryItem key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;
