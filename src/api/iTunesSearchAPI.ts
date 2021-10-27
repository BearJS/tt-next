export const iTunesSearchByArtistCollectionSong = async (
  query: Record<string, string>
): Promise<iTunesSearchResult[]> => {
  const queryString = new URLSearchParams(query).toString();

  const response = await fetch(`https://itunes.apple.com/search?${queryString}`);
  if (response.status !== 200) {
    throw new Error(`Unable to search: ${response.status}`);
  }

  return response.json();
};
