import generateJoke from './generateJoke';

import laughImage from './images/laugh.svg';

import './styles/index.scss';

const image = document.getElementById('image');
const text = document.getElementById('text');
const button = document.getElementById('button');

image.src = laughImage;

button.addEventListener('click', async () => {
  text.innerHTML = await generateJoke();
});

button.dispatchEvent(new Event('click'));
