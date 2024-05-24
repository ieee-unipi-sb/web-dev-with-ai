// Get the movies collection element from the DOM
const moviesCollection = document.getElementById("collection");

// ============================================================
// Fill the movies collection with the movies from the database
// ============================================================
function fillMoviesCollection() {
  // Clear the collection DOM element
  moviesCollection.innerHTML =
    "<div class='col' id='addmovie'>" +
    document.getElementById("addmovie").innerHTML +
    "</div>";

  // Get the movies from the database
  getMovies().then((movies) => {
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.innerHTML = `
          <div class="card movie_card" id="${movie.id}">
              <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">Released: ${movie.date}</p>
              </div>
              <div class="card-footer">
                <a class="btn btn-danger" onclick="deleteMovie(this)">
                  <i class="fas fa-trash fa-sm"></i>
                </a>
                <a class="btn btn-primary" onclick="fillModal(this)">
                  <i class="fas fa-edit fa-sm"></i>
                  Edit
                </a>
              </div>
          </div>
          `;

      movieCard.className = "col";
      moviesCollection.appendChild(movieCard);
    });
  });
}
fillMoviesCollection();

// ==============================================
// Function to fill the modal with the movie data
// ==============================================
function fillModal(element) {
  // Get the modal form
  let myModal = new bootstrap.Modal(document.getElementById("editModal"));

  // Get the movie ID
  const movieId = element.parentElement.parentElement.id;

  // Get the movie data
  movieRef
    .doc(movieId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const movie = doc.data();
        const id = doc.id;
        const form = document.getElementById("editmovie");

        // Fill the form with the movie data
        form.title.value = movie.title;
        form.poster.value = movie.poster;
        form.date.value = movie.date;
        form.id.value = id;

        // Add the movie ID to the form
        form.id.value = movieId;

        // Toggle the modal
        myModal.toggle();
      } else {
        console.error("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}
