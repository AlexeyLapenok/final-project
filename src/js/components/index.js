const list = document.getElementById('movie-list');

const sort = document.getElementById('sort');

const container = document.querySelector('.container');
const options = {
  method: 'GET',
  mode: 'cors',
};
const allMovies = function (page) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4fd6fe1cdcc728e4b3c94a5165eac180&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const array = data.results;
      list.innerHTML = '';
      const arrMovies = array.map((item) => `<li><div class="hover"><span class="hover_date"><p>Release date:<br>${item.release_date}</p></span>
      <span class="hover_rate"><p>Rating:<br>${item.vote_average}</p></span>
    <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="no image" width="150px" height="200px"><br>
               <h4> ${item.title}</h4>
               </div></li>`);
      list.insertAdjacentHTML('beforeend', arrMovies.join(''));
    })
    .catch(() => {
      console.log('error');
    });
};
allMovies('1');

const singleMovie = function (i) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4fd6fe1cdcc728e4b3c94a5165eac180&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const array = data.results;
      container.innerHTML = '';
      pagination.innerHTML = '';
      const arrMovies = array.map((item) => `
        <img class="image" src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="no image" width="300px" height="400px">
        <article class="about">
        <p>Title:<br>${item.title}</p>
        <p>Overview:<br>${item.overview}</p>
        <p>Genres:<br></p>
        <p>Popularity:<br>${item.popularity}</p>
        <p>Release date:<br>${item.release_date}</p>
        <p>Vote average:<br>${item.vote_average}</p>
        <p>Vote count:<br>${item.vote_count}</p>
    </article>`);
      container.insertAdjacentHTML('beforeend', arrMovies[i]);
    });
};
list.addEventListener('click', (e) => {
  const li = list.querySelectorAll('li');
  const film = e.target.closest('li');
  for (let i = 0; i < li.length; i++) {
    if (film === li[i]) {
      singleMovie(i);
    }
  }
});

// const result = function () {
//   const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4fd6fe1cdcc728e4b3c94a5165eac180&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page;
//   fetch(url, option)
//     .then((response) => response.json())
//     .then((data) => {
//       const array = data.results;
//     });
// };
const getSortMovies = function (sortBy) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4fd6fe1cdcc728e4b3c94a5165eac180&language=en-US&sort_by=' + sortBy + '&include_adult=false&include_video=false&page=1';
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const array = data.results;
      list.innerHTML = '';
      const arrMovies = array.map((item) => `<li><div class="hover"><span class="hover_date"><p>Release date:<br>${item.release_date}</p></span>
          <span class="hover_rate"><p>Rating:<br>${item.vote_average}</p></span>
        <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="no image" width="150px" height="200px"><br>
                   <h4> ${item.title}</h4>
                   </div></li>`);
      list.insertAdjacentHTML('beforeend', arrMovies.join(''));
    })
    .catch(() => {
      console.log('error');
    });
};
sort.addEventListener('change', function() {
  const sortRating = this.value;
  window.console.log(sortRating.value);
  if (sortRating === 'rating') {
    const sortMovies = function () {
      getSortMovies('vote_average.desc');
    };
    sortMovies();
  }
});
sort.addEventListener('change', function() {
  const sortNone = this.value;
  console.log(sortNone.value);
  if (sortNone === 'none') {
    const sortMovies = function () {
      getSortMovies('popularity.desc');
    };
    sortMovies();
  }
});
sort.addEventListener('change', function() {
  const sortDate = this.value;
  console.log(sortDate.value);
  if (sortDate === 'release_date') {
    const sortMovies = function () {
      getSortMovies('release_date.asc');
    };
    sortMovies();
  }
});

// pagination
const pagination = document.querySelector('.pagination');
const buttons = document.querySelectorAll('div a');
const current = buttons[0];
// console.log(buttons);
pagination.addEventListener('click', (e) => {
  e.preventDefault();
  // current = this;
  // buttons.forEach((el) => {
  //   if (el == this) { el.className = 'select'; } else el.className = '';
  // });
  const one = e.target.closest('.one');
  if (one) {
    document.location.href = 'index.html';
  }
  const two = e.target.closest('.two');
  if (two) {
    allMovies('2');
  }
  const three = e.target.closest('.three');
  if (three) {
    allMovies('3');
    document.querySelector('.two').classList.remove('none');
    document.querySelector('.five').classList.add('none');
    document.querySelector('.first-ellipsis').classList.add('none');
  }
  const four = e.target.closest('.four');
  if (four) {
    allMovies('4');
    document.querySelector('.first-ellipsis').classList.remove('none');
    document.querySelector('.two').classList.add('none');
    document.querySelector('.three').classList.remove('none');
    document.querySelector('.five').classList.remove('none');
    document.querySelector('.six').classList.add('none');
  }
  const five = e.target.closest('.five');
  if (five) {
    allMovies('5');
    document.querySelector('.three').classList.add('none');
    document.querySelector('.four').classList.remove('none');
    document.querySelector('.six').classList.remove('none');
    document.querySelector('.seven').classList.add('none');
    if (document.querySelector('.first-ellipsis').classList.contains('none')) {
      document.querySelector('.first-ellipsis').classList.remove('none');
    }
  }
  const six = e.target.closest('.six');
  if (six) {
    allMovies('6');
    document.querySelector('.first-ellipsis').classList.remove('none');
    document.querySelector('.four').classList.add('none');
    document.querySelector('.five').classList.remove('none');
    document.querySelector('.seven').classList.remove('none');
    document.querySelector('.eight').classList.add('none');
    document.querySelector('.nine').classList.add('none');
    document.querySelector('.second-ellipsis').classList.remove('none');
  }
  const seven = e.target.closest('.seven');
  if (seven) {
    allMovies('7');
    document.querySelector('.four').classList.add('none');
    document.querySelector('.five').classList.add('none');
    document.querySelector('.six').classList.remove('none');
    document.querySelector('.eight').classList.remove('none');
    document.querySelector('.nine').classList.remove('none');
    document.querySelector('.second-ellipsis').classList.add('none');
  }
  const eight = e.target.closest('.eight');
  if (eight) {
    allMovies('8');
    document.querySelector('.six').classList.add('none');
    document.querySelector('.seven').classList.remove('none');
  }
  const nine = e.target.closest('.nine');
  if (nine) {
    allMovies('9');
    document.querySelector('.seven').classList.add('none');
  }
  const ten = e.target.closest('.ten');
  if (ten) {
    allMovies('10');
    document.querySelector('.two').classList.add('none');
    document.querySelector('.three').classList.add('none');
    document.querySelector('.four').classList.add('none');
    document.querySelector('.five').classList.add('none');
    document.querySelector('.six').classList.add('none');
    document.querySelector('.eight').classList.remove('none');
    document.querySelector('.nine').classList.remove('none');
    document.querySelector('.second-ellipsis').classList.add('none');
    if (document.querySelector('.first-ellipsis').classList.contains('none')) {
      document.querySelector('.first-ellipsis').classList.remove('none');
    }
  }
});
