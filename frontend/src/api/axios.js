import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://document-editor-4.onrender.com/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
