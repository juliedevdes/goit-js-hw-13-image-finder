export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.pageNum = 1;
  }
  fetchImg() {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNum}&per_page=12&key=23034166-be8967e0ea66b0703121f1d79`,
    )
      .then(r => r.json())
      .then(imgs => {
        this.pageNum += 1;
        return imgs;
      });
  }

  resetPage() {
    this.pageNum = 1;
  }

  get query() {
    return this.this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
