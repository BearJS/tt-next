const iTunesSearchAPI = async (
  query: iTunesSearchQueryParams
): Promise<iTunesSearchResult[]> => {
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  const response = await fetch(`https://itunes.apple.com/search?${queryString}`);

  const {results} = await response.json();

  return results;
};

export default iTunesSearchAPI;
