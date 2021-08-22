import './sass/main.scss';

import galleryTemplate from './handlebars/gallery.hbs';

import refs from './js/references';
import PixabayApi from './js/apiService';

//render-page code
function createPage(imgs) {
  refs.container.insertAdjacentHTML('beforeend', galleryTemplate(imgs));
}

//for load-more btn
const showLoadMoreBtn = function () {
  refs.loadMoreButton.classList.remove('visually-hidden');
};

//for scroll
const scrollToNewImg = function () {
  refs.loadMoreButton.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

//✨ creating new instance ✨
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
  setTimeout(showLoadMoreBtn, 2000);
};

const onLoadMoreClick = function (event) {
  event.preventDefault();
  pixabayApi.fetchImg().then(imgs => {
    createPage(imgs.hits);
  });
  setTimeout(scrollToNewImg, 500);
};

//event listeners, personally 👏
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreClick);
