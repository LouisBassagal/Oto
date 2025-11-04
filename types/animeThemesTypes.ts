interface AnimeTheme {
    type: ;
    id: number;
    song: Song;
    animethemeentries: AnimeEntry[];
}

interface AnimeEntry {
    id: number;
    videos: {
        nodes: VideoNode[];
    };
}

interface VideoNode {
    basename: string;
}

interface Song {
    title: string;
}

export { AnimeEntry, AnimeTheme, Song, VideoNode };

