# Note-Taking Application

## Overview

This is a simple note-taking application built with Node.js and MongoDB. Users can create, edit, delete, and organize their notes. The application supports rich text formatting using Quill.js, and it includes features for starring and pinning notes, as well as filtering by date.

## Features

- User registration and login
- Create, read, update, and delete notes
- Rich text editing with Quill.js
- Star and pin notes for easy access
- Filter notes by starred status and creation date

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB cloud service like Atlas)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/yebo7in/note-taking-app.git
```
### 2. Navigate to the Project Directory

Change into the project directory:
```bash
cd note-taking-app
```
### 3. Install Dependencies

- Install the necessary dependencies using npm:
```bash
npm install
```
### 4. Create a .env File

You need to create a .env file in the root of the project directory to store your MongoDB connection string and other environment variables. Follow these steps:

1. Create a new file named .env in the root directory of your project:
- On macOS or Linux, you can use the following command in the terminal:
```bash
touch .env
```
- On Windows, you can create the file using File Explorer or by running:
```bash
echo. > .env
```
2. Open the .env file in a text editor and add the following lines:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
SESSION_SECRET=<Your Session Secret>
```
- Replace <username>, <password>, and <dbname>:
- <username>: Your MongoDB database username.
- <password>: Your MongoDB database password (make sure to URL-encode any special characters).
- <dbname>: The name of the database you want to connect to (you can create a new one if needed).
### 5. Start the Application

Once your .env file is set up, you can start the application using the following command:
```bash
npm start
```
### 6. Access the Application

Open your web browser and go to 
```
http://localhost:3000
```
to access the note-taking application.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue.
