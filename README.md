# warehouse-ecommerce

## Description

Warehouse management system integrated with e-commerce functionalities for streamlined inventory control.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/taed13/warehouse-ecommerce-backend.git
   cd warehouse-ecommerce-backend
   ```

2. Install dependencies in file requirements.txt:

   ```bash
   npm install
   ```

3. Create file .env:

   ```bash
   touch .env
   ```

4. Add the following environment variables to the .env file:

   ```bash
   PORT=1337
   MONGO_USER=your-mongo-user
   MONGO_PASSWORD=your-mongo-password
   MONGO_CLUSTER=your-mongo-cluster
   MONGO_DATABASE=your-mongo-database
   ```

5. Start the application:

   ```bash
   npm start
   ```

## Development

If you want to contribute or run the project in development mode, you can use the following command:

```bash
npm run dev
```
