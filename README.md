# BidPlus

BidPlus is a web application that allows users to place and manage bids on various items. The project features a React-based frontend configured with Vite, and the backend is implemented using Node.js and Express as part of the MERN stack.

## Project Structure

The project is organized into the following main directories:

### Frontend

The `frontend` directory contains the React-based frontend of the application, set up with Vite for fast development and build processes.

- **Main Configuration**: The frontend is configured with Vite, including ESLint rules for code quality.
- **Plugins**: 
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh.
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC for Fast Refresh.

For more details, refer to the [frontend README](frontend/README.md).

### Backend

The `backend` directory contains the Node.js and Express-based backend of the application. This includes setting up routes, controllers, and models to handle various functionalities of the application.

### Additional Files

- **README.md**: This file provides an overview of the project and its structure.
- **frontend/README.md**: Specific information and setup instructions for the frontend part of the project.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/atharvagadade22/BidPlus.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BidPlus
   ```

### Frontend Setup

3. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
4. Create a `.env` file in the frontend directory and add the following:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
5. Install the necessary dependencies for the frontend:
   ```bash
   npm install
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

7. Navigate to the backend directory:
   ```bash
   cd backend
   ```
8. Create a `.env` file in the backend directory and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
9. Install the necessary dependencies for the backend:
   ```bash
   npm install
   ```
10. Start the backend server:
    ```bash
    npm run dev
    ```

## Contributions

**Note**: This project is not open for contributions. Please do not submit pull requests or issues.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
````
# Bid_Plus
# BidPlus_Bid.Win.Repeat
