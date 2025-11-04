interface Media {
    id: number;
    title: {
        english: string | undefined;
        native: string;
        romaji: string;
    };
    coverImage: {
        extraLarge: string;
        medium: string;
        color: string | undefined;
    };
    description: string | undefined;
    bannerImage: string | undefined;
}

export { Media };

