export default function fetchImg(searchQuery, pageNum = 1) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNum}&per_page=12&key=23034166-be8967e0ea66b0703121f1d79`,
  ).then(response => {
    if (response.status === 404) {
      console.log('Error');
    }
    return response.json();
  });
}