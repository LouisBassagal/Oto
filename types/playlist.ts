export interface PlaylistTheme {
    id: string;
    basename: string;
    songTitle: string;
    animeTitle: string;
    backgroundImageUrl: string;
    type: string;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    themes: PlaylistTheme[];
}