// src/components/AddItem.js
import React, { useState } from 'react';
import '../styles/inventory.css';

const AddItem = ({user_id}) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [weight, setWeight] = useState('');
  const [rawType, setRawType] = useState('');
  const [purity, setPurity] = useState('');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [powerRating, setPowerRating] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      user_id,
      name,
      quantity,
      type,
      ...(type === 'mechanical' && { material, dimensions, weight }),
      ...(type === 'raw' && { rawType, purity }),
      ...(type === 'electrical' && { voltage, current, powerRating }),
    };

    console.log('Form Data:', formData);

    // Send the data to the backend
    fetch('http://localhost:8080/inventory/items', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item added:', data);
        // Optionally clear the form or handle the response
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div className="container">
      <div className="add-item-form">
        <h3>Select part type:</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="mechanical"
              checked={type === 'mechanical'}
              onChange={handleChange}
            />
            Mechanical
          </label>
          <label>
            <input
              type="radio"
              value="electrical"
              checked={type === 'electrical'}
              onChange={handleChange}
            />
            Electrical
          </label>
          <label>
            <input
              type="radio"
              value="raw"
              checked={type === 'raw'}
              onChange={handleChange}
            />
            Raw Material
          </label>
        </div>

        <form id="add-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Inventory Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {type === 'mechanical' && (
            <div>
              <input
                type="text"
                placeholder="Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              <input
                type="text"
                placeholder="Dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
              <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          )}

          {type === 'raw' && (
            <div>
              <input
                type="text"
                placeholder="Raw Material Type"
                value={rawType}
                onChange={(e) => setRawType(e.target.value)}
              />
              <input
                type="number"
                placeholder="Purity"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
              />
            </div>
          )}

          {type === 'electrical' && (
            <div>
              <input
                type="number"
                placeholder="Voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
              />
              <input
                type="number"
                placeholder="Current"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
              <input
                type="number"
                placeholder="Power Rating"
                value={powerRating}
                onChange={(e) => setPowerRating(e.target.value)}
              />
            </div>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
