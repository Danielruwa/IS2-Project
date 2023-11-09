#!/bin/bash

# Clone the repository
git clone https://github.com/Danielruwa/IS2-Project.git

# Navigate to the project directory
cd IS2-Project

# Install backend dependencies using Maven
cd IS2-Project
mvn clean install

# Navigate to the frontend directory
cd src/frontend

# Install frontend dependencies using npm
npm install

# Build the React frontend
npm run build

# Navigate back to the project root directory
cd ../../

# Start the Spring Boot backend and React frontend concurrently
mvn spring-boot:run & (cd src/frontend && npm start)

# Provide instructions to access the running application
echo "The project is now running. Access the application at http://localhost:3000"
