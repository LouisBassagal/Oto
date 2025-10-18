import { Media } from "../types/anilistTypes";

export class AnilistService {
    private apiUrl: string = "https://graphql.anilist.co/";

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

    async getPopularAnime(page: number = 1, perPage: number = 10) : Promise<Media[]> {
        const query = `
        query($page: Int, $perPage: Int, $mediaSort: [MediaSort]) {
            Page(page: $page, perPage: $perPage) {
                media(sort: $mediaSort) {
                id
                title {
                    english
                    native
                    romaji
                }
                coverImage {
                    extraLarge
                    medium
                    color
                }
                bannerImage
                }
            }
        }`;
        const variables = { page, perPage, mediaSort: "POPULARITY_DESC" };
        const result = await this.makeQuery(query, variables);
        return result.data?.Page?.media as Media[];
    }

    async getTrendingAnime(page: number = 1, perPage: number = 10) : Promise<Media[]> {
        const query = `
        query($page: Int, $perPage: Int, $mediaSort: [MediaSort]) {
            Page(page: $page, perPage: $perPage) {
                media(sort: $mediaSort) {
                id
                title {
                    english
                    native
                    romaji
                }
                coverImage {
                    extraLarge
                    medium
                    color
                }
                bannerImage
                }
            }
        }`;
        const variables = { page, perPage, mediaSort: "TRENDING_DESC" };
        const result = await this.makeQuery(query, variables);
        return result.data?.Page?.media as Media[];
    }
}

export const anilistService = new AnilistService();