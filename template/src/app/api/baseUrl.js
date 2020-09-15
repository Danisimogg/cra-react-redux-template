import axios from 'axios';


// BaseURl you can change it by ENV func or on CI stage
const instance = axios.create({
  baseURL: "http://localhost:3333"
});

export default instance;
