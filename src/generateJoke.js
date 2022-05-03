import axios from 'axios';

const generateJoke = async () => {
  const response = await axios.get('https://icanhazdadjoke.com', {
    headers: {
      'Accept': 'application/json',
    },
  });

  return response.data.joke;
};

export default generateJoke;
