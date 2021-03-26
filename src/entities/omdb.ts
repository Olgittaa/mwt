export class Rating {
  constructor(
    public Source: string,
    public Value: string) {
  }
}

export class Omdb {
  constructor(
    public Title: string,
    // public Year: string,
    //public  Rated: string,
    public Released: string,
    public Runtime: string,
    public Genre: string,
    public Director: string,
    // public Writer: string,
    public Actors: string,
    public Plot: string,
    // public Language: string,
    public Country: string,
    public Awards: string,
    public Poster: string,
    public Ratings: Rating[],
    public Metascore: string,
    // public imdbRating: string,
    public imdbVotes: string,
    //public  imdbID: string,
    //public  Type: string,
    // public DVD: string,
    public BoxOffice: string,
    public Production: string,
    //public  Website: string
  ) {
  }
}


// {"Title":"A Clockwork Orange"
// "Year":"1971"
// "Rated":"R"
// "Released":"02 Feb 1972"
// "Runtime":"136 min"
// "Genre":"Crime, Drama, Sci-Fi"
// "Director":"Stanley Kubrick"
// "Writer":"Stanley Kubrick (screenplay), Anthony Burgess (novel)"
// "Actors":"Malcolm McDowell, Patrick Magee, Michael Bates, Warren Clarke"
// "Plot":"In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned."
// "Language":"English"
// "Country":"UK, USA"
// "Awards":"Nominated for 4 Oscars. Another 12 wins & 20 nominations."
// "Poster":"https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_SX300.jpg"
// "Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"}
//            {"Source":"Rotten Tomatoes","Value":"86%"}
//            {"Source":"Metacritic","Value":"77/100"}]
// "Metascore":"77"
// "imdbRating":"8.3"
// "imdbVotes":"763,076"
// "imdbID":"tt0066921"
// "Type":"movie"
// "DVD":"15 Aug 2008"
// "BoxOffice":"$26,589,355"
// "Production":"Warner Brothers, Polaris Productions, Hawk Films"
// "Website":"N/A"
// "Response":"True"}
