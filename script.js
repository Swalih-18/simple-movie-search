async function displayMovieInfo(movieName) {
  try {
    // Get movie dat from  tmdb api
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`);
    const data = await response.json();
    const movie = data.results[0];

    const titleElement = document.getElementById('title-head');
    titleElement.textContent = movie.title;

    const posterElement = document.getElementById('poster-image');
    posterElement.style.width = '350px';
    posterElement.style.height = '525px';
    posterElement.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`);
    const creditsData = await creditsResponse.json();

    const castList = document.createElement('ul');
    creditsData.cast.slice(0, 5).forEach(castMember => {
      const listItem = document.createElement('li');
      listItem.textContent = castMember.name;
      castList.appendChild(listItem);
    });

    // Replace existing cast list
    const existingList = document.querySelector('ul');
    if (existingList) {
      existingList.replaceWith(castList);
    } else {
      document.body.appendChild(castList);
    }

  } catch (error) {
    console.error('Failed to fetch movie info:', error);
  }
}
