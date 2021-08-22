import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import PixabayApi from './js/apiService';

//code to render page
function createPage(imgs) {
  refs.container.insertAdjacentHTML('beforeend', galleryTemplate(imgs));
}

const showLoadMoreBtn = function () {
  refs.loadMoreButton.classList.remove('visually-hidden');
};

const scrollToNewImg = function () {
  refs.loadMoreButton.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

//creating new instance ✨
const pixabayApi = new PixabayApi();

//two function for events
const onSubmit = function (event) {
  event.preventDefault();
  pixabayApi.searchQuery = event.target.elements.query.value;
  pixabayApi.resetPage();
  refs.container.innerHTML = '';
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
  setTimeout(showLoadMoreBtn, 3000);
};

const onLoadMoreClick = function (event) {
  event.preventDefault();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
  setTimeout(scrollToNewImg, 500);
};

//and adding event listeners
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreClick);
