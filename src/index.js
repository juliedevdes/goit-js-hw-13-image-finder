import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import PixabayApi from './js/apiService';

//fetchImg returns array of images related to it's argument/ we need to put it into object for handlebars and create markup..
function apiResponseHandler(imgs) {
  pixabayApi.pageNum += 1;
  const obj = { imgs: imgs.hits };
  const markup = galleryTemplate(obj);
  refs.container.innerHTML = markup; //...and then put it into the HTML container
}
const pixabayApi = new PixabayApi();

//all fetchImg stuff should work as a response for submit, so we use it here
function onSubmit(event) {
  event.preventDefault();
  pixabayApi.searchQuery = event.target.elements.query.value;
  pixabayApi.resetPage();
  pixabayApi
    .fetchImg()
    .then(apiResponseHandler)
    .catch(err => console.log(err));
}

//and adding event listener, eventually
refs.form.addEventListener('submit', onSubmit);

//======load-more-code======

const onLoadMoreClick = function (event) {
  event.preventDefault();
  pixabayApi
    .fetchImg()
    .then(apiResponseHandler)
    .catch(err => console.log(err));
};

refs.loadMoreButton.addEventListener('click', onLoadMoreClick);
