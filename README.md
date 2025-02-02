# 📝 Task Manager - Monorepo

A **Task Manager** built as a **monorepo** using **Turbo** for efficient development and management. This project consists of:

- 🖥 **Backend**: Developed with **NestJS** and **Prisma** in **TypeScript**.
- 🌐 **Frontend**: Built with **React** and **CSS**.

---

## 📖 Table of Contents

1. [📂 Project Structure](#project-structure)
2. [🛠 Technologies Used](#technologies-used)
3. [⚙️ Setup Instructions](#setup-instructions)
4. [🔄 Common Commands](#common-commands)
5. [🌟 Features](#features)

---

## 📂 Project Structure

```
.
├── apps/
│   ├── backend/      # 🖥 Backend service (NestJS + Prisma)
│   ├── client/       # 🌐 Frontend application (React + CSS)
├── package.json      # Project metadata
├── package-lock.json # Dependency lock file
├── turbo.json        # Turbo configuration
└── README.md         # Documentation
```

---

## 🛠 Technologies Used

### 🖥 Backend
✅ **NestJS** - Scalable server-side application framework  
✅ **Prisma** - ORM for database interaction  
✅ **TypeScript** - Strongly typed JavaScript  

### 🌐 Frontend
✅ **React** - Component-based UI library  
✅ **CSS** - Styling solution  
✅ **TypeScript** - Ensures type safety  

### ⚡ General
✅ **Turbo** - High-performance monorepo tool  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Alexis217/react_nest_crud.git
```

### 2️⃣ Install Dependencies
Ensure `npm` is installed, then run:
```bash
npm install
```

### 3️⃣ Configure Database
Navigate to `apps/backend` and run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### 4️⃣ Start the Project
From the root directory, run:
```bash
npm run dev
```
This will start both backend and frontend using **Turbo**.

---

## 🔄 Common Commands

### 🖥 Backend
🚀 **Start server:**
```bash
npm run dev
```

### 🌐 Frontend
🌍 **Start application:**
```bash
npm run dev
```

---

## 🌟 Features

✅ **Task CRUD** - Create, Read, Update, and Delete tasks seamlessly  

---

