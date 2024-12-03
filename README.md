# Event Registration System

A full-stack web application for managing event registrations. The system allows administrators to create and manage events, while users can browse and register for available events.

## Features

- User authentication (login/register)
- Admin and regular user roles
- Event creation and management
- Event registration system
- Responsive design

## Tech Stack

### Frontend
- React with Material-UI
- Redux Toolkit
- React Router
- Axios

### Backend
- Django
- Django REST Framework
- Simple JWT
- SQLite database

## Running the Application

1. Start the Django backend:
```bash
cd event-registration
source venv/bin/activate
cd backend
python manage.py runserver 0.0.0.0:8000
```

2. In a new terminal, start the React frontend:
```bash
cd event-registration/frontend
npm start
```

3. The React App can nowo be accessible through the Cloud9 Preview button, or at the address below:
```bash
https://0d39750f8c124bd5ab14d6f47f12fa03.vfs.cloud9.us-west-1.amazonaws.com/
```

The application should now be running and accessible through your Cloud9 environment.

## Usage

1. Register a new account or log in
2. Regular users can:
   - Browse events
   - Register for events
   - View their registrations
   - Cancel registrations
3. Admin users can additionally:
   - Create new events
   - Edit existing events
   - Delete events
   - View registration lists

When registering, you can check the "Register as Admin" box to create an admin account for testing purposes. Additionally, you can change between admin and non-admin on the account page.