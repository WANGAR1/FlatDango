// Your code here
const base_url = "http://localhost:3000";
const films_url = `${base_url}/films`;

window.addEventListener('DOMContentLoaded', () => {
  // Fetch the list of movies and display them in the sidebar
  fetch_films().then((films) => {
    const filmsList = document.querySelector('#films');
    films.forEach((film) => {
      const li = document.createElement('li');
      li.textContent = film.title;
      li.classList.add('film-item');
      if (film.id === 1) {
        li.classList.add('active');
      }
      li.addEventListener('click', () => {
        // Display the details of the selected movie
        display_movie_details(film.id);
        // Highlight the selected movie in the list
        const activeEl = document.querySelector('.film-item.active');
        if (activeEl) {
          activeEl.classList.remove('active');
        }
        li.classList.add('active');
      });
      filmsList.appendChild(li);
    });
    // Display the details of the first movie by default
    display_movie_details(1);
  });

  // Handle "Buy Ticket" button click
  document.querySelector('#buy-ticket-btn').addEventListener('click', () => {
    const availableEl = document.querySelector('#tickets-available');
    const availableNum = parseInt(availableEl.textContent);
    if (availableNum > 0) {
      availableEl.textContent = availableNum - 1;
    }
  });
});

async function fetch_films() {
  const response = await fetch(films_url);
  const json = await response.json();
  return json;
}

async function fetch_film_details(film_id) {
  const response = await fetch(`${films_url}/${film_id}`);
  const json = await response.json();
  return json;
}

async function display_movie_details(film_id) {
  const film = await fetch_film_details(film_id);
  document.querySelector('#title').textContent = film.title;
  document.querySelector('#poster').src = film.poster;
  document.querySelector('#runtime').textContent = film.runtime;
  document.querySelector('#showtime').textContent = film.showtime;

  const availableEl = document.querySelector('#tickets-available');
  const availableNum = film.capacity - film.tickets_sold;
  availableEl.textContent = availableNum;

  const descriptionEl = document.querySelector('#description');
  descriptionEl.textContent = film.description;
}