# 🌲Bukovel System

A web application built with Next.js, React, and MySQL, containerized using Docker/Podman.
Designed as an internal application for Bukovel employees in Ukraine, the system provides functionality for managing workers and projects. Key features include role-based login, worker and project tracking, lift management with projects assigned to them, and a real-time chat, supporting both team-based and general channels.

## 🚀 Features

- Next.js 15.2.4 with React 19
- MySQL 8.0.41 database
- Prisma ORM for database management
- Authentication with secure cookies
- Styled with SASS
- Containerized with Docker/Podman

## 📋 Prerequisites

- Docker or Podman installed on your system
- Git
- Node.js (for local development)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chibriki/next-website.git
   cd next-website
   ```

2. Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="mysql://YOUR_NAME:YOUR_PASSWORD@db:3306/YOUR_DB?sslmode=disable"
   MYSQL_ROOT_PASSWORD=YOUR_PASSWORD
   MYSQL_DATABASE=YOUR_DB
   ```
> Replace YOUR_NAME, YOUR_PASSWORD, YOUR_DB with valid credentials 

3. Build and start the containers:

   ```bash
   # Using Docker
   docker-compose up -d

   # Using Podman
   podman-compose up -d
   ```

The application will be available at `http://localhost:3000`

## 🔧 Development

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate the database:
   ```bash
   npx prisma generate
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Project Structure

```
.
├── app/                 # Next.js application code
├── prisma/             # Database schema and migrations
├── public/             # Static files
├── mysql-conf/         # MySQL configuration
├── docker-compose.yml  # Docker/Podman configuration
└── Dockerfile         # Container build instructions
```

## 🔐 Security

- Database credentials are managed through environment variables
- SSL is disabled for local development
- authentication with HTTP-only cookies

## 🐳 Container Information

The application runs in two containers:

1. **Database Container**

   - MySQL 8.0.41
   - Port: 3307
   - Persistent volume for data storage
   - Health checks enabled

2. **Application Container**
   - Next.js application
   - Port: 3000
   - Depends on the database container
   - Environment variables from the .env file

## 📝 License

[Apache-2.0](https://choosealicense.com/licenses/apache-2.0/)
