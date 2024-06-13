![image](https://github.com/varshithab05/NextCrop/assets/117563974/14be7b2a-6682-4441-a754-ab63e2faeaac)# Crop Prediction Web Application

## Overview

The Crop Prediction Web Application is a tool designed to predict the best crop to grow based on various environmental factors. The application is built using a React front-end and a Flask back-end, leveraging a machine learning model for the prediction.
## Visit the live website : https://next-crop.onrender.com
![image](https://github.com/varshithab05/NextCrop/assets/117563974/aa626b0d-1cbb-415f-b255-f59c9947f11e)
![image](https://github.com/varshithab05/NextCrop/assets/117563974/d7fdd09f-d369-487d-a4d3-65ad3361f4c1)


## Features

- **User-friendly Interface**: Intuitive and easy-to-use interface built with React.
- **Machine Learning Predictions**: Utilizes a trained machine learning model to predict the optimal crop.
- **RESTful API**: Backend API developed with Flask to handle predictions and data processing.
- **Cross-Origin Resource Sharing (CORS)**: Enabled to allow the front-end and back-end to communicate seamlessly.

## Technologies Used

- **Front-end**: React,JavaScript
- **Back-end**: Flask, Python
- **Machine Learning**: Pandas, Scikit-learn, Pickle , xgboost
- **Other**: Flask-CORS for handling cross-origin requests

## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- pip (Python package installer)

### Installation

#### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/crop-prediction.git
    cd crop-prediction/backend
    ```

2. **Create a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask server**:
    ```bash
    python app.py
    ```

#### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the React development server**:
    ```bash
    npm run dev
    ```

## Usage

1. Ensure the Flask server is running on port 5000.
2. Ensure the React development server is running on port 3000.
3. Open your browser and navigate to `http://localhost:3000`.
4. Enter the required environmental parameters (Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH Value, Rainfall).
5. Click on the "Predict" button to get the crop prediction.

## API Endpoints

### GET /

- **Description**: Check if the API is running.
- **Response**: `{"message": "API is Running"}`

### POST /predict

- **Description**: Predict the optimal crop based on input parameters.
- **Request Body**: JSON object containing the following fields:
  - `Nitrogen` (int)
  - `Phosphorus` (int)
  - `Potassium` (int)
  - `Temperature` (float)
  - `Humidity` (float)
  - `pH_Value` (float)
  - `Rainfall` (float)
- **Response**: JSON object containing the prediction:
  - `{"prediction": ["CropName"]}`

## Example

Request:
```json
{
  "Nitrogen": 90,
  "Phosphorus": 42,
  "Potassium": 43,
  "Temperature": 20.8,
  "Humidity": 82,
  "pH_Value": 6.5,
  "Rainfall": 202
}
