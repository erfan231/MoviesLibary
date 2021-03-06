import React, { Component } from 'react';
import MovieCard from "./MovieCard";
import { genres, getGenres } from "../Helpers/genres";
import "../ComponentStyles/MovieList.css";
import defMovieImg from "./default-movie.jpg";



class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: []
        }
    }

    componentDidMount() {
        this.setMovies();
    }

    async getMovies(apiLink) {
        let result;
        await fetch(apiLink)
            .then(res => {
                return res.json()
            }).then(data => {
                result = data.results;
                console.log("bsdfg", result);

            });
        return result;
    }

    async setMovies() {
        this.getMovies(this.props.apiLink)
            .then(movies => {
                let moviesToAdd = []
                movies.forEach(movie => {
                    if (movie.title) {
                        let movieToAdd = {
                            movieId: movie.id,
                            movieTitle: movie.title,
                            movieRating: movie.vote_average,
                            movieGenre: getGenres(movie.genre_ids),
                            moviePoster: movie.poster_path ? `http://image.tmdb.org/t/p/original//${movie.poster_path}` : defMovieImg,
                            movieDate: (movie.release_date ? movie.release_date.substring(0, 4) : "-")
                        }
                        moviesToAdd.push(movieToAdd);
                    }
                });
                this.setState({ moviesList: moviesToAdd })
                console.log("ml", this.state.moviesList);
            })
    }

    displayMovies() {
        return this.state.moviesList
            .map(movie => {
                return (
                    <MovieCard
                        movieId={movie.movieId}
                        movieTitle={`${movie.movieTitle} (${movie.movieDate})`}
                        movieGenre={movie.movieGenre}
                        movieRating={movie.movieRating}
                        moviePoster={movie.moviePoster}
                    />)
            })
    }
    render() {
        if (this.state.moviesList.length > 0) {
            return (
                <section class="MovieList container">
                    <h1 class="MovieList-title big-text">{this.props.listTitle}</h1>
                    <div class="MovieList-carousel">
                        {/* <!-- Popular carousel goes here --> */}
                        {this.displayMovies()}

                    </div>
                </section>
            );
        }
        return <div>lol</div>

    }
}

export default MovieList;