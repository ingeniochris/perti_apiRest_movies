"use strict";

//Models DB´s
import Movie from "../models/Movie";
import User from "../models/User";
/**
 * this convert all string to lowercase
 * @param {String} title
 * @returns {String} title lowercase
 */
const normalizeWord = (title) => {
  return title.toLowerCase();
};
/**
 * This search one movie in db
 * @param {Movie} title
 * @returns movie
 */
export const titleMovieService = async (titleUpdate) => {
  console.log(titleUpdate.title)
  const movie = await Movie.find({title:{$in: titleUpdate.title}});
  return movie;
};

/**
 * Add movie in DB
 * @param {String} title Movie title.
 * @param {String} year Movie year.
 * @param {String} runtime Movie runtime.
 * @param {String} token jwt Sesion.
 * @returns {Object} saveMovie
 */
export const createMovieService = async ({ title, year, runtime, token }) => {
  let normalizeTitle = normalizeWord(title);
  try {
    const searchUser = await User.findOne({ token });
    const searchMovie = await Movie.findOne({ title: normalizeTitle });
    if (searchMovie) return { msg: "The movie already exists" };
    const newMovie = new Movie({
      title: normalizeTitle,
      year,
      runtime,
      user: await searchUser.save(),
    });
    const saveMovie = await newMovie.save();
    return saveMovie;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Update Movie
 * @param {ObjectId} id
 * @param {String} title Movie title.
 * @param {String} year Movie year.
 * @param {String} runtime Movie runtime.
 * @param {String} token jwt Sesion.
 * @returns {json} msg message
 */
export const updateMovieService = async (
  id,
  { title, year, runtime, token }
) => {
  try {
    const searchUser = await User.findOne({ token });
    const searchMovieId = await Movie.findByIdAndUpdate(id, {
      $set: {
        title,
        year,
        runtime,
        user: await searchUser.save(),
      },
    });
    if(!searchMovieId) return {msg:'the movie has not been found'}
    return { msg: "the movie has been updated successfully" };

  } catch (error) {
    console.error(error);
    return { msg: "Movie don´t updating" };
  }
};

/**
 * Delete Movie
 * @param {ObjectId} id
 * @returns {Json} msg message
 */
export const deleteMovieService = async (id) => {
  try {
    const movie = await Movie.deleteOne({ _id: id });
    if(movie.deletedCount < 1) return {msg:'the movie has not been found'}
    return { msg: "Movie deleted successfully" };
  } catch (error) {
    console.error(error);
    return { msg: "Movie don´t deleting" };
  }
};
