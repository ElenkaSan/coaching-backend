// import axios from "axios";
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; 

//Build Front Surge
// const BASE_URL = process.env.REACT_APP_BASE_URL || "https://couch-back.herokuapp.com/";
// $ REACT_APP_BASE_URL=https://couch-back.herokuapp.com npm run build
// $ cp build/index.html build/200.html
// $ surge build

/** API Class.
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 * 
 * Axios is pretty similar to Fetch. It's also a Promise-based HTTP client and it runs in both, browsers and Node.js. 
 * Relying on Promises, use await 
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;
  static trip;

  static async backendRequest(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}`};
    const params = (method === "get")
        ? data
        : {};
    
    const trips = {Add: `${Api.trip}`};

    try {
      return (await axios({ url, method, data, params, headers, trips })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes:
  //USER ------------------------------------- backendRequest
  static async signup(data) {
    let res = await this.backendRequest(`auth/register`, data, "post");
    return res.token;
  }

   static async login(data) { 
    let res = await this.backendRequest(`auth/token`, data, "post");
    return res.token;
  }
  
  static async getUserProfile(username) {
    let res = await this.backendRequest(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.backendRequest(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteUser(username){
      let res = await this.backendRequest(`users/${username}`, {}, "delete");
      return res.data;
  }

  //will write more about company routes and etc
}

export default Api;
