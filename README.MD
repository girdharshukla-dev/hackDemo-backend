# 🔧 TaskMate Backend — Express + PostgreSQL + JWT

This is the backend of a task management and collaboration platform built during a 36-hour hackathon. It handles user auth, task CRUD, AI suggestions, and group-based role management — built from scratch using raw SQL queries and cookie-based JWT auth.

> 🚀 No Firebase. No ORM. Just raw backend logic.

---

## ✨ Features

### ✅ Authentication (JWT + Cookies)
- User registration with hashed passwords (`bcryptjs`)
- Login sets `httpOnly` JWT token
- Protected routes via custom middleware
- Logout clears cookie

### ✅ Tasks API
- CRUD operations for personal and group tasks
- Task ownership and role-based access control
- `PATCH` to update status or details
- AI-based suggestions via Gemini API (based on current task list)

### ✅ Group Collaboration
- Users can create groups (auto-assigned as admin)
- Admins can add members to groups
- Role management handled via a `group_members` table
- All logic enforced through server-side ownership checks

### ✅ PostgreSQL (No ORM)
- Raw SQL queries using `pg` module
- Manual transaction management for critical ops
- Schemas with proper constraints and cascading behavior

### ✅ Deployment & Testing
- Works on Render (free-tier friendly)
- Frontend consumes these APIs successfully
- `.env` driven configuration for secrets and DB

---


---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (raw SQL, no ORM)
- **JWT** (cookie-based auth)
- **Google Gemini API** (task suggestions)
- **bcryptjs** (password hashing)
- **dotenv**, **cookie-parser**, **cors**

---


> Optional: Add `DATABASE_URL` for production deployments

---

## ⚙️ Local Setup

```bash
# Install dependencies
pnpm install

# Run DB table creation (auto on start)
node initDB.js

# Start server
node server.js
```

## API Reference

## Note
- All these routes require the user to be logged-in , all routes are protected by a middleware that checks for the jwt token .

### User auth
#### POST `api/user/register`
**Request Body :**
```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "strongPassword123"
} 
```
**Response :**

201 Created on success

400 if user/email already exists

#### POST `api/user/login`
**Request Body :**
```json
{
  "email": "john@example.com",
  "password": "strongPassword123"
} 
```
**Response :**

200 On succesful login else status codes and message accordingly.

#### POST `api/user/logout`

Clears the cookie

#### POST `api/task/add`
**Request Body :**
```json
{
  "title": "Finish report",             // required
  "description": "Complete the final draft",
  "priority": "High",                   // optional: Low | Medium | High
  "duedate": "2025-07-01T18:30:00.000Z",
  "tag": "work",                        // optional
  "groupId": 1,                         // optional
  "assignedTo": 2                       // optional user ID
}

```
**Response :**

201 Created on success

Other status codes accordingly.

#### DELETE `api/task/delete/:id`
**Request Body :**
Id of task taken from params.

**Response :**

Status codes accordingly.


#### PATCH `api/task/update/:id`
**Request Body :**
```json
{
  "title": "New title",
  "description": "Updated description",
  "duedate": "2025-07-05T14:00:00.000Z",
  "priority": "Medium",
  "tag": "updated",
  "is_completed": false                // optional
}
```
**Response :**

Status codes accordingly.

#### GET `/api/task/getall`
Returns all tasks of the logged-in user.

#### GET `/api/task/get/:id`
Return the task with "id" only if created by the user

#### GET `/api/task/suggestions`
Get AI-generated suggestions based on the user's tasks.

#### POST `/api/group/create`
**Request Body :**
```json
{
  "name": "Project X"   // required, string
}
```
**Response :**
Status codes accordingly.

**Notes**
- This route runs a transactional query to create the group and assign admin rights atomically.

- Only logged-in users can create groups.

#### POST `/api/group/:groupId/add-member`
**Request Body :**
```json
{
  "userToAddId": 7    // required: ID of the user to be added
}
```
**Notes**
- This checks if the requester is the admin of the group.
- The new member is added with the role *member*
