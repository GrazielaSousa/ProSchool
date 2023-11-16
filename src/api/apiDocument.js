import axios from 'axios';

const apiDocument = axios.create({
  baseURL: "http://localhost:3333"
});

export default apiDocument;