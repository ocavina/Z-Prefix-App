# Not-A-Boring-Store's Exciting Inventory Management System

## Overview
This project is a basic inventory management system built with a Node.js/Express backend, a React+Vite frontend, and a PostgreSQL database. It allows users to sign up, log in, create, update, view, and delete items from their inventory.

## Before Getting Started
Ensure you have the following installed before getting started:
- Node.js
- PostgreSQL (installed locally or via Docker)

## Getting Started
Clone this repo to your local system via the following command:

```bash
git clone <HTTP or SSH connection string>
```
Then run `cd <repo_name>` to navigate inside the project and run `code .` to open the codebase.

## Environment Setup
The server uses environment variables to configure the database and signing keys. In the `/server` folder, you'll need to create a `.env` file. If you'd like to change ports or credentials, update that file. For example:

```properties
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=docker
DB_NAME=store_database
DB_PORT=5432
MY_PRIVATE_KEY=somesuperimpressivestringofcharactersnoonewouldpossiblyguessmaybe
```

## Database Setup

However you have PostgreSQL running on your machine, ensure that you have created the necessary database and the credentials in your `/server/.env` file match your PostgreSQL configuration. I strongly recommend that you use the exact environmental variables as shown above.

## Installation

### Backend

Navigate to the `/server` folder:

   ```bash
   cd server
   ```

Install dependencies:

   ```bash
   npm install
   ```

Run Database Migrations and Seed data:

   ```bash
   npm run dev
   ```

Start the Server:

   ```bash
   npm start
   ```

Your express server should now be up and running on http://localhost:8080

### Frontend

Navigate to the `/client` folder:

   ```bash
   cd client
   ```

Install dependencies:

   ```bash
   npm install
   ```

Start the React Application:

   ```bash
   npm start
   ```

   The application should open in your browser at `http://localhost:5173` by default.

   You are now ready to use the Not-A-Boring-Store's Exciting Inventory Management System App!