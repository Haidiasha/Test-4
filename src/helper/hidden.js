import { loader } from '..';

export function toggleLoader(show) {
  if (show) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

export function hideElement(el) {
  el.classList.add('hidden');
}

export function showElement(el) {
  el.classList.remove('hidden');
}
