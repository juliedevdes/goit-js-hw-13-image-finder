import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import fetchImgs from './js/apiService';

//fetchImg returns array of images related to it's argument/ we need to put it into object for handlebars and create markup..
function apiResponseArrayHandler(imgs) {
  const obj = { imgs: imgs.hits };
  const markup = galleryTemplate(obj);
  refs.container.innerHTML = markup; //...and then put it into the HTML container
}

//all fetchImg stuff should work as a response for submit, so we use it here
function onSubmit(event) {
  event.preventDefault();
  fetchImgs(event.target.elements.query.value)
    .then(apiResponseArrayHandler)
    .catch(err => console.log(err));
}

//and adding event listener, eventually
refs.form.addEventListener('submit', onSubmit);
