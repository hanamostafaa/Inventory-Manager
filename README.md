# Inventory Manager

## Overview

Inventory Manager is a web application designed to manage inventory items efficiently. Users can view a list of their inventory items and add new items. Each inventory item can be categorized as a "raw material," "electrical part," or "mechanical part," but can only belong to one category.

This application features user authentication with sign-up and login functionalities, secured with JWT (JSON Web Tokens). The project uses React for the frontend, Express.js for the backend, and PostgreSQL as the relational database.

## Features

- **View Inventory List**: Display all inventory items associated with the user.
- **Add Inventory Item**: Add new inventory items to the database. Items can be of type:
  - Raw Material
  - Electrical Part
  - Mechanical Part
- **User Authentication**: Sign up and log in with JWT-based authentication.
- **Middleware**: Authentication middleware to protect routes.

## Technologies Used

- **Frontend**: React
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Password Hashing**: bcrypt.js

## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (installed and running)

### Installation

#### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/inventory-manager.git
cd inventory-manager
```

#### 2. Backend Setup

1. **Navigate to the Backend Directory**

   Open your terminal and navigate to inventory-server:

   ```bash
   cd inventory-server
   ```
   Install Dependencies

2. **Install the required Node.js packages**

```bash
npm install
```
3. **Configure Environment Variables**

Create a .env file in the inventory-server directory with the following content:
```bash
env
Copy code
DB_USER=postgres
DB_HOST=localhost
DB_NAME=inventory
DB_PASSWORD=your-db-password
DB_PORT=5432
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d
PORT=8080
//Replace your-db-password with your PostgreSQL password and your-jwt-secret with a secure JWT secret key.
```

4. **Start the Backend Server**

Start the Express.js server:

```bash
npm start
```
The backend server will run on http://localhost:8080.

#### 3. FrontEnd Setup
1. **Navigate to the Frontend Directory**

Open a new terminal tab or window, then navigate to the frontend directory:

```bash
cd ../inventory-client
```
2. **Install Frontend Dependencies**

Install the required Node.js packages:

```bash
npm install
```
3. **Start the Frontend Development Server**

Start the React development server:

```bash
npm start
```
The frontend server should now be running on http://localhost:3000.
#### 4. Database
1. **Run this script in pg-admin**
```bash
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
    email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone_number VARCHAR(20);
);

CREATE TABLE InventoryItem (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "User" (id)
);

CREATE TABLE MechanicalPart (
    id SERIAL PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    dimensions VARCHAR(255) NOT NULL,
    weight FLOAT NOT NULL,
    inventory_item_id INT,
    FOREIGN KEY (inventory_item_id) REFERENCES InventoryItem (id)
);

CREATE TABLE RawMaterial (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    purity FLOAT NOT NULL,
    inventory_item_id INT,
    FOREIGN KEY (inventory_item_id) REFERENCES InventoryItem (id)
);

CREATE TABLE ElectricalPart (
    id SERIAL PRIMARY KEY,
    voltage FLOAT NOT NULL,
    current FLOAT NOT NULL,
    powerRating FLOAT NOT NULL,
    inventory_item_id INT,
    FOREIGN KEY (inventory_item_id) REFERENCES InventoryItem (id)
);

```



   



