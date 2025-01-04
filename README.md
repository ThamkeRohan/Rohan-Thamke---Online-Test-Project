# Online Prescription Platform

## Project Overview
This project is an online prescription platform designed to facilitate seamless interaction between doctors and patients. The platform includes separate sign-up flows for doctors and patients, consultation forms, and prescription generation and management.

---

## Features
### Doctor Features
- **Sign-up**: Register with profile picture, name, specialty, email, phone number, and years of experience.
- **Consultation Management**:
  - View patient consultation requests.
  - Submit prescriptions with fields for care instructions and medicines.
  - Generate and save prescriptions as PDFs.
  - Edit and resend prescriptions to patients.

### Patient Features
- **Sign-up/Sign-in**: Register with profile picture, name, age, email, phone number, and history of surgery, history of illness.
- **Doctor List**: View a grid of available doctors with profile pictures, names, specialties, and a consult button.
- **Consultation**: Fill out a multi-step consultation form with details about current illness, medical history, and family medical history.

---

## Technology Stack
- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Hosting**: [Netlify](https://rohan-thamke-online-test-project.netlify.app/)
- **PDF Generation**: jspdf
- **Cloudinary**: For image storage and management

---

## Routes and Links
### Authentication
- `POST /api/doctors/signup`: Doctor sign-up
- `POST /api/patients/signup`: Patient sign-up
- `POST /api/login`: Login Doctor or Patient based on role selected

### Doctor Routes
- `GET /api/doctors`: Get all doctors
- `GET /api/doctors/:doctorId`: Get doctor profile
- `GET /api/doctors/:doctorId/consultations`: Get all consultations submitted to doctor

### Patient Routes
- `GET /api/patients/:patientId`: Get patient details along with consultations submitted by patient
- `GET /api/patients/:patientId/consultations`: Get all consultations submitted by patient

### Consultation Routes
- `POST /api/consultations`: Create a consultation

### Prescription Routes
- `POST /api/prescriptions`: Create a prescription
- `PATCH /api/prescriptions/:prescriptionId`: Edit a prescription
- `GET /api/prescriptions/:prescriptionId`: Get a prescription
---

## Installation and Setup
1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd online-prescription-platform
    ```
3. Install dependencies in both frontend and backend folders:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the `backend` folder and include:
    ```env
    PORT=3000
    MONGO_URI=<your_mongo_db_connection_string>
    JWT_SECRET=<your_jwt_secret>
    CLIENT_BASE_URL=http://localhost:5173
    ```
    Create a `.env` file in the `frontend` folder and include:
    ```env
    VITE_UPLOAD_PRESET=mz567jhce
    VITE_SERVER_BASE_URL=http://localhost:3000
    ```
5. Start the servers:
    ```bash
    cd frontend
    npm run dev
    cd ../backend
    npm run dev
    ```
6. Access the application:
    - Visit the hosted link or `http://localhost:5173`

---

## Database Schema
### Doctor
```json
{
  "name": "String",
  "specialty": "String",
  "email": "String",
  "phone": "String",
  "experience": "Number",
  "profilePicture": "String",
  "password": "String"
}
```

### Patient
```json
{
  "name": "String",
  "age": "Number",
  "email": "String",
  "phone": "String",
  "historyOfIllness": "String",
  "historyOfSurgery": "String",
  "profilePicture": "String",
  "password": "String"
}
```

### Consultation
```json
{
  "patient": "ObjectId",
  "doctor": "ObjectId",
  "illnessHistory": "String",
  "recentSurgery": "String",
  "familyHistory": {
    "diabetes": "Boolean",
    "allergies": "String",
    "others": "String"
  },
  "transactionId": "String"
}
```

### Prescription
```json
{
  "consultation": "ObjectId",
  "careToBeTaken": "String",
  "medicines": "String",
}
```

---

## Contact
For any queries or issues, feel free to contact.

---
