# KP Enterprises - Appliance Repair Landing Page

A multi-language React landing page for KP Enterprises, offering appliance repair services with contact form functionality.

## Features

- 🚀 React 18 with Vite for fast development
- 🌍 Multi-language support (23 Indian languages) using react-i18next
- 📱 Responsive design with Bootstrap 5
- ✅ Contact form with validation
- 📧 Email integration with Nodemailer
- 🌐 CORS-enabled backend API

## Project Structure

```
kp enterprises/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── locales/            # Translation files (23 languages)
│   └── main.jsx            # Frontend entry point
├── server/                 # Backend Express server
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── dist/                   # Production build
└── package.json            # Frontend dependencies
```

## Installation & Setup

### Frontend
```bash
# Install frontend dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Update .env file with your email credentials
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Run development server
npm run dev

# Or production
npm start
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL=http://localhost:5000/send` - Backend API endpoint

### Backend (server/.env)
- `EMAIL_USER` - Gmail account for sending emails
- `EMAIL_PASS` - Gmail app password (enable 2FA first)
- `PORT=5000` - Server port

## Supported Languages

- English, Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, and 13 more Indian languages.

## Next Steps to Complete

1. **Configure Email Credentials**: Update server/.env with your actual Gmail credentials
2. **Complete Translations**: All non-English locale files need proper translations
3. **Deploy**: Host frontend and backend on your preferred platform