# EventsHub 🎫

EventsHub is a **full-stack web platform** for colleges and societies to **post, manage, and attend events with QR-based digital passes**.

## 🚀 Features

### ✅ **Implemented Backend Features**
- **User Authentication & Authorization**
  - Roles: Admin, Organiser, Student
- **Event Management**
  - Create, read, update, delete events
  - Search and filter events by title, description, organiser, date
- **Event Registration**
  - Students register for events and receive **unique QR code passes**
- **Attendance Marking**
  - Organisers scan student QR codes to mark attendance
  - Prevents duplicate entries

### 🛠️ **Frontend Status**
- **In progress**
  - Auth system being built with Zustand
  - Upcoming features: Event registration UI, dashboards for organiser and admin, QR code scanning integration.

## 🧑‍💻 **Tech Stack**

- **Frontend:** React.js (in progress)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcryptjs
- **Other Dependencies:** cors, morgan, qrcode

## 📁 **Backend Folder Structure**


## 🔑 **Roles & Permissions**

- **Admin**
  - Approve organisers, manage users, approve/reject events, view statistics.
- **Organiser**
  - Create/manage events, view registered students, mark attendance via QR scanning.
- **Student**
  - Register/login, browse and filter events, register for events, receive QR pass.

## ⚙️ **Setup Instructions**

1. **Clone the repository**
    ```bash
    git clone <repo-url>
    cd events-hub
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file:

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Run the backend server**
    ```bash
    npm run dev
    ```

5. **Frontend**
    - Under development.

## ✨ **Upcoming Frontend Features**

- Complete student authentication with Zustand
- Event registration UI
- Event listing with search & filter
- Organiser dashboard for event management and attendance
- Admin panel for user and event approvals
- QR scanning integration for attendance marking

---

## 🙌 **Contributing**

Currently under solo development. External contributions will be welcomed once initial frontend modules are completed.

---

## 📄 **License**

This project is open-source for educational and portfolio purposes. Proper credits appreciated if used as a template.

---

### 💡 **Note**

> **Frontend is actively in progress.** Stay tuned for major UI integrations in the upcoming commits.

---

### 🧑‍💻 **Author**

Jaivardhan Singh  
[GitHub](https://github.com/Jaivardhan7773) | [LinkedIn](https://www.linkedin.com/in/jaivardhan7773)

---
