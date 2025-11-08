export interface PlaylistTheme {
    id: string;
    basename: string;
    songTitle: string;
    animeTitle: string;
    cover: string;
    color: string | undefined;
    type: string;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    themes: PlaylistTheme[];
}