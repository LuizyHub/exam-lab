import axios from 'axios';

export default function labExamAxios(limit, setData) {
  axios.get('http://localhost:3001/sample')
    .then(res => {
      setData(res.data.slice(0, limit));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}