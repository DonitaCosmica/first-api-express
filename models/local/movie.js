import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const movies = require('../../movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if(genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return false

    movieIndex.splice(movieIndex, 1)
    return true
  }

  static async update({ id, input }) {
    const movieIndex = movies.find(movie => movie.id === id)
    if(movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}