# **Tracom GPT**

Tracom GPT is a web-based tool designed to test various configurations of OpenAI APIs for Tracom. By leveraging a mixture of embeddings and settings, it allows users to explore and evaluate different model configurations for generating responses.

---

## **Features**
- **Dynamic API Testing**: Test OpenAI API configurations in real-time.
- **Embeddings Integration**: Experiment with embeddings for customized results.
- **Multi-API Support**: Incorporates OpenAI, Pinecone, and a database for advanced functionality.

---

## **Getting Started**

### **Prerequisites**
1. **Install Node.js**:
   - [Download and Install Node.js](https://nodejs.org/)
   - Ensure `npm` is installed alongside Node.js.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/tracom-gpt.git
   cd tracom-gpt
   ```

---

### **Environment Variables**
To run this project, you need to set up the following environment variables in two different folders:

#### **Frontend (`tracom-gpt`)**
1. Navigate to the `tracom-gpt` folder:
   ```bash
   cd tracom-gpt
   ```
2. Create a `.env` file (if it doesn't already exist):
   ```bash
   touch .env
   ```
3. Add the following line to `.env`:
   ```
   VUE_APP_API_BASE_URL=http://localhost:3000
   ```

#### **Backend (`backend`)**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a `.env` file (if it doesn't already exist):
   ```bash
   touch .env
   ```
3. Add the following lines to `.env`:
   ```
   OPENAI_API_KEY=your-openai-api-key
   PINECONE_API_KEY=your-pinecone-api-key
   DATABASE_URL=your-database-url
   ```

**Note**: Replace `your-openai-api-key`, `your-pinecone-api-key`, and `your-database-url` with your actual keys and database connection string.

---

### **Installation**
1. Navigate to the project root directory.
2. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   cd backend && npm install
   cd ../tracom-gpt && npm install
   ```

---

### **Running the Project**

#### **First-Time Setup**
To run the project for the first time:
1. Navigate to the root directory.
2. Run the combined command to start both the backend and frontend:
   ```bash
   npm run start-all
   ```

This will:
- Start the backend server (`node server.js`) at `http://localhost:3000`.
- Launch the frontend (`npm run serve`) at `http://localhost:8080`.

#### **Manually Running Each Service**
Alternatively, you can start the services separately:
1. **Backend**:
   ```bash
   cd backend
   node server.js
   ```
2. **Frontend**:
   ```bash
   cd tracom-gpt
   npm run serve
   ```

---

### **Additional Commands**

#### **Frontend (`tracom-gpt`)**
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Compiles and Hot-Reloads for Development**:
  ```bash
  npm run serve
  ```
- **Compiles and Minifies for Production**:
  ```bash
  npm run build
  ```
- **Lints and Fixes Files**:
  ```bash
  npm run lint
  ```

#### **Backend**
- **Start the Server**:
  ```bash
  node server.js
  ```

---

### **Project Structure**
```
.
├── backend/              # Node.js backend for API handling
│   ├── server.js         # Backend server entry point
│   └── .env              # Backend environment variables
├── tracom-gpt/           # Vue.js frontend for the application
│   ├── src/              # Frontend source code
│   └── .env              # Frontend environment variables
└── README.md             # Project documentation
```

---

---

### **Contributors**
- [Tyler Collins]
```

This markdown file is ready to be used as your `README.md`. It follows standard markdown syntax with proper formatting for headings, code blocks, and bullet points. Let me know if there’s anything else you’d like to add or revise!