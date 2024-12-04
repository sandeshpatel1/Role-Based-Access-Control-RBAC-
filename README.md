# Role-Based Access Control (RBAC) Backend

## Installation and Setup

### Step 1: Install Dependencies
Navigate to the `backend` folder and run the following command to install the required packages:
npm install

### Step 2: Create a `.env` File
Create a `.env` file in the `backend` folder with the following contents:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

### Step 3: Start the Backend Server
Run the following command to start the server:
npm start
The server will run at: http://localhost:5000

---

## How to Test the Project

Use an API testing tool like **Thunder Client** or **Postman** to test the following endpoints:

### Endpoints and Testing Steps

1. **Register a User**  
   - Endpoint: `POST /auth/register`  
   - Request Body:
     {
       "username": "testuser",
       "email": "testuser@example.com",
       "password": "password123",
       "role": "User"
     }

2. **Login as User**  
   - Endpoint: `POST /auth/login`  
   - Request Body:
     {
       "email": "testuser@example.com",
       "password": "password123"
     }

3. **Access Admin Dashboard** (Admin Only)  
   - Endpoint: `GET /admin/dashboard`  
   - Headers:
     Authorization: Bearer <your_jwt_token>

4. **Access User Profile**  
   - Endpoint: `GET /api/user/profile`  
   - Headers:
     Authorization: Bearer <your_jwt_token>

---

Now your backend is ready for use and testing!
