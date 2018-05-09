export var queryTVMazeAPI = function (query) {
  const url = 'http://api.tvmaze.com/search/shows?q=' + query;
  const result = fetch(url)
  .then((response) => response.json())
  .catch((err) => console.error(err))
  return result;
}