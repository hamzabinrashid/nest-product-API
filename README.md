# 📦 Product Management API with Prisma

This project is a REST API built using [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/). It allows users to manage a list of products with full CRUD operations (Create, Read, Update, Delete), along with additional search functionality, and data persistence with PostgreSQL.

## Table of Contents
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database Setup with Prisma](#database-setup-with-prisma)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Create a Product](#create-a-product)
  - [Get All Products](#get-all-products)
  - [Get a Product by ID](#get-a-product-by-id)
  - [Update a Product](#update-a-product)
  - [Search Products](#search-products)
  - [Delete a Product](#delete-a-product)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Performance & Scalability](#performance--scalability)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- Full CRUD (Create, Read, Update, Delete) for products.
- Search functionality for filtering products based on keywords.
- Input validation using Data Transfer Objects (DTOs) and Pipes.
- Exception handling for better error management.
- Pagination support for product listing.
- Structured and scalable codebase using NestJS modules, controllers, services.
- Prisma ORM for database interactions.
- PostgreSQL as the database.

## Project Architecture
```
src/
│
├── product/
│   ├── dto/                # Data Transfer Objects for validation
│   ├── entities/           # Product entity class
│   ├── product.controller.ts # Handles HTTP requests and responses
│   ├── product.service.ts    # Business logic and product management
│   └── product.module.ts     # NestJS module to bundle controller and service
├── prisma/
│   ├── prisma.service.ts    # Encapsulates Prisma client and database connection
│   ├── prisma.module.ts     # Prisma module
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## Prerequisites
- [Node.js](https://nodejs.org/) v14 or higher
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- A package manager like `npm` or `yarn`
- [PostgreSQL](https://www.postgresql.org/) or another supported database
- [Prisma](https://www.prisma.io/)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hamzabinrashid/nest-product-api.git
   cd nest-product-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Environment Configuration
Create a `.env` file at the root of the project to configure environment-specific variables:

```bash
PORT=3000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
NODE_ENV=development
```

Replace `<username>`, `<password>`, and `<database_name>` with your actual PostgreSQL credentials.

## Database Setup with Prisma

This project uses Prisma as the ORM for interacting with a PostgreSQL database. Make sure to set up your database connection string in the `.env` file.

1. **Install PostgreSQL** and create a new database:
   ```bash
   createdb product
   ```

2. **Update your `.env` file** with the correct `DATABASE_URL` for PostgreSQL.

3. **Run the Prisma migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate the Prisma Client**:
   ```bash
   npx prisma generate
   ```

## Running the Application

To start the server in development mode, run:

```bash
npm run start:dev
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Create a Product
- **URL**: `/product`
- **Method**: `POST`
- **Description**: Create a new product.
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "category": "Electronics"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "<uuid>",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "category": "Electronics"
  }
  ```

### Get All Products
- **URL**: `/product`
- **Method**: `GET`
- **Description**: Retrieve a list of all products.
- **Response**:
  ```json
  [
    {
      "id": "<uuid>",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "category": "Electronics"
    }
  ]
  ```

### Get a Product by ID
- **URL**: `/product/:id`
- **Method**: `GET`
- **Description**: Get a product by its unique ID.
- **Response**:
  ```json
  {
    "id": "<uuid>",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "category": "Electronics"
  }
  ```

### Update a Product
- **URL**: `/product/:id`
- **Method**: `PATCH`
- **Description**: Update an existing product by its ID.
- **Request Body** (Partial or Full):
  ```json
  {
    "name": "Updated Product Name",
    "price": 120
  }
  ```
- **Response**:
  ```json
  {
    "id": "<uuid>",
    "name": "Updated Product Name",
    "description": "Product Description",
    "price": 120,
    "category": "Electronics"
  }
  ```

### Search Products
- **URL**: `/product/search?q=keyword`
- **Method**: `GET`
- **Description**: Search products by a keyword in their name only.
- **Response**:
  ```json
  [
    {
      "id": "<uuid>",
      "name": "Keyword Match Product",
      "description": "A product with keyword",
      "price": 150,
      "category": "Electronics"
    }
  ]
  ```

### Delete a Product
- **URL**: `/product/:id`
- **Method**: `DELETE`
- **Description**: Delete a product by its ID.
- **Response**: `204 No Content`

## Validation
Validation is applied using `class-validator` in DTOs. If the request body doesn't conform to the schema, a `400 Bad Request` error is returned with the validation messages.

### Example Validation Error Response
```json
{
  "statusCode": 400,
  "message": ["name must be a string", "price must be a number"],
  "error": "Bad Request"
}
```

## Error Handling
Proper exception handling is used throughout the service:
- **404 Not Found**: When a product is not found.
- **400 Bad Request**: When validation fails.
- **500 Internal Server Error**: For unexpected errors.

## Testing
To run the test suite:
```bash
npm run test:e2e
```

### Test Coverage
- CRUS operations and API testing

## Performance & Scalability
- **Pagination**: Implemented in `GET /product` endpoint using query parameters (`page`, `limit`).
- **Scalability**: Easily scalable by integrating a database and containerization using Docker. Use caching strategies like Redis for frequently accessed data.

## Security Considerations
- **Input Validation**: Validation for all incoming data to prevent injection attacks.
- **Error Handling**: Clear error messages without exposing sensitive data.
- **Authentication**: Can be added using JWT-based authentication via `@nestjs/jwt`.

## Future Enhancements
- Add authentication and authorization using JWT.
- Implement sorting and advanced filtering for product listings.
- Deploy to a cloud provider (AWS, GCP, or Azure) using Docker containers.

## License
This project is licensed under the MIT License.
