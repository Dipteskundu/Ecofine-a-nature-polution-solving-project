# EcoFine Client

## Description
EcoFine is a modern environmental action platform designed to connect citizens with local authorities and NGOs to solve real-time environmental crises. It features a responsive, high-performance UI with dynamic interactions, educational content, and actionable reporting tools. The application uses a "Green Eco-Vibe" aesthetic to align with its mission.

## Live Link
https://ecofine.netlify.app

## Technologies Used
- **Frontend Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4, DaisyUI
- **Animations:** Framer Motion
- **State Management & Routing:** React Router v7, React Hooks
- **Authentication:** Firebase (Google & Email/Password)
- **Networking:** Axios
- **Visualization:** Recharts
- **Icons:** Lucide React, FontAwesome



## Core Features
1.  **Citizen Reporting System:** Users can report environmental issues with locations, images, and descriptions.
2.  **Interactive Blog:** Educational content with category filtering ("Success Stories", "Guides") and search functionality.
3.  **Real-Time Analytics:** Visual dashboards tracking environmental impact metrics.
4.  **Global Green Theme:** A unified, nature-inspired design system with dark/light mode support.
5.  **Secure Authentication:** Robust User and Admin login flows using Firebase (Google & Email/Password).
6.  **Responsive Design:** Fully mobile-optimized navigation, modals, and layouts.

## Dependencies
- `react`, `react-dom`
- `react-router-dom`
- `tailwindcss`, `@tailwindcss/vite`, `daisyui`
- `framer-motion`
- `axios`
- `firebase`
- `react-hot-toast`
- `lucide-react`
- `recharts`
- `jspdf`, `jspdf-autotable`

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher) installed on your machine.
- A Firebase project set up for authentication.

### Step-by-Step Guide
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dipteskundu/Ecofine-assingment-10.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd assingment
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Configure Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add your Firebase and API configuration keys:
      ```env
      VITE_apiKey=your_api_key
      VITE_authDomain=your_auth_domain
      VITE_projectId=your_project_id
      VITE_storageBucket=your_storage_bucket
      VITE_messagingSenderId=your_messaging_sender_id
      VITE_appId=your_app_id
      VITE_API_BASE=deploy_server_link
      ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
6.  **Open in Browser:**
    - Visit `http://localhost:5173` to view the application.

## Relevant Resources
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
