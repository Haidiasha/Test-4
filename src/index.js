import { fetchImages } from './fetch-images';
import { renderGallery } from './render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.guard');

let query = '';
let currentPage = 1;
const perPage = 40;

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      fetchImages(query, currentPage, perPage)
        .then(({ data }) => {
          if (data.totalHits === 0) {
            alertNoQueryMatch();
          } else {
            gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
            simpleLightBoxs = new SimpleLightbox('.gallery a').refresh();
            const totalPages = Math.ceil(data.totalHits / perPage);
            if (currentPage === totalPages) {
              alertEndOfGalary();
            }
          }
        })
        .catch(error => console.log(error));
    }
  });
}

form.addEventListener('submit', searchImages);

function searchImages(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  query = evt.currentTarget.searchQuery.value.trim();

  if (query === '') {
    alertEmptyQuery();
    return;
  }

  fetchImages(query, currentPage, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoQueryMatch();
      } else {
        gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
        observer.observe(guard);
        simpleLightBoxs = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(data);
      }
    })
    .catch(error => console.log(error));
}

function alertNoQueryMatch() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertImagesFound(data) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertEmptyQuery() {
  Notify.info(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertEndOfGalary() {
  Notify.warning("We're sorry, but you've reached the end of search results.");
}
