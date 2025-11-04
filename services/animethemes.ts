import { AnimeTheme } from "../types/animeThemesTypes";

export class AnimeThemesService {
    private apiUrl: string = "https://graphql.animethemes.moe/";

    async makeQuery(query: string, variables: Object = {}) : Promise<any> {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, variables }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async getAnimeThemesByAnimeId(animeId: number): Promise<AnimeTheme[]> {
        try {
            const query = `
                query($id: [Int!]) {
                    findAnimeByExternalSite(site: ANILIST, id: $id) {
                        animethemes {
                            id
                            type
                            song {
                                title
                            }
                            animethemeentries {
                                videos {
                                    nodes {
                                        id
                                        basename
                                    }   
                                }
                            }
                        }
                    }
                } `;
            const variables = { id: animeId };
            const result = await this.makeQuery(query, variables);
            const resultAnime = result.data?.findAnimeByExternalSite[0]?.animethemes || [];
            return resultAnime as AnimeTheme[];
        } catch (error) {
            console.error("Error fetching anime themes:", error);
            return [];
        }
    }
}

export const animeThemesService = new AnimeThemesService();