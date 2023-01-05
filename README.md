# Web-Coach-Back
# Project - Web-Coach-Back
### *The app [Web-Coach-Bac] - (not yet)*

## App Information
## Back-end

cd into the "backend" directory, install required packages, create and seed database, and start the server. (Make sure that you have postgreSQL installed)

  ```sh
  cd backend  
  npm install  
  createdb coach
  psql < coach.sql  
  nodemon server.js or node server.js
  ```  
  
  This will start the server on port 3001
  
### Data

Future will be able to add classes and payments inside user page.

```sh
DB schema: 
  ├── classes table 
  │   └── users table (& admin)
  │                 
  ├── programs table
  └── publications table
 ```

## [Front-end]

cd into the "frontend" directory, install required packages, then start the app.

  ```sh
  cd frontend    
  npm install    
  npm start
  ```

  This will run your app on http://localhost:3000

<img width="1304" alt="navbar" src="https://user-images.githubusercontent.com/75818489/198122186-704db66a-433a-4740-b13f-a2398f1f82f7.png">

Feel free to improve or contribute. Pull requests are always welcome!

Author [Elena Nurullina](https://github.com/ElenkaSan/)
