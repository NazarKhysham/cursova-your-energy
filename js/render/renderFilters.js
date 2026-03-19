export function renderFiltersList(filters) {
    const listEl = document.getElementById('filtersList');
  
    if (!filters || filters.length === 0) {
      listEl.innerHTML = '<p>No results for this filter</p>';
      return;
    }
  
    const markup = filters
      .map(
        ({ name, filter, imgURL, _id }) => `
          <li class="filters__item">
            <img src="${imgURL}" alt="${name}" class="filters__img"/>
            <h3 class="filters__title">${name}</h3>
            <p class="filters__type">${filter}</p>
  
            <button class="add-favorite-btn" data-id="${_id}">
              ⭐ Add
            </button>
          </li>
        `
      )
      .join('');
  
    listEl.innerHTML = markup;
  
    // 🔥 ОБРОБНИК КЛІКУ
    document.querySelectorAll('.add-favorite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
  
        const selected = filters.find(item => String(item._id) === String(id));
        if (!selected) return;
  
        addToFavorites(selected);
      });
    });
  }
  
  // ===== FAVORITES LOGIC =====
  
  const STORAGE_KEY = 'your-energy-favorites';
  
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
  
  function addToFavorites(exercise) {
    const favorites = getFavorites();
  
    const exists = favorites.some(item => String(item._id) === String(exercise._id));
    if (exists) return;
  
    favorites.push(exercise);
    saveFavorites(favorites);
  
    alert('Added to favorites ⭐');
  }