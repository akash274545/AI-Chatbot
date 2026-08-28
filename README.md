हो

````markdown
# 🤖 AI Chatbot

A modern, interactive AI chatbot web application powered by **Google Gemini AI**.

This project demonstrates how to integrate a Generative AI API with a Node.js and Express.js backend and build a responsive chatbot interface using HTML, CSS, and JavaScript.

---

## ✨ Features

- 🤖 Google Gemini AI integration
- 💬 Real-time AI conversation
- 🎨 Modern and responsive UI
- ✨ Animated user interface
- 🌙 Dark Mode
- 🆕 New Chat
- 🗑️ Clear Chat
- 🕘 Chat History
- 📋 Copy AI responses
- 🕐 Message timestamps
- ⌨️ AI response typing effect
- 📜 Smooth automatic scrolling
- ⌨️ Send message using Enter key
- 📱 Responsive design
- ⚡ Lightweight Node.js backend

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### AI

- Google Gemini AI
- `@google/genai`

### Other Technologies

- dotenv
- CORS
- npm
- Git
- GitHub

---

## 📂 Project Structure

```text
AI-Chatbot/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .env
├── .gitignore
├── chatbot.html
├── package.json
├── package-lock.json
├── README.md
└── server.js
````

---

## 🔄 Application Workflow

```text
        User
         │
         ▼
   Chat Interface
         │
         ▼
   JavaScript Frontend
         │
         ▼
    POST /chat
         │
         ▼
   Express.js Server
         │
         ▼
   Google Gemini API
         │
         ▼
    AI Response
         │
         ▼
   Chat Interface
```

The user enters a message through the chatbot interface.

The frontend sends the message to the Express.js backend through the `/chat` API endpoint.

The backend securely communicates with Google Gemini AI using the API key stored in the `.env` file.

The generated AI response is then returned to the frontend and displayed in the chat interface.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akash274545/AI-Chatbot.git
```

### 2. Navigate to the Project Directory

```bash
cd AI-Chatbot
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🔑 API Key Configuration

This project uses the **Google Gemini API**.

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace:

```text
your_gemini_api_key_here
```

with your own Gemini API key.

### 🔐 Important Security Note

Never upload your API key to GitHub.

The `.env` file is excluded from Git tracking using `.gitignore`.

```text
.env
node_modules/
```

---

## ▶️ Run the Application

Start the server using:

```bash
npm start
```

If everything is configured correctly, you should see:

```text
✅ Server running on http://localhost:3000
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📦 Available NPM Script

The project currently contains the following script:

```bash
npm start
```

Which runs:

```bash
node server.js
```

---

## 🧠 Backend API

### POST `/chat`

The frontend sends a user's message to:

```text
POST /chat
```

Request format:

```json
{
  "message": "Hello"
}
```

The server sends the message to Gemini AI and returns:

```json
{
  "reply": "Hello! How can I help you?"
}
```

---

## 🎯 Project Objectives

This project was created to learn and demonstrate:

* Generative AI API integration
* Google Gemini API usage
* Node.js backend development
* Express.js
* REST API communication
* Frontend and backend integration
* Asynchronous JavaScript
* Environment variable management
* API key security
* Modern UI development
* Git and GitHub workflow

---

## 🚀 Future Improvements

Possible future enhancements include:

* 👤 User authentication
* 💾 Database-based chat storage
* 🧠 Persistent AI conversation memory
* 🗣️ Voice input and voice responses
* 📎 File upload support
* 📝 Markdown and code formatting
* 🔍 Advanced chat search
* 📊 Usage analytics
* ☁️ Cloud deployment
* 🔔 Notifications
* ⚙️ User-specific chatbot settings

---

## 📸 Project Preview

### AI Chatbot Interface

The application provides a modern chatbot interface with:

* Sidebar navigation
* Chat history
* Dark mode
* Animated UI
* Gemini AI integration
* Interactive message area

---

## 👨‍💻 Author

### Akash Narayankar

**B.Tech – Information Technology**
**M.Tech – Computer Engineering**

GitHub:
[https://github.com/akash274545](https://github.com/akash274545)

---

## 📄 License

This project was created for educational and portfolio purposes.


