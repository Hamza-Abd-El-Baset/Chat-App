# Socket.IO Chat App

A **real-time chat application** built with the **MERN stack** and **Socket.IO**, featuring real-time user status, image sharing with previews, and secure authentication.

## 🚀 Features
- Real-time messaging using **Socket.IO**
- **User authentication with JWT**
- **Real-time user status (Online/Offline)**
- **Send images with preview** before sending
- Fully responsive UI
- **Fullstack deployment** on Render.com

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **Real-time Communication:** Socket.IO
- **Cloud Storage:** Cloudinary
- **Deployment:** Render.com

## 📂 Project Structure
```
Chat-App/
│── backend/            # Server-side code (Node.js, Express, MongoDB)
│── frontend/           # Client-side code (React, Vite)
│── .env                # Environment variables
│── package.json        # Project dependencies and scripts
│── README.md           # Documentation
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Hamza-Abd-El-Baset/Chat-App.git
cd Chat-App
```

### 2️⃣ Set Up Environment Variables
Create a `.env` file in the **root directory** and add the following:
```sh
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173

VITE_API_DOMAIN=http://localhost:5001
VITE_MODE=development
```

### 3️⃣ Build the application
```sh
npm run build
```

### 4️⃣ Start the Application
```sh
npm start
```

## 🌍 Deployment
The application is fully deployed on Render.
- **Live Demo:** [Chat App](https://chat-app-y19h.onrender.com)
- **GitHub Repo:** [GitHub](https://github.com/Hamza-Abd-El-Baset/Chat-App)

## 📜 License
This project is open-source and available under the **MIT License**.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---
🚀 Built by **Hamza Abd-El-Baset El-Gebaly**
