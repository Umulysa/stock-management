# Stock Management System

A complete inventory management system with Spring Boot backend and Next.js frontend.

## Features

- Product management
- Order processing
- User management
- Real-time analytics
- Responsive dashboard
- Dark/light mode

## Project Structure

\`\`\`
stock-management-system/
├── backend/                 # Spring Boot backend
│   ├── src/                 # Source code
│   ├── pom.xml              # Maven dependencies
│   └── ...
├── frontend/                # Next.js frontend
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── ...
└── run.sh                   # Script to run both applications
\`\`\`

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- npm or yarn

### Running the Application

1. Clone the repository
2. Make the run script executable:
   \`\`\`
   chmod +x run.sh
   \`\`\`
3. Run the application:
   \`\`\`
   ./run.sh
   \`\`\`
4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - H2 Database Console: http://localhost:8080/h2-console

### Default Login

- Email: admin@istock.com
- Password: password

## API Documentation

The backend provides the following API endpoints:

- `/api/auth/login` - User authentication
- `/api/auth/register` - User registration
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/users` - User management
- `/api/analytics` - Analytics data

## Technologies Used

- **Backend**:
  - Spring Boot
  - Spring Data JPA
  - Spring Security
  - H2 Database (can be replaced with MySQL/PostgreSQL)

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - shadcn/ui components
  - Recharts for data visualization

## License

This project is licensed under the MIT License.
