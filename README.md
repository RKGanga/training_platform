# Sunviva Technologies - Training Platform

A modern, responsive training platform built with React.js and Django REST Framework for cloud technologies, DevOps, and system administration courses.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with glass-morphism effects
- **Course Management**: Comprehensive course catalog with categories
- **Mega Menu Navigation**: Advanced dropdown navigation with course previews
- **Scroll Animations**: Smooth staggered animations for enhanced user experience
- **Contact Integration**: Built-in contact forms and inquiry management
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Dynamic content loading and state management

## 🛠 Tech Stack

### Frontend
- **React.js** - Modern JavaScript library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Intersection Observer API** - Scroll animations

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database (or SQLite for development)

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

## 🔧 Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/Training_Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/training_platform
```

## 📁 Project Structure

```
Training-Platform/
├── backend/
│   ├── training_platform/
│   │   ├── settings.py          # Django settings
│   │   ├── urls.py             # URL routing
│   │   └── ...
│   └── requirements.txt
├── frontend/
│   └── Training_Platform/
│       ├── src/
│       │   ├── components/      # React components
│       │   │   ├── courses/     # Course-related components
│       │   │   └── layout/      # Layout components
│       │   ├── pages/          # Page components
│       │   ├── services/       # API services
│       │   └── App.jsx         # Main app component
│       ├── public/
│       └── package.json
└── README.md
```

## 🎯 Course Categories

- **Cloud**: GCP, Azure cloud platforms
- **DevOps**: Docker, Kubernetes, Terraform, CI/CD
- **Scripting**: Python, Bash, PowerShell automation
- **Operating System**: Linux administration and system operations

## 🎨 Key Features

### Mega Menu Navigation
- Hover over "Courses" to see categorized course previews
- 4-column layout with course listings
- Smooth animations and transitions

### Scroll Animations
- Staggered fade-in animations for cards
- Intersection Observer for performance
- Multiple animation types (fadeInUp, scaleIn, etc.)

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting platform
```

### Backend Deployment
```bash
python manage.py collectstatic
# Deploy to your preferred hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 API Endpoints

- `GET /api/courses/` - List all courses
- `GET /api/courses/{id}/` - Get course details
- `POST /api/contact/` - Submit contact form

## 🔧 Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `python manage.py runserver` - Start Django server
- `python manage.py test` - Run tests
- `python manage.py makemigrations` - Create migrations

## 📞 Support

For support and inquiries:
- Email: hr@sunvivatechnologies.com
- Phone: +91 95508 04579

## 📄 License

This project is proprietary software developed by Sunviva Technologies.

---

**Sunviva Technologies** - Empowering careers through elite IT training
