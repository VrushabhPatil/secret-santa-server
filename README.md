# 🎅 Secret Santa Assignment – Backend

A production-ready Node.js + Express backend service that automates Secret Santa assignments while respecting business constraints.

---

## 🌍 Live Demo

Backend: https://your-render-url.onrender.com  
Frontend: https://your-vercel-url.vercel.app  

---

## 📌 Overview

This backend service processes employee CSV files and generates Secret Santa assignments with the following rules:

- ❌ An employee cannot be assigned to themselves
- ❌ An employee cannot be assigned the same secret child as last year
- ✅ Each employee must have exactly one secret child
- ✅ Each secret child must be assigned to only one employee

The system ensures reliable, constraint-based assignment with proper error handling.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Multer (File Upload)
- csv-parser
- csv-writer
- Jest (Unit Testing)

---

## 🏗 Architecture

The project follows a modular layered architecture:

src/
├── controllers/ → Request/response handling
├── services/ → Business logic & validation
├── models/ → Employee entity
├── utils/ → CSV parsing & writing
├── routes/ → API routing
├── middlewares/ → Global error handling
└── app.js → Express configuration


### Design Principles

- Separation of Concerns
- Single Responsibility Principle
- Modular & Extensible
- Clean Code Practices

---

## 🧠 Assignment Algorithm

The system uses a randomized derangement strategy:

1. Shuffle employee list
2. Validate constraints:
   - No self assignment
   - No previous-year repetition
3. Retry up to 200 attempts if invalid
4. Throw error if no valid mapping is found

### Time Complexity

O(n) per attempt  
Worst-case: O(n × retries)

This approach ensures simplicity, correctness, and scalability for typical employee sizes.

---

## 📂 API Endpoint

### POST `/api/santa`

### Form Data

| Field | Type | Required |
|--------|--------|-----------|
| employees | CSV File | Yes |
| previous | CSV File | No |

### Response

Returns a generated CSV file containing:

- Employee_Name
- Employee_EmailID
- Secret_Child_Name
- Secret_Child_EmailID

---

## 📥 Input Format

### Employees CSV

Employee_Name,Employee_EmailID
John,john@test.com
Jane,jane@test.com
Mike,mike@test.com


### Previous Year CSV (Optional)

Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID


---

## ⚙️ Local Setup

```bash
git clone https://github.com/yourusername/secret-santa-server.git
cd secret-santa-server
npm install
npm start
Server runs at:

http://localhost:5000
🧪 Running Tests
npm test
Tests validate:

No self assignment

Valid one-to-one mapping

Constraint enforcement

⚠️ Edge Case Handling
The system handles:

Minimum 2 employees required

Duplicate email detection

Invalid CSV structure

Corrupted file handling

Impossible assignment scenario

Proper error responses

🚀 Deployment
Deployed using Render.

Configuration:

Build Command: npm install

Start Command: node server.js
