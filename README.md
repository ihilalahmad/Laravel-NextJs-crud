# Laravel-Next.js CRUD Application

A polished full-stack CRUD application featuring a **Laravel + MySQL** backend API and a **Next.js** frontend. Seamlessly creating, reading, updating, and deleting records, this app elegantly demonstrates how to connect a robust PHP API with a modern React-based UI powered by Next.js.

---

##  Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (Next.js)](#frontend-nextjs)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Testing (Optional)](#testing-optional)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

##  Demo

*(Optionally, include a link or screenshot of your working application here)*

---

##  Features

- Full CRUD (Create, Read, Update, Delete) capabilities
- RESTful API built with Laravel
- Dynamic client-side UI with Next.js and React
- MySQL database support
- Clean separation between backend and frontend for scalability
- Easily extensible architecture (e.g., authentication, pagination, advanced filtering)

---

##  Technology Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Backend    | PHP, Laravel, MySQL            |
| Frontend   | JavaScript/TypeScript, Next.js |
| HTTP Client| Axios (or Fetch API)           |
| Styling    | *(Your choice: Tailwind CSS, styled-components, etc.)* |

---

##  Prerequisites

Ensure you have the following installed:

- PHP (version compatible with Laravel)
- Composer
- MySQL (or MariaDB)
- Node.js and npm (or Yarn / pnpm)
- Git

---

##  Setup Instructions

### Backend (Laravel)

1. Clone the repository:
   ```bash
   git clone https://github.com/ihilalahmad/Laravel-NextJs-crud.git
   cd Laravel-NextJs-crud/backend
   composer install
   cp .env.example .env

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_user
   DB_PASSWORD=your_password

   php artisan key:generate

   php artisan migrate

   php artisan serve

   

