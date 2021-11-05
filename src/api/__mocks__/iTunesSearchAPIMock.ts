const iTunesSearchAPIMock = async (
  query: iTunesSearchQueryParams
): Promise<iTunesSearchResult[]> => {
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  console.log(queryString);
  return [];
};

export default iTunesSearchAPIMock;
