'use strict';

//Models DB´s
import Movie from "../models/Movie";
import User from "../models/User";

const normalizeWord = (title) => {
    return title.toLowerCase();
};
export const allMoviesTitle = async (title) => {
    
    const movie = await Movie.findOne(title);
    return movie;
};

export const createMovie = async ({title,year,runtime,token}) => {
    let newTitle = normalizeWord(title)
   try {
    const searchUser = await User.findOne({token});  
    const searchMovie = await Movie.findOne({title:newTitle});
    if(searchMovie) return ({msg:'The movie already exists'}) 
    const newMovie = new Movie({title:newTitle,year,runtime, user: await searchUser.save()});
    const saveMovie = await newMovie.save();
    return saveMovie;
   } catch (error) {
        throw new Error(error);    
   }
};