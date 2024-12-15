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

-->https://github.com/Akshith268/library-management-backend.git

-->cd backend

2.Install Dependencies:

-->npm install

3.Set Up Environment Variables

-->Create a .env file in the project root and configure the following:

-------->PORT=5000

-------->MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library

-------->JWT_SECRET=your_jwt_secret


4.Start the Server:

-->run the command ----> node server.js

-->The server will start at http://localhost:5000.

--------------------------------------------------------------------------------------------------------------------



SCREEN SHOTS:
-------------------------------------------------------------------

Signup:

![Screenshot 2024-12-15 184249](https://github.com/user-attachments/assets/bffe8d6f-0065-41f5-ab4b-fcbc0c935541)

Login:

![Screenshot 2024-12-15 184430](https://github.com/user-attachments/assets/dba1d47b-2715-4d81-bb94-f5e4385d1e72)

Update User:

![Screenshot 2024-12-15 184444](https://github.com/user-attachments/assets/200d17df-6701-4cfb-8f67-0ba82d8e1730)


Delete User:

![Screenshot 2024-12-15 184503](https://github.com/user-attachments/assets/f76a9f15-9b43-44a4-9a55-fd0286f097e5)

Session Valdation:

![Screenshot 2024-12-15 184517](https://github.com/user-attachments/assets/56f7a1de-a6d0-4aec-b62c-7e9d975b35d6)

Add book:

![Screenshot 2024-12-15 184534](https://github.com/user-attachments/assets/b034ca05-8697-407a-823a-df1bdf35608a)

Retrieve books:

![Screenshot 2024-12-15 184605](https://github.com/user-attachments/assets/5a1f0f4a-04c3-408a-9cf6-25883df9be52)

Get books of author:

![Screenshot 2024-12-15 184621](https://github.com/user-attachments/assets/71957f5b-484a-4e43-8cb0-a6584b2703db)

update book details:

![Screenshot 2024-12-15 184638](https://github.com/user-attachments/assets/dbd4c382-f5e8-4701-80f6-d8d27cace2b1)

delete books:

![Screenshot 2024-12-15 184651](https://github.com/user-attachments/assets/edb44b34-a898-46a0-9da8-719a57994b8f)

reader profile:

![Screenshot 2024-12-15 184702](https://github.com/user-attachments/assets/d7cc5af7-3277-44f4-afed-2b5cde63368c)

borrow books:

![Screenshot 2024-12-15 184725](https://github.com/user-attachments/assets/d9605f0f-da73-4db8-b9bf-c77d24241813)

return books:

![Screenshot 2024-12-15 184737](https://github.com/user-attachments/assets/b603ff7f-48c6-46b0-a964-293a358c8c3d)

reader books:

![Screenshot 2024-12-15 184751](https://github.com/user-attachments/assets/6d44bd35-c966-472a-80b1-56e1ed583607)





