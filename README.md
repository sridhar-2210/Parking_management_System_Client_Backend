# ⚙️ Parking Management System - Client Backend

The high-performance API engine powering the client-side experience of the Parking Management System. This backend handles the critical logic for user authentication, real-time parking availability, and secure booking transactions.

---

## ✨ Core Features

- **User Authentication & Security:** Robust signup/login system using JWT (JSON Web Tokens) and Bcrypt for secure password hashing.
- **Real-Time Slot Discovery:** Optimized endpoints for querying available parking spots based on proximity and vehicle type.
- **Transaction Integrity:** Atomic booking operations to ensure that once a user reserves a spot, it is instantly locked across the system.
- **Booking Management:** Full lifecycle support for user tickets, from reservation and active status to checkout and payment history.
- **Automated Pricing Engine:** Backend logic to calculate parking fees dynamically based on duration and lot-specific rates.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime Environment** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (NoSQL) |
| **ORM / ODM** | Mongoose |
| **Authentication** | JWT & Middleware-based Authorization |
| **API Architecture** | RESTful Patterns |

---

## 🏗️ Architecture & Design

This backend is built for **speed and reliability**, utilizing a structured layout:
- **Models:** Optimized schemas for Users, Vehicles, and Bookings.
- **Controllers:** Clean logic separation to handle request processing and data manipulation.
- **Middleware:** Custom layers for authentication checks, error handling, and request logging.
- **Services:** Decoupled business logic to handle complex calculations like fee estimation.

---

## 🚦 Installation & Setup

To run the client backend locally:

1. **Clone the repository:**
   git clone https://github.com/sridhar-2210/Parking_management_System_Client_Backend.git
   cd Parking_management_System_Client_Backend

2. **Install dependencies:**
   npm install

3. **Configure Environment Variables:**
   Create a .env file in the root directory:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_client_auth_secret

4. **Start the server:**
   npm start
   (or `npm run dev` for development mode)

---

## 💡 Challenges & Solutions

**The Challenge:** Handling "Race Conditions" where two users might try to book the last available parking spot at the exact same millisecond.
**The Solution:** Implemented strict database-level validation and pre-save hooks. Before a booking is confirmed, the system performs a final check on the slot's status within an atomic transaction, ensuring that "double-booking" is mathematically impossible.

---

## 👤 Author

**Sridhar**
* **GitHub:** [@sridhar-2210](https://github.com/sridhar-2210)
* **LinkedIn:** [/vangara-sridhar](https://www.linkedin.com/in/vangara-sridhar/)

---
*This backend serves as a scalable foundation for urban mobility and smart city infrastructure.*
