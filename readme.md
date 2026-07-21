# 📖 Secret Diary Application

A full-stack private diary application where users can create, manage, and store their personal diary chapters securely.

Users can register, login, create diary chapters, update them, mark favorites, view their previous entries, and delete chapters with password verification.

---

##  Features

### 🔐 Authentication

- User registration
- User login/logout
- Session-based authentication
- Protected user data
- Password hashing using bcrypt

---

### 📚 Diary Management

Users can:

- Create new diary chapters
- View all personal chapters
- View a single chapter
- Update existing chapters
- Delete chapters
- Mark chapters as favorite 
- See created and updated dates

---

###  Security

- User sessions
- Password verification before deletion
- User-specific chapter access
- SQL parameterized queries to prevent SQL injection

---

##  Application Flow

```
Register
   |
   ↓
Login
   |
   ↓
Dashboard
   |
   ↓
Create Chapter
   |
   ↓
View Chapter
   |
   ├── Edit Chapter
   |
   └── Delete Chapter
```

---

#  Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API

## Backend

- Node.js
- Express.js
- Express Router
- Middleware

## Database

- PostgreSQL

## Other Tools

- bcrypt
- express-session
- dotenv
- Git/GitHub

---

# 📂 Project Structure

```
Secret-Diary

│
├── client
│
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── diary.html
│   ├── createChapter.html
│   └── editChapter.html
│
│
├── server
│
│   ├── controllers
│   │
│   │   ├── authController.js
│   │   └── chapterController.js
│   │
│   ├── routes
│   │
│   │   ├── authRoutes.js
│   │   └── chapterRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/secret-diary.git
```

Move into project folder:

```bash
cd secret-diary
```

Install dependencies:

```bash
npm install
```

---

#  Environment Variables

Create a `.env` file:

```
PORT=8080

DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_HOST=localhost
DB_PORT=5432

SESSION_SECRET=your_secret_key
```

---

#  Database Setup
Create users table:

```sql
CREATE TABLE users(

id SERIAL PRIMARY KEY,

username VARCHAR(50) UNIQUE NOT NULL,

email VARCHAR(100) UNIQUE NOT NULL,

password TEXT NOT NULL

);
```

Create chapters table:

```sql
CREATE TABLE chapters(

id SERIAL PRIMARY KEY,

title VARCHAR(100) NOT NULL,

content TEXT NOT NULL,

favourite BOOLEAN DEFAULT FALSE,

user_id INTEGER REFERENCES users(id),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

# ▶️ Running The Project

Start backend:

```bash
npm start
```

Server runs:

```
http://localhost:8080
```

Open frontend:

```
client/index.html
```

---

# 📡 API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

Body:

```json
{
 "username":"ali",
 "email":"ali@gmail.com",
 "password":"123456"
}
```

---

### Login User

```
POST /api/auth/login
```

Body:

```json
{
 "username":"ali",
 "password":"123456"
}
```

---

### Logout

```
POST /api/auth/logout
```

---

# 📖 Chapter APIs


## Create Chapter

```
POST /api/dairy/chapters
```

Body:

```json
{
"title":"My First Day",
"content":"Today was amazing",
"favourite":true
}
```

---

## Get All Chapters

```
GET /api/dairy/chapters
```

---

## Get Single Chapter

```
GET /api/dairy/chapters/:id
```

---

## Update Chapter

```
PUT /api/dairy/chapters/:id
```

Body:

```json
{
"title":"Updated title",
"content":"Updated content",
"favourite":false
}
```

---

## Delete Chapter

```
DELETE /api/dairy/chapters/:id
```

Requires:

```json
{
"password":"user_password"
}
```

---

#  What I Learned From This Project

- Building REST APIs
- Express routing
- Middleware
- Session authentication
- Working with PostgreSQL
- SQL queries inside Node.js
- CRUD operations
- Connecting frontend with backend
- Handling authentication flow
- Protecting user data

---

# 🔮 Future Improvements

- Rich text editor for diary writing
- Image upload
- Dark mode
- Search chapters
- Pagination
- Better UI animations
- JWT authentication option
- Mobile responsive design

---

# 👨‍💻 Author

Created by **Khizar Hayat**

A learning project focused on becoming a better full-stack developer 🚀
