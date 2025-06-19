# 📝 Mini Task Manager API

A full-stack task manager application built using **React**, **Node.js**, **Express**, and **MongoDB**.  
Users can register, log in, and manage their tasks with title, description, status, and optional image.

---

## 🚀 Tech Stack

| Part      | Tech Used                |
|-----------|--------------------------|
| Frontend  | React, Tailwind CSS      |
| Backend   | Node.js, Express         |
| Database  | MongoDB (Mongoose)       |
| Auth      | JWT, HTTPOnly Cookies    |

---

## 📦 Features

- 🔐 User Authentication (Register/Login/Logout)
- 📋 Create, Update, Delete & View Tasks
- 🖼 Optional image upload via URL
- 🔒 Only logged-in users can manage their tasks
- 💻 Responsive & modern UI

---



🧪 Common Errors & Solutions
Error Message	Fix
Cannot destructure property 'title' of req.body	Ensure express.json() middleware is used in backend
Task not found	Check if you're sending correct task ID and are authenticated
Auth Error: Cannot read properties of undefined	Make sure you're sending cookie token in frontend (withCredentials)
CORS Error	Allow credentials in both backend CORS and axios config