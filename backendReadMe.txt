Project: Smart Expense Tracker

## Project Overview

- Smart Expense Tracker is a web application designed to help users manage their finances by tracking expenses, categorizing them, and setting budgets. It provides insights into spending habits through analytics and visualization tools, and sends alerts when budgets are exceeded.

## How It Works

- Database Connection
The app connects to a MongoDB database using the connection string in the .env file.

- Authentication
User authentication is managed with JWT tokens.

- Middleware (authMiddleware) checks for valid tokens on protected routes.
Models

- User: Stores user information such as username, email, and password.
Category: Contains user-specific expense categories.

- Expense: Tracks individual expenses, including amount, description, date, and category.

- Budget: Manages user budgets, including total amount, time period, start and end dates, and associated categories.
Notification: Manages notifications for expense alerts.

## Routes
- Auth Routes: Handles user signup and login.

- User Routes: Manages user profiles, including viewing and updating profile information and changing passwords.

- Expense Routes: Allows users to add, view, edit, and delete expenses.

- Category Routes: Lets users create, view, update, and delete expense categories.
- Budget Routes: Manages creating, viewing, updating, and deleting budgets.

- Notification Routes: Handles viewing and managing notifications.

## Controllers

- AuthController: Manages authentication logic.
- UserController: Handles user profile actions.
- ExpenseController: Manages CRUD operations for expenses.
- CategoryController: Handles CRUD operations for categories.
- BudgetController: Manages CRUD operations for budgets and budget-related checks.
- NotificationController: Handles operations related to notifications.

## Middleware
- authMiddleware: Ensures that only authenticated users can access certain routes.

## Notifications
Users receive alerts when their expenses exceed the set budget limits.
Notifications can be viewed and managed through the notification routes.

### Setup
- Start the Server: The app starts on a specified port (default 8000) and listens for incoming requests.