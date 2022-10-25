# Vacation-Back
# Capstone Project 2 - Vacation Time
### *Try the app [Vacation Time](https://changeable-laugh.surge.sh/)*
Ready for travel, let’s make the trip of your dreams. This website `Vacation Time` allows you to find the nice hotel, flight for you with the best price. When your make next travel destination then can do a record personalized notes for vacation planning after create an account.
You can conveniently save your results along with any notes you've made in your personalized list. Start count down your trip date and check the Weather forecast.
This website allows users to create an account and save the result after that with create a list of their Packing List and CountDown trip/flight/deadlines/evens and etc. 

## App Information
## Back-end

cd into the "backend" directory, install required packages, create and seed database, and start the server. (Make sure that you have postgreSQL installed)
  ```sh
  cd backend  
  npm install  
  createdb vacation
  psql < vacation.sql  
  nodemon server.js or node server.js
  ```  
  This will start the server on port 3001
  
### Data
For this CP database that takes trip-related information from the [Amadeus API](https://amadeus.com/)

```sh
DB schema: 
  ├── trips table (favorite flights/hotels) 
  │   └── users table
  │                 
  ├── flightReservations table
  └── hotelReservations table
 ```

<img width="1142" alt="Screen Shot 2022-10-14 at 1 53 17 PM" src="https://user-images.githubusercontent.com/75818489/195910555-2d728b7e-5cd0-413f-bd87-2efe67cc0b8a.png">


## [Front-end](https://github.com/ElenkaSan/Capstone_Project_2_Frontend.git)

cd into the "frontend" directory, install required packages, then start the app 
  ```sh
  cd frontend    
  npm install    
  npm start
  ```
  This will run your app on http://localhost:3000
  
### Routes
|Path                 | Component         |  
|---------------------|-------------------|
| /                   | Homepage          |  
| /signup             | SignupForm        |   
| /login              | LoginForm         |  
| /hotels   	        | AddHotel          |
| /hotels             | HotelDetail       |
| /flights            | AddFlight         |
| /flights            | FlightDetail      |
| /profile            | UserPage          |
| /update             | ProfileForm       |
| /weather            | WeatherPage       |

## Component Architecture
```sh
App
api
amadeusApi
APIw
airportData
src
│ 
├── Routes-nav
│   ├── Navigation
│   └── Routes
│ 
├── Hotels
│   ├── SearchHotels
│   ├── AddHotel
│   └── HotelDetail 
│   
├── Flights
│   ├── SearchFlights
│   ├── AddFlight
│   └── FlightDetail 
│ 
├── Homepage ── NoLoggedIn
│ 
├─┬ Auth
│ │ ├── LoginForm
│ │ ├── SignupForm
│ │ └── ProfileForm ── UserPage
│ └── UserContext
│
├── TripPage
│   ├── AddItemForm
│   ├── CountDownTrip
|   ├── EventCountdown
|   ├── Forma
|   ├── Timers
│   ├── Item 
|   └── PackingList
│ 
├── Common
│   ├── LoadingSpinner 
│   └── Alert
│
├── WeatherPage
│   ├── WeatherPage 
│   ├── WeatherDayCard
│   └── WeatherSearchBar
│ 
└── Hooks
    ├── useLocalStorage
    ├── useTimedMessage
    └── useToggle
```

### Functionality
The app's functionality includes:
  - User can search flights / hotels for every place on Earth
  - User can see CountDown thier trip (e.g. Flight time or other Events, Deadlines) and add Packing List after signup
  - Search the Weather forecast in User page
  - User can record ideas and ruminations about the venue in your own personal note

### Technology Stack
- Front-End: HTML5 | CSS3 | JavaScript | React | React Bootstrap | Redux | RTL | JSON Schema | JSON Web Token
- Back-End: Node.js | Express.js | SuperTest | JWT Authentication | Bcrypt | PostgreSQL | Axios | RESTful API Endpoints | MongoDB 

### Hosting
Heroku

### Future-Features
  - The travel time feature:
    - Save favorite flight / hotel results into thier User Account and Trip Page after signup
    - Automatically calculate the flights and hotel date to count down in account, analyze hotel and flight costs and create trip list
    - Book flight and hotel
    - Car search, save and book
    - When you search for any destination in the world, you will get recommendations for nice venues and places to visit in the area and detailed information about those places including pictures and maps.
    - Create app on the phone

*Stretch goals:*
  - Share favorite trip lists with other users on the site. Good for family members, that they can add this list to their account.

Feel free to improve or contribute. Pull requests are always welcome!

Author [Elena Nurullina](https://github.com/ElenkaSan/)
