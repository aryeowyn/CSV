# User File Upload API

This is a simple API built with Node.js, Express.js, and MongoDB that allows users to register and upload CSV files that are associated with their account. Only the user who uploaded a file is able to view it.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) v12 or higher installed on your machine
- [MongoDB](https://www.mongodb.com) instance running locally or hosted in the cloud (e.g. MongoDB Atlas)
- A code editor of your choice (e.g. VS Code)

## Installation
1. Clone this repository to your local machine using Git or download the ZIP file.
```
git clone https://github.com/aryeowyn/CSV.git
```
2. Navigate to the project directory and install the required packages using the console with:
```
npm install
```
3. Create a MongoDB instance to store the app's data. You can create a cluster on the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website, which offers a free tier for development and testing.
4. Once you have created a cluster, click the "Connect" button to get the connection string. Make sure to replace `<password>` with the password for the MongoDB user you created for the app.
5. Create a `.env` file in the project root directory and add the following environment variables:
```
DB_URL = <MongoDB connection string>
SECRET_KEY = <session secret key>
```
Replace `<MongoDB connection string>` with the connection string for your MongoDB instance, and `<session secret key>` with a secret key of your choice.

## Usage

1. Start the app by running the following command:
```
npm run dev
```
2. Use an API testing tool such as Postman or Insomnia to interact with the endpoints. You can import the included `User File Upload API.postman_collection.json` file into Postman to quickly add the endpoints to your workspace.
3. Register a new user by sending a `POST` request to `http://localhost:3000/user/register` with the following JSON payload:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
4. Log in to the app by sending a `POST` request to `http://localhost:3000/user/login` with the following JSON payload:
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
5. Upload a new CSV file by sending a `POST` request to `http://localhost:3000/file` with the following multipart/form-data payload:
```
name: <file name>
file: <file>
```
Replace <file name> with the desired name for the file, and <file> with the CSV file you want to upload.
6. Retrieve the details of a file by sending a GET request to `http://localhost:3000/file/<file ID>`, where <file ID> is the unique ID of the file you want to retrieve. Only the user who uploaded the file can view its details.
7. Log out of the app by sending a POST request to `http://localhost:3000/user/logout`.
