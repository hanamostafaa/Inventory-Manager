import React from 'react';
import InventoryList from '../components/InventoryList';
import AddItem from '../components/AddItem'; // Assuming you have an AddItem component
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

const InventoryPage = () => {
    const { user_id } = useParams(); // Extract the user_id from URL params
    console.log("user_id")
    console.log(user_id)

    return (
        <div>
        <NavBar />
        <div>
            <h1>Inventory Page</h1>
            <AddItem user_id={user_id} />
            <InventoryList user_id={user_id} />  
        </div>
        </div>
    );
};

export default InventoryPage;
