$(document).ready(function() {
	$('#searchForm').on('submit', function(e) {
		var searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
	
	var searchQuery = sessionStorage.getItem('searchQuery');
	console.log(searchQuery);
});

function getMovies(searchText) {
	console.log(searchText);
	$.ajax({
		method: 'GET',
		url: 'http://www.omdbapi.com/?apikey=a336cd51&s=' + searchText,
		success: function(res) {
			var movies = res.Search;
			var output = '';
			$.each(movies, function(index, movie) {
				var movieID = movie.imdbID.toString();
				if(movie.Poster !== "N/A") {
					output += '<div class="col-md-4';
					if(index >= 1) {
//						output += ' order-md-4';
					}					
					output += '"><div class="well text-center"><img src="' + movie.Poster + '"><div class="details"><h5>' + movie.Title + '</h5><p class="details-btn"><a onclick="movieSelected(\'' + movieID + '\')" class="btn btn-primary" href="#">Movie Details</a></p></div></div></div>';
//					console.log(movie.Poster);
					console.log(index);
				} //<p class="text-center genre">' + movie.Type + '</p>
			});
			$('#movies').html(output);
		}
	})
}


function movieSelected(id) {
	var searchText = $('#searchText').val();
	sessionStorage.setItem('movieId', id);
	sessionStorage.setItem('searchQuery', searchText);
	window.location = 'movie.html';
	return false;
}

function getMovie() {
	var movieId = sessionStorage.getItem('movieId');
	
	$.ajax({
		method: 'GET',
		url: 'http://www.omdbapi.com/?apikey=a336cd51&i=' + movieId,
		success: function(res) {
			console.log(res);
			var movie = res;
			var output = '<div class="row"><div class="col-md-4"><img src="';
			output += movie.Poster;
			output += '" class="thumbnail"></div><div class="col-md-8"><h2> ';
			output += movie.Title;
			output += '</h2><ul class="list-group">';
			output += '<li class="list-group-item"><strong>Genre:</strong> ';
			output += movie.Genre;
			output += '</li>';
			output += '<li class="list-group-item"><strong>Released:</strong> ';
			output += movie.Released;
			output += '</li>';
			output += '<li class="list-group-item"><strong>Rated:</strong> ';
			output += movie.Rated;
		    output += '</li>';
			output += '<li class="list-group-item"><strong>Media type:</strong> ';
			output += movie.Type;
		    output += '</li>';
			output += '<li class="list-group-item"><strong>Runtime:</strong> ';
			output += movie.Runtime;
		    output += '</li>';
			output += '<li class="list-group-item"><strong>IMDB Rating:</strong> ';
			output += movie.imdbRating;
		    output += '</li>';
			output += '<li class="list-group-item"><strong>Director:</strong> ';
			output += movie.Director;
			output += '</li>';
			output += '<li class="list-group-item"><strong>Writer:</strong> ';
			output += movie.Writer;
			output += '</li>';
			output += '<li class="list-group-item"><strong>Actors:</strong> ';
			output += movie.Actors;
			output += '</li>';
			output += '</ul></div></div>';
			output += '<div class="row">';
			output += '<div class="col-sm-12">';
			output += '<div class="well">';
			output += '<h3>Plot</h3>';
			output += movie.Plot;
			output += '<hr>';
			output += '<a href="http://imdb.com/title/';
			output += movie.imdbID;
			output += '" target="_blank" class="btn btn-primary">View IMDB</a>';
			output += '<a href="index.html" class="btn btn-default">Go Back to Search</a>';
			output += '</div></div></div>';
			$('#movie').html(output);
		}
	});
}



// http://www.omdbapi.com?
//	http://img.omdbapi.com/?apikey=a336cd51&