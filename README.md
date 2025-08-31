# Accountability App

A modern React application for personal accountability and goal tracking, built with Firebase authentication and real-time database storage.

## Features

### 🔐 Authentication
- **Google OAuth Integration**: Seamless login with Google accounts
- **Email/Password Authentication**: Traditional signup and login
- **Profile Picture Support**: Automatic profile picture import from Google accounts
- **Protected Routes**: Secure navigation with authentication guards

### 📋 Onboarding Flow
- **5-Step Onboarding Process**: Comprehensive user setup
- **Progress Persistence**: Save and resume onboarding at any step
- **Smart Navigation**: Automatic redirection based on completion status
- **Data Validation**: Form validation and error handling

### 🎯 Dashboard
- **Personalized Welcome**: Custom greeting with user's name
- **Progress Tracking**: Visual statistics and metrics
- **Activity Feed**: Recent activities and achievements
- **Upcoming Deadlines**: Task management with priority levels

### 🗄️ Data Management
- **Firebase Firestore**: Real-time database storage
- **User Profiles**: Complete user information management
- **Onboarding Progress**: Persistent onboarding state
- **Secure Data**: Environment-based configuration

## Project Structure

```
src/
├── app/                    # Main application pages
│   ├── Login.jsx          # Login page with authentication
│   └── Signup.jsx         # Signup page with validation
├── components/            # Reusable UI components
│   ├── atoms/            # Basic UI elements
│   │   └── ProgressBar.jsx
│   ├── forms/            # Form components
│   │   ├── InputField.jsx
│   │   └── Select.jsx
│   ├── onboarding/       # Onboarding flow components
│   │   ├── Onboarding.jsx
│   │   ├── OnboardingSecond.jsx
│   │   ├── OnboardingThird.jsx
│   │   ├── OnboardingFourth.jsx
│   │   └── OnboardingFinal.jsx
│   ├── Dashboard.jsx     # Main dashboard interface
│   ├── LoginCompt.jsx    # Login form component
│   ├── SignupCompt.jsx   # Signup form component
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   └── LoadingSpinner.jsx # Loading indicator
├── contexts/             # React contexts
│   └── AuthContext.jsx   # Authentication state management
├── config/              # Configuration files
│   └── firebase.js      # Firebase setup and utilities
└── assets/              # Static assets
    ├── logo.svg
    ├── google-icon.svg
    └── confetti-ball.svg
```

## Authentication Flow

1. **User Login/Signup**: 
   - Email/password or Google OAuth
   - Automatic profile creation in Firestore
   - Profile picture import from Google (if available)

2. **Onboarding Check**:
   - If onboarding completed → Dashboard
   - If onboarding incomplete → Resume at last step

3. **Onboarding Process**:
   - Step 1: Basic info (username, profile picture)
   - Step 2: Goal selection (predefined or custom)
   - Step 3: Accountability style preference
   - Step 4: Availability and communication preferences
   - Step 5: Completion and dashboard access

## Database Schema

### Users Collection
```javascript
{
  uid: string,
  fullName: string,
  email: string,
  profilePicture: string | null,
  username: string,
  goal: string,
  customGoal: string | null,
  accountabilityStyle: string,
  timezone: string,
  checkInTime: string,
  communicationMethod: string,
  onboardingStep: number,
  onboardingCompleted: boolean,
  authProvider: string,
  createdAt: string,
  updatedAt: string
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up Firebase**:
   - Create a Firebase project
   - Enable Authentication (Google + Email/Password)
   - Create Firestore database
   - Add environment variables

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Key Features

### 🔄 Smart Navigation
- Automatic redirection based on authentication and onboarding status
- Persistent onboarding progress
- Back navigation between onboarding steps

### 💾 Data Persistence
- Real-time data synchronization with Firebase
- Automatic profile updates
- Onboarding progress tracking

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Smooth transitions and animations
- Intuitive user interface

### 🔒 Security
- Protected routes and authentication guards
- Secure Firebase configuration
- Environment-based secrets management

## Technologies Used

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Firebase** - Authentication and database
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
