# Movie Lens

Welcome to the Movie Lens This project is designed to provide users with an engaging and intuitive platform to discover and explore their favorite movies. The application leverages the power of the TMDb (The Movie Database) API to fetch movie data, allowing users to filter, search, and explore a vast collection of films. Additionally, it offers interactive features such as dynamic movie cards, YouTube trailer integration, and user account management via Firebase. It also includes light and dark mode option.

## Features

### 1. Advanced Filtering
- Users can easily filter movies based on categories and languages, making it convenient to discover content tailored to their preferences.
  
### 2. Dynamic Movie Cards
- Each movie is presented on an interactive card that offers a quick glimpse of essential details. By clicking "Explore More" on a card, users can access comprehensive information about the movie.
  
### 3. YouTube Trailer Integration
- Explore More cards also dynamically fetch movie trailers from YouTube, allowing users to watch trailers directly within the app.

### 4. User Account Management
- The app includes a secure login system powered by Firebase. Users can create accounts, log in, and save their favorite movies, as well as add movies to their watchlists.

## Getting Started

To get started with the Movie Explorer Web Application, follow these steps:

### 1. Clone the Repository
- Clone the repository to your local machine.
- Navigate to the project directory

### 2. Install Dependencies

- Install project dependencies using npm:

### 3. Set Up API Keys

Before you can use the application, you need to set up your API keys.

#### TMDb API Key

1. Visit [TMDb](https://www.themoviedb.org/documentation/api) to create an account and generate your API key.

2. In the root directory of the project, create a `.env` file if it doesn't already exist.

3. Add your TMDb API key to the `.env` file as follows:
   VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY


#### YouTube API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).

2. Create a new project if you don't have one.

3. Enable the YouTube Data API v3 for your project.

4. In the root directory of the project, create a `.env` file if it doesn't already exist.

5. Add your YouTube API key to the `.env` file as follows:
   VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY


### 4. Firebase Configuration

To set up Firebase, follow these steps:

1. Visit [Firebase Console](https://console.firebase.google.com/).

2. Create a new project or use an existing one.

3. Go to Project Settings > General > Your Apps > Firebase SDK snippet, and choose the "Config" option.

4. Copy the Firebase config object.

5. In the project's `firebase.js` file, replace the Firebase configuration object with your own. Make sure it looks like this:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
### 5. Start the development server
npm run dev

## Acknowledgments
We would like to express our gratitude to the following individuals and organizations for their contributions and support:
- TMDb for providing the movie data API.
- Youtube for providing the trailer of movies
- Firebase for enabling user authentication and data management.

## License
This project is licensed under the MIT License.

## Contact
If you have any questions or feedback, please feel free to contact us at vinaysingla7896@gmail.com



