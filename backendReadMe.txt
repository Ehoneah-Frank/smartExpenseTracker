Project: Smart Expense Tracker

## How It Works

Database Connection
  - The app connects to a MongoDB database using the connection string in the `.env` file.

Authentication
  - User authentication is managed with JWT tokens.
  - Middleware (`authMiddleware`) checks for valid tokens on protected routes.

Models
  - User: Stores user information such as username, email, and password.
  - Category: Contains user-specific expense categories.
  - Expense: Tracks individual expenses, including amount, description, date, and category.

Routes
  - Auth Routes: Handles user signup and login.
  - User Routes: Manages user profiles, including viewing and updating profile information and changing passwords.
  - Expense Routes: Allows users to add, view, edit, and delete expenses.
  - Category Routes: Lets users create, view, update, and delete expense categories.

Controllers
  - AuthController: Manages authentication logic.
  - UserController: Handles user profile actions.
  - ExpenseController: Manages CRUD operations for expenses.
  - CategoryController: Handles CRUD operations for categories.

Middleware
  - `authMiddleware`: Ensures that only authenticated users can access certain routes.

### Setup
- Start the Server: The app starts on a specified port (default 8000) and listens for incoming requests.