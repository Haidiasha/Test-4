import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { toggleLoader, showElement, hideElement } from './helper/hidden';

const breedCats = document.querySelector('.breed-select');
export const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedCats.addEventListener('change', selectCat);

async function loadBreeds() {
  try {
    toggleLoader(true);
    hideElement(breedCats);
    hideElement(errorEl);

    const breeds = await fetchBreeds();
    console.log;
    breedCats.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    showElement(breedCats);
  } catch (err) {
    showElement(errorEl);
    console.error(err);
  } finally {
    toggleLoader(false);
  }
}

async function selectCat(evt) {
  const breedId = evt.target.value;
  try {
    toggleLoader(true);
    hideElement(errorEl);

    const data = await fetchCatByBreed(breedId);
    console.log(data);

    if (data.length > 0) {
      const cat = data[0];
      const breed = cat.breeds[0];

      catInfo.innerHTML = `
        <img src="${cat.url}" alt="${breed.name}" width="400"/>
        <h2>${breed.name}</h2>
        <p><strong>Description:</strong> ${breed.description}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
      `;

      showElement(catInfo);
    }
  } catch (err) {
    showElement(errorEl);
    console.error(err);
  } finally {
    toggleLoader(false);
  }
}

loadBreeds();
