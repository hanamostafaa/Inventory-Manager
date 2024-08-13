// src/components/InventoryItem.js
import React from 'react';
import '../styles/inventory.css';

const InventoryItem = ({ item }) => {
    return (
        <li className="inventory-item">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            
            {item.mechanicalParts.length > 0 && (
                <div>
                    <h4>Mechanical Parts:</h4>
                    <ul>
                        {item.mechanicalParts.map(part => (
                            <li key={part.id}>
                                <p>Material: {part.material}</p>
                                <p>Dimensions: {part.dimensions}</p>
                                <p>Weight: {part.weight}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {item.rawMaterials.length > 0 && (
                <div>
                    <h4>Raw Materials:</h4>
                    <ul>
                        {item.rawMaterials.map(material => (
                            <li key={material.id}>
                                <p>Type: {material.type}</p>
                                <p>Purity: {material.purity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {item.electricalParts.length > 0 && (
                <div>
                    <h4>Electrical Parts:</h4>
                    <ul>
                        {item.electricalParts.map(part => (
                            <li key={part.id}>
                                <p>Voltage: {part.voltage}</p>
                                <p>Current: {part.current}</p>
                                <p>Power Rating: {part.powerRating}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default InventoryItem;
