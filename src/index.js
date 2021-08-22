import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import PixabayApi from './js/apiService';

//fetchImg returns array of images related to it's argument/ we need to put it into object for handlebars and create markup..
function createPage(imgs) {
  const markup = galleryTemplate(imgs);
  refs.container.innerHTML = markup; //...and then put it into the HTML container
}
const pixabayApi = new PixabayApi();

//all fetchImg stuff should work as a response for submit, so we use it here
function onSubmit(event) {
  event.preventDefault();
  pixabayApi.searchQuery = event.target.elements.query.value;
  pixabayApi.resetPage();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
}

//and adding event listener, eventually
refs.form.addEventListener('submit', onSubmit);

//======load-more-code======

const onLoadMoreClick = function (event) {
  event.preventDefault();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
};

refs.loadMoreButton.addEventListener('click', onLoadMoreClick);
