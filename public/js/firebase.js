// ========================================================
// Async Function to get all the movies from the collection
// ========================================================
async function getMovies() {
  const snapshot = await movieRef.get();

  const movies = snapshot.docs.map((doc) => doc.data());

  movies.forEach((movie) => {
    movie.id = snapshot.docs.find((doc) => doc.data().title === movie.title).id;
  });

  return movies;
}

// ===============================================
// Async Function to add a movie to the collection
// ===============================================
async function addMovie(event) {
  event.preventDefault();

  // Get the data from the form
  const data = new FormData(event.target);
  const movie = {
    title: data.get("title"),
    poster: data.get("poster"),
    date: data.get("date"),
  };

  // Check any of the fields are empty
  if (!movie.title || !movie.poster || !movie.date) {
    toastr.error("Please fill all the fields!", "Error");
    return;
  }

  // Check if the image url is valid and is a jpg or png
  if (!movie.poster.includes(".jpg") && !movie.poster.includes(".png")) {
    toastr.error("Image URL must contain a .jpg or .png extension", "Error");
    return;
  }

  // Check if the movie already exists
  const snapshot = await movieRef.where("title", "==", movie.title).get();

  if (snapshot.empty) {
    try {
      const docRef = await movieRef.add(movie);

      console.log("Movie added with ID: ", docRef.id);
      toastr.success("Movie added successfully!", "Success");

      fillMoviesCollection();
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  } else {
    toastr.error("Movie already exists!", "Error");
  }
}

// ====================================================
// Async Function to delete a movie from the collection
// ====================================================
async function deleteMovie(element) {
  // Get the movie ID
  const movieId = element.parentElement.parentElement.id;

  try {
    await movieRef.doc(movieId).delete();

    console.log("Movie deleted with ID: ", movieId);
    toastr.success("Movie deleted successfully!", "Success");

    fillMoviesCollection();
  } catch (error) {
    console.error("Error deleting movie: ", error);
  }
}

// ==================================================
// Async Function to update a movie in the collection
// ==================================================
async function updateMovie(event) {
  event.preventDefault();

  // Get the data from the form
  const data = new FormData(event.target);
  const movie = {
    title: data.get("title"),
    poster: data.get("poster"),
    date: data.get("date"),
  };

  // Get the movie ID
  const movieId = data.get("id");

  try {
    await movieRef.doc(movieId).update(movie);

    console.log("Movie updated with ID: ", movieId);
    toastr.success("Movie updated successfully!", "Success");

    let myModalEl = document.getElementById("editModal");
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    fillMoviesCollection();
  } catch (error) {
    console.error("Error updating movie: ", error);
  }
}
