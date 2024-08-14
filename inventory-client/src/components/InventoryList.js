import React, { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import '../styles/inventory.css'; 

const InventoryList = ({ user_id, change }) => {
    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        console.log('fetching items for user_id:', user_id);
        console.log(token)

        fetch(`http://localhost:8080/inventory/items/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('network error');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setItems(data);
            } else {
                console.error('Expected an array but got:', data);
                setItems([]); 
            }
        })
        .catch(error => {
            console.error('Error fetching items:', error);
            setItems([]); 
        });
    }, [change, user_id]); 

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
