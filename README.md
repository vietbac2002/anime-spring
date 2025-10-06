# AnimeSpring

AnimeSpring is a modern, feature-rich web application for browsing and discovering anime. Built with Next.js and powered by the Jikan API, this platform provides a seamless and engaging experience for anime enthusiasts. The application is deployed and hosted on Firebase, ensuring a scalable and reliable service.

## Features

- **Browse by Type:** Filter anime by TV, Movie, OVA, and more.
- **Genre Exploration:** Discover new anime by exploring a wide range of genres.
- **Weekly Schedule:** Stay up-to-date with the latest airing schedule for your favorite shows.
- **Real-time Search:** Quickly find any anime with the powerful real-time search functionality.
- **Detailed Information:** Get in-depth information about each anime, including synopsis, ratings, and character details.
- **Responsive Design:** Enjoy a seamless experience across all devices, from desktops to mobile phones.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **API:** [Jikan API](https://jikan.moe/)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/your_project_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application on `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs the linter to check for code quality.

## Deployment

This project is deployed using [Firebase App Hosting](https://firebase.google.com/docs/app-hosting). The deployment configuration is defined in the `apphosting.yaml` file, which specifies the runtime environment, scaling, and other settings.

To deploy the application, you will need to have the Firebase CLI installed and configured. Once set up, you can deploy the application by running:

```sh
firebase deploy
```
