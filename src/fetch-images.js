import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '52524133-4840f4d1849dbcbab634b6990';

export async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response;
}
