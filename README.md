# 🍽️ Recipe Finder Backend

This is the **backend** for the **Recipe Finder** project, built with **Node.js, Express, PostgreSQL (NeonDB), and TypeScript**.  
It provides **user authentication (JWT)**, **recipe searching using the Spoonacular API**, and **saving recipes for logged-in users**.

---

## 🚀 Features
✅ **User Registration & Login** (JWT authentication)  
✅ **Search Recipes** from Spoonacular API  
✅ **Save Recipes** for logged-in users  
✅ **Retrieve Saved Recipes**  
✅ **Delete Saved Recipes**  
✅ **Pagination Support** for recipe searches  

---

## 📌 Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework for API
- **PostgreSQL (NeonDB)** - Database for storing user & recipe data
- **Sequelize** - ORM for database interaction
- **JWT (jsonwebtoken)** - Secure authentication
- **Bcrypt.js** - Password hashing for security
- **Axios** - Making API requests to Spoonacular
- **TypeScript** - Ensuring type safety in the project

---

## 📂 Project Structure
```
recipe_finder_backend/
│── src/
│   ├── config/
│   │   ├── database.ts    # Database connection
│   ├── models/
│   │   ├── User.ts        # User model
│   │   ├── Recipe.ts      # Recipe model
│   ├── routes/
│   │   ├── authRoutes.ts  # Authentication routes
│   │   ├── recipeRoutes.ts # Recipe-related routes
│   ├── middleware/
│   │   ├── authMiddleware.ts # JWT Authentication middleware
│   ├── server.ts          # Main server entry point
│── .env                   # Environment variables (not uploaded)
│── package.json           # Dependencies and scripts
│── tsconfig.json          # TypeScript configuration
│── README.md              # Documentation
```

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/recipe_finder_backend.git
cd recipe_finder_backend
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env` file in the root folder and add:
```
PORT=3000
DATABASE_URL=your_neondb_connection_url
JWT_SECRET=your_secret_key
SPOONACULAR_API_KEY=your_spoonacular_api_key
```
> 🔹 Replace values with your actual credentials.

### 4️⃣ **Run Database Migrations**
```sh
npx sequelize-cli db:migrate
```

### 5️⃣ **Start the Server**
```sh
npm run dev
```
> 🚀 Your backend will start on `http://localhost:3000`

---

## 🔗 API Endpoints

### **🔐 Authentication**
| Method | Endpoint            | Description          | Authentication |
|--------|---------------------|----------------------|---------------|
| POST   | `/api/auth/register` | Register a new user | ❌ No |
| POST   | `/api/auth/login`    | Login and get a JWT | ❌ No |

---

### **📖 Recipes**
| Method  | Endpoint              | Description                     | Authentication |
|---------|----------------------|---------------------------------|---------------|
| POST    | `/api/recipes/search` | Search for recipes (Spoonacular) | ✅ Yes |
| POST    | `/api/recipes/save`   | Save a recipe to the user's account | ✅ Yes |
| GET     | `/api/recipes/saved`  | Retrieve saved recipes | ✅ Yes |
| DELETE  | `/api/recipes/saved/:id` | Delete a saved recipe | ✅ Yes |

> **🔑 Authentication Required:**  
> Send `Authorization: Bearer YOUR_JWT_TOKEN` in the headers for **protected routes**.

---

## 🔍 Testing with Postman
1️⃣ Open **Postman**  
2️⃣ **Register a User**
   - `POST http://localhost:3000/api/auth/register`
   - Body:
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
3️⃣ **Login**
   - `POST http://localhost:3000/api/auth/login`
   - Copy the `token` from the response.
4️⃣ **Search Recipes**
   - `POST http://localhost:3000/api/recipes/search`
   - Headers:
     ```json
     {
       "Authorization": "Bearer YOUR_JWT_TOKEN"
     }
     ```
   - Body:
     ```json
     {
       "ingredients": ["chicken", "tomato"],
       "page": 1
     }
     ```
5️⃣ **Save a Recipe**
   - `POST http://localhost:3000/api/recipes/save`
   - Headers:
     ```json
     {
       "Authorization": "Bearer YOUR_JWT_TOKEN"
     }
     ```
   - Body:
     ```json
     {
       "title": "Spaghetti Carbonara",
       "imageUrl": "https://example.com/spaghetti.jpg",
       "sourceUrl": "https://example.com/spaghetti-recipe"
     }
     ```
6️⃣ **Retrieve Saved Recipes**
   - `GET http://localhost:3000/api/recipes/saved`
   - Headers:
     ```json
     {
       "Authorization": "Bearer YOUR_JWT_TOKEN"
     }
     ```
7️⃣ **Delete a Saved Recipe**
   - `DELETE http://localhost:3000/api/recipes/saved/1`
   - Headers:
     ```json
     {
       "Authorization": "Bearer YOUR_JWT_TOKEN"
     }
     ```

---

## 🔧 Deployment (Optional)
To deploy your backend, you can use **Railway, Render, or Vercel**.  

1️⃣ **Create a new project** on your chosen platform  
2️⃣ **Add your environment variables** (`DATABASE_URL`, `JWT_SECRET`, `SPOONACULAR_API_KEY`)  
3️⃣ **Deploy your backend!** 🎉  

---

## 👥 Contributors
- **Your Name** - [GitHub](https://github.com/YOUR_USERNAME)

---

## 📜 License
This project is **open-source** under the **MIT License**.
