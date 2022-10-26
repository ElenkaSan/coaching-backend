# Web-Couch-Back
# Project - Web-Couch-Back
### *The app [Web-Couch-Bac] - (not yet)*

## App Information
## Back-end

cd into the "backend" directory, install required packages, create and seed database, and start the server. (Make sure that you have postgreSQL installed)
  ```sh
  cd backend  
  npm install  
  createdb couch
  psql < couch.sql  
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


Feel free to improve or contribute. Pull requests are always welcome!

Author [Elena Nurullina](https://github.com/ElenkaSan/)
