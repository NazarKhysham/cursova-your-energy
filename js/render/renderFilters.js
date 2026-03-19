export function renderFiltersList(filters) {
    const listEl = document.getElementById('filtersList');
  
    if (!filters || filters.length === 0) {
      listEl.innerHTML = '<p>No results for this filter</p>';
      return;
    }
  
    const markup = filters
      .map(
        ({ name, filter, imgURL }) => `
        <li class="filters__item">
          <img src="${imgURL}" alt="${name}" class="filters__img"/>
          <h3 class="filters__title">${name}</h3>
          <p class="filters__type">${filter}</p>
        </li>
      `
      )
      .join('');
  
    listEl.innerHTML = markup;
  }