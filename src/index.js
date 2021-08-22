import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import PixabayApi from './js/apiService';

//code to render page
function createPage(imgs) {
  refs.container.insertAdjacentHTML('beforeend', galleryTemplate(imgs));
}

//creating new instance ✨
const pixabayApi = new PixabayApi();

//two function for events
const onSubmit = function (event) {
  event.preventDefault();
  pixabayApi.searchQuery = event.target.elements.query.value;
  pixabayApi.resetPage();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
};

const onLoadMoreClick = function (event) {
  event.preventDefault();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
};

//and adding event listener,
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreClick);
