# EcoFine Client

## Description
EcoFine is a modern environmental action platform designed to connect citizens with local authorities and NGOs to solve real-time environmental crises. It features a responsive, high-performance UI with dynamic interactions, educational content, and actionable reporting tools. The application uses a "Green Eco-Vibe" aesthetic to align with its mission.

## Live Project Link
https://ecofine.netlify.app/

## Technologies Used
- **Frontend Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4, DaisyUI
- **Animations:** Framer Motion
- **State Management & Routing:** React Router v7, React Hooks
- **Authentication:** Firebase (Google & Email/Password)
- **Data Fetching:** Axios
- **Visualization:** Recharts
- **Icons:** Lucide React

## Core Features
1.  **Citizen Reporting System:** Users can report environmental issues with locations and descriptions.
2.  **Interactive Blog:** Educational content with category filtering ("Success Stories", "Guides") and search.
3.  **Real-Time Analytics:** Visual dashboards for tracking impact metrics.
4.  **Global Green Theme:** A unified, nature-inspired design system with dark mode support.
5.  **Secure Authentication:** User and Admin login flows using Firebase.
6.  **Responsive Design:** Fully mobile-optimized navigation and layouts.

## Dependencies
- `react`, `react-dom`
- `react-router-dom`
- `tailwindcss`, `daisyui`
- `framer-motion`
- `axios`
- `firebase`
- `react-hot-toast`
- `lucide-react`
- `recharts`
- `jspdf`

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher) installed.

### Steps
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the client directory:**
    ```bash
    cd assingment
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Configure Environment Variables:**
    - Create a `.env` file in the `assingment` directory.
    - Add your Firebase config keys (e.g., `VITE_apiKey=...`).
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
6.  **Open in Browser:**
    - Visit `http://localhost:5173` (or the port shown in terminal).

## Resources
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
