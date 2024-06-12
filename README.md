# Car Doctor

Car Doctor is a service website where users can book and manage car services. This project leverages modern web technologies to provide a seamless experience for users and administrators alike.

## Features

- **React Router DOM:** For routing and navigation.
- **Loading Spinner:** Displays while data is being loaded.
- **Dynamic Document Title:** Uses `document.title = title` for setting the tab title.
- **Services Banner:** Showcases available services prominently.
- **React Toastify:** For displaying success and error messages.
- **Authentication:** User login and registration using Firebase.
- **Post-Login Redirection:** Redirects users to the target page after login.
- **JWT Authorization:** JSON Web Tokens for secure user authorization.
- **Home Page Services:** Loads all services; redirects to login if the user is not logged in.
- **Service Booking:** Allows logged-in users to book services.
- **My Booking:** Displays user-specific bookings. Hidden if the user is not logged in.
- **Booking Management:** Users can change their booking status from pending to confirmed and delete bookings.
- **Sorting and Searching:** Sort services by price (ascending/descending) and search by service name.

## Frontend

The frontend is built using React and styled with Tailwind CSS and DaisyUI.

### Key Technologies

- **React**
- **React Router DOM**
- **React Toastify**
- **Firebase Authentication**
- **Tailwind CSS**
- **DaisyUI**

## Backend / Server

The backend is built using Express, Node.js, and MongoDB, with CORS and JWT for security.

### Key Technologies

- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB:** NoSQL database for storing and retrieving data.
- **CORS:** Middleware to enable Cross-Origin Resource Sharing.
- **JSON Web Token (JWT):** For securely transmitting information between parties as a JSON object.
- **Dotenv:** For managing environment variables.

 
## JWT Generation
To generate a JWT secret, follow these steps:

Open a terminal and type 'clean'
Start the Node.js REPL: node
require('crypto').randomBytes(64).toString('hex')



### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mafizul247/car-doctor-client.git
   cd car-doctor-client


- [Car Doctor Webiste](https://car-doctor-24.web.app/) 

- [Client Site GitHub Repository](https://github.com/mafizul247/car-doctor-client.git) 

- [Server Site GitHub Repository](https://github.com/mafizul247/car-doctor-server.git) 

