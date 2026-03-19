const STORAGE_KEY = 'your-energy-favorites';

const listEl = document.getElementById('favorites-list');
const emptyEl = document.getElementById('favorites-empty');

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function removeFavorite(id) {
  const favorites = getFavorites().filter(item => String(item._id) !== String(id));
  saveFavorites(favorites);
  renderFavorites();
}

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';

  listEl.innerHTML = favorites.map(item => `
    <li>
      <h3>${item.name || 'Exercise'}</h3>
      <button data-id="${item._id}" class="remove-btn">Remove</button>
    </li>
  `).join('');

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFavorite(btn.dataset.id);
    });
  });
}

renderFavorites();