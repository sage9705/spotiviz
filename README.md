# Spotiviz

## Overview

Spotiviz (Spotify Data Visualizer) is a web application built with Next.js that allows users to visualize their Spotify listening data. The app provides insights into users' top tracks, top artists, genre distribution, and listening history through interactive charts and graphs.

## Features

- Secure authentication with Spotify using NextAuth.js
- Visualization of top tracks
- Visualization of top artists
- Genre distribution analysis
- Listening history timeline


## Technologies Used

- Next.js
- React
- NextAuth.js for authentication
- Chart.js for data visualization
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Spotify Developer account and a registered Spotify app

## Installation

1. Clone the repository:
   ``
    git clone https://github.com/sage9705/spotiviz.git
   ``
2. Navigate to the project directory:
   ``
    cd spotiviz
   ``
3. Install the dependencies:
   ``
    npm install
   ``
4. Create a `.env.local` file in the root directory and add the following environment variables:
5. 
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
 


Replace `your_nextauth_secret`, `your_spotify_client_id`, and `your_spotify_client_secret` with your actual values.

## Usage

1. Start the development server:
   ``
   npm run dev
   ``

2. Open your browser and navigate to `http://localhost:3000`

3. Click on "Sign in with Spotify" and authorize the application

4. Explore your Spotify data visualizations on the dashboard

## Project Structure

- `/pages`: Contains the main pages of the application
- `/components`: Reusable React components
- `/lib`: Utility functions and API helpers
- `/styles`: Global styles and Tailwind CSS configuration
- `/public`: Static assets

## Contributing

Contributions to the Spotify Data Visualizer are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


Project Link: https://github.com/yourusername/spotify-data-visualizer

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)