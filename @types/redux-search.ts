interface SearchState extends ThunkDefaultState {
  results: iTunesSearchResult[];
}

type iTunesWrapperType = 'track' | 'collection' | 'artist';

interface iTunesSearchResult {
  wrapperType: iTunesWrapperType; // 'artist';
  kind: string; // 'song';
  artistId: number; // 909253;
  collectionId: number; // 120954021;
  trackId: number; // 120954025;
  artistName: string; // 'Jack Johnson';
  collectionName: string; // 'Sing-a-Longs and Lullabies for the Film Curious George';
  trackName: string; // 'Upside Down';
  collectionCensoredName: string; // 'Sing-a-Longs and Lullabies for the Film Curious George';
  trackCensoredName: string; // 'Upside Down';
  artistViewUrl: string; // 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewArtist?id=909253';
  collectionViewUrl: string; // 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?i=120954025&id=120954021&s=143441';
  trackViewUrl: string; // 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?i=120954025&id=120954021&s=143441';
  previewUrl: string; // 'http://a1099.itunes.apple.com/r10/Music/f9/54/43/mzi.gqvqlvcq.aac.p.m4p';
  artworkUrl60: string; // 'http://a1.itunes.apple.com/r10/Music/3b/6a/33/mzi.qzdqwsel.60x60-50.jpg';
  artworkUrl100: string; // 'http://a1.itunes.apple.com/r10/Music/3b/6a/33/mzi.qzdqwsel.100x100-75.jpg';
  collectionPrice: number; // 10.99;
  trackPrice: number; // 0.99;
  collectionExplicitness: string; // 'notExplicit';
  trackExplicitness: string; // 'notExplicit';
  discCount: number; // 1;
  discNumber: number; // 1;
  trackCount: number; // 14;
  trackNumber: number; // 1;
  trackTimeMillis: number; // 210743;
  country: string; // 'USA';
  currency: string; // 'USD';
  primaryGenreName: string; // 'Rock';
}
