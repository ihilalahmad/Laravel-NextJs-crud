# Laravel + Next.js CRUD Application

A modern, full-stack CRUD application built with Laravel (PHP) backend and Next.js (React) frontend, demonstrating best practices for API development and modern web application architecture.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete records
- **RESTful API**: Laravel-powered backend with clean API endpoints
- **Modern Frontend**: Next.js with React for dynamic user interface
- **Database Integration**: MySQL database with Laravel Eloquent ORM
- **Responsive Design**: Mobile-friendly user interface
- **API Documentation**: Well-structured endpoints for easy integration
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Validation**: Form validation on both client and server sides

## 🛠️ Technology Stack

### Backend
- **PHP** - Server-side programming language
- **Laravel** - PHP framework for robust API development
- **MySQL** - Relational database management system
- **Laravel Eloquent** - ORM for database operations

### Frontend
- **Next.js** - React framework for production-ready applications
- **React** - JavaScript library for building user interfaces
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework (if applicable)

## 📁 Project Structure

```
Laravel-NextJs-crud/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   └── Models/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   └── ...
├── frontend/               # Next.js Application
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── ...
└── README.md
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **PHP** >= 8.0
- **Composer** - PHP dependency manager
- **Node.js** >= 16.0
- **npm** or **yarn** - Package manager
- **MySQL** >= 5.7 or **MariaDB**
- **Git** - Version control

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ihilalahmad/Laravel-NextJs-crud.git
cd Laravel-NextJs-crud
```

### 2. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3. Database Configuration

Edit the `.env` file in the backend directory:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_nextjs_crud
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Create the database and run migrations:

```bash
# Create database (via MySQL command line or phpMyAdmin)
mysql -u root -p
CREATE DATABASE laravel_nextjs_crud;
exit

# Run migrations
php artisan migrate

# (Optional) Seed database with sample data
php artisan db:seed
```

### 4. Start Laravel Server

```bash
# Start the Laravel development server
php artisan serve
```

The API will be available at `http://localhost:8000`

### 5. Frontend Setup (Next.js)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🔗 API Endpoints

### Base URL: `http://localhost:8000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all items |
| POST | `/products` | Create a new item |
| PUT | `/products/{id}` | Update an existing item |
| DELETE | `/products/{id}` | Delete an item |

### Example API Usage

#### Create Item
```bash
curl -X POST http://localhost:8000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Item", "description": "Item description"}'
```

#### Get All Items
```bash
curl -X GET http://localhost:8000/api/items
```

## 🎯 Usage

1. **User Auth**: User can register and Login
2. **View Products**: Navigate to the homepage to see all items
3. **Create Products**: Use the "Add New" button to create items
4. **Edit Products**: Click the edit button next to any item
5. **Delete Product**: Click the delete button to remove items

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run PHP unit tests
php artisan test

# Run specific test file
php artisan test --filter=ItemTest
```

### Frontend Testing

```bash
cd frontend

# Run Jest tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **CORS Issues**
   - Configure CORS in Laravel `config/cors.php`
   - Ensure frontend URL is in allowed origins

3. **Port Conflicts**
   - Laravel default: `http://localhost:8000`
   - Next.js default: `http://localhost:3000`
   - Change ports if needed using `php artisan serve --port=8001`

4. **Composer Dependencies**
   - Run `composer update` if facing dependency issues
   - Clear cache: `php artisan cache:clear`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Hilal Ahmad**
- GitHub: [@ihilalahmad](https://github.com/ihilalahmad)
- Email: ihilalahmadd@gmail.com

## 🙏 Acknowledgments

- Laravel community for excellent documentation
- Next.js team for the amazing React framework
- Contributors and testers

---

**⭐ If you found this project helpful, please consider giving it a star!**
