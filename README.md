# CineGuide - Your Personal Movie and TV Series Guide

CineGuide is a web application that provides information on movies and TV series, helping you explore and discover new content. It serves as a comprehensive guide similar to IMDb, without offering streaming services.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [How to Install and Run the Project](#how-to-install-and-run-the-project)
5. [How to Use the Project](#how-to-use-the-project)
6. [How to Contribute to the Project](#how-to-contribute-to-the-project)
7. [Preview](#preview)
8. [Environment Variables](#environment-variables)

## Project Overview
CineGuide is designed to provide users with detailed information on movies and TV series, including cast and crew details, ratings, and more. The app features a clean and intuitive interface, making it easy for users to find and explore new content.

## Features
- View details about movies and TV series, including cast and crew information.
- Browse latest movies and TV series.
- Search for movies and TV series by name.
- Responsive design for optimal viewing on different devices.

## Technologies Used
- React
- React Router
- Axios
- Ant Design
- TMDB API

## How to Install and Run the Project

### Prerequisites
- Node.js and npm installed on your local machine.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/dineshkharah/cine-guide.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cine-guide
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project
1. Create a `.env` file in the root of the project with the following structure:
    ```env
    # The Movie Database (TMDB) API Key
    REACT_APP_API_KEY=your_tmdb_api_key_here

    # Port configuration
    PORT=5000
    ```
   Replace `your_tmdb_api_key_here` with your actual TMDB API key.
2. Start the development server:
    ```bash
    npm start
    ```
3. Open your browser and go to `http://localhost:5000` to view the application.

## How to Use the Project
- **Home Page**: Browse through the latest movies and TV series.
- **Search**: Use the search bar in the navigation to find specific movies or TV series.
- **Details Page**: Click on any movie or TV series to view detailed information.

## How to Contribute to the Project
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add some feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request to the `main` branch of the original repository.

We welcome contributions that help improve the project!

## Preview
To preview the website, visit [CineGuide Preview](https://cineguide.vercel.app/)

---

*Created by Dinesh Kharah*
*Follow me on [LinkedIn](www.linkedin.com/in/dinesh-kharah)*
