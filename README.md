## Description
- The project was to develop an e-commerce site for virgin wool products
- Co-founded Awakeningbirds UG for this purpose
- Used a CMS to access and edit customer data and website content
- Developed the system myself to enhance my programming experience

## Tech-Stack
- TypeScript and Webpack as underlying technologies
- React.js for the CMS-Frontend and the website
- Node.js, Express.js and MongoDB for the REST API and datastorage
- Nginx as reverse proxy and for the SSL certificate configuration
- Authorization and hashing with jsonwebtoken and bycrypt
- PayPal API integration for the payment process
- CI \ CD Pipiline with GitHub actions
- AWS EC2 with Ubuntu as the hosting service

## Learnings
Despite integrating everything, I lacked in-depth knowledge of IT security and had only limited experience. I would be responsible for the security of this data and the access and security to our PayPal account. It became clear to me that going into production with this system posed a risk I could not estimate, so I decided against it. However, I learned a lot about myself, the technologies involved and project management.

- Prioritizing the learning experience ahead of the fast e-commerce website launch, shows I am a developer at heart. For potential future self-employed businesses I am aware of that fact. 
- React.js as a Single Page Application is not the best solution for a simple e-commerce website.
<br>To keep a website simple and optimize its performance, it is easier to use native technologies.<br> 
<a href="https://github.com/Bjarne96/webbase"><u>Repository of a performance-optimzed website.</u></a>
- I should have delved deeper into TypeScript, it added a lot of work instead of saving time; I only grasped its true benefits in later projects.<br>
<a href="https://github.com/Bjarne96/learn-with-karel"><u>Repository of a later TypeScript Project.</u></a>

## Installation (DEPRECATED)

Run the Server:<br>
To install npm modules run "npm install".<br>
To build the server: "npm run build".<br>
To start the server and watch the server files: "npm run watch".<br>
For separate consoles go "npm run api" and "npm run web" and "npm run mongo"<br>
<br>
Server Configuration:<br>
API is on "https://localhost:4000".<br>
API-Frontend is on "https://localhost:3000".<br>

To Test run "yarn jest"

*&nbsp;This repository was migrated/refactored in 2020 as part of another repository that included the API, the CMS-Frontend and the website together.