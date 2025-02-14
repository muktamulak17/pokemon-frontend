# React + JavaScript + Redux Toolkit + Vite

This repository contains a **React** application built with **JavaScript** and **Redux Toolkit** for state management. Follow the steps below to set up, run, and understand the project structure.

---

## **Project Setup**

### 1. **Clone the Repository**
```bash
git clone <repository_url>
cd <project_directory>
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Configuration**
Create a `.env` file in the root directory if needed:
```bash
VITE_API_URL=<your_api_url>
VITE_LIMIT=<your_limit_for_fetching_pokemon_list>
```

### 4. **Run the Application Locally**

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

---

## **Project Structure**
```plaintext
src/
    ├── components/       # Reusable components
    ├── pages/            # Page components
    ├── store/            # Redux store configuration
        ├── slices/       # Redux toolkit slices to update state
        ├── thunks/       # Redux thunks
    ├── hooks/            # Custom React hooks
    ├── App.tsx           # Main application component
    └── main.ts           # Entry point

public/                  # Static files
node_modules/             # Node dependencies
.env                      # Environment variables
package.json
```

---

## **Key Features & Approaches**

- **React Functional Components**: Using React Hooks for cleaner and more maintainable code.
- **Redux Toolkit**: Simplified Redux logic with `createSlice` and `createAsyncThunk`.
- **Custom hooks**: Custom hooks to manage relevant state.
- **API Integration**: Axios for external API calls.
- **Environment Management**: Utilizing `.env` for sensitive configurations.
- **Material UI Responsive UI**: Basic responsive design with material-ui.

---

## **Deployment Guidelines** *(Render)*

- **Build Command:** `npm install; npm run build`
- **Public Directory:** `build`
- **Environment Variables:** Set in the platform's settings.
---
