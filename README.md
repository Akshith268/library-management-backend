# library-management-backend
--------------------------------------------------------------------------------------------------------------------
This project implements a Library Management System that allows users to perform various operations such as managing books, borrowing books, and creating reader profiles. The system supports role-based actions for Authors and Readers, with the following key features:


1.Role-Based Access Control:
Ensures that only authorized roles can perform certain actions.
For example, only Authors can update or delete their books, and only Readers can borrow books.

2.Efficient Database Design:
Uses MongoDB to store books and users with relationships between them (e.g., author field in books links to a User).

3.RESTful API:
Clean, modular API routes for managing books and profiles.
Middleware handles authentication and role authorization.

4.Error Handling and Validations:
Handles invalid inputs, unauthorized access, and other errors gracefully.

5.Scalability:
Supports future additions like new user roles or extended book attributes.



-----------------------------------------------------------------------------------------------------------------


Instructions to Set Up and Run the Project
-------------------------------------------------------------------

Prerequisites:
Node.js (v16 or later)
MongoDB (local or cloud-based)
Postman (or any API testing tool) for testing endpoints
--------------------------------------------------------------------
Installation Steps:

1.Clone the Repository:
https://github.com/Akshith268/library-management-backend.git
cd backend

2.Install Dependencies:
npm install


3.Set Up Environment Variables
Create a .env file in the project root and configure the following:
PORT=5000 <br/>
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library
JWT_SECRET=your_jwt_secret


4.Start the Server:
run the command ----> node server.js
The server will start at http://localhost:5000.

--------------------------------------------------------------------------------------------------------------------



