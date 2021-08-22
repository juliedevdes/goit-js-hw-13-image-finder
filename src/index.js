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

//all fetchImg stuff should work as a response for submit btn click, so we use it here
function onSubmitBtnClick(event) {
  event.preventDefault();
  fetchImgs(refs.input.value).then(apiResponseArrayHandler);
}

//and adding event listener, eventually
refs.button.addEventListener('click', onSubmitBtnClick);
