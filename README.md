# rooms

Web Application that lets users stream media between each other (currently supports sharing local video files and screen sharing)

Tech stack: NodeJS, ReactJS, Express, SocketIO, MySQL and WebRTC.

Live Demo: https://rooms-networks.herokuapp.com/

# Branches
- master_backend: NodeJS API server based on Express & Socket.IO server for WebRTC signaling.
- master_frontend: ReactJS application that consumes the backend API.

# Installing and running

Manually:
- Node.JS v13.11.0 or higher
https://nodejs.org/en/download/
- MySQL
https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html
- Clone the repository
- Run "npm install" inside the directory to install the application dependencies
- Configure Database information (username, password) in "/models/index.js"
- Create Database "rooms"
- Then run "npx nodemon" to run the backend API on "localhost:3000/"

Docker:
- Soon
