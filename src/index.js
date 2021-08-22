import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import fetchImgs from './js/apiService';

function onSubmit(event) {
  event.preventDefault();
  fetchImgs(refs.input.value).then(apiResponseArrayHandler);
}

function apiResponseArrayHandler(imgs) {
  const obj = { imgs: imgs.hits };
  const markup = galleryTemplate(obj);
  refs.container.innerHTML = markup;
}

refs.button.addEventListener('click', onSubmit);
