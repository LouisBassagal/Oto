export class AnimeThemesService {
    private apiUrl: string = "https://graphql.animethemes.moe/";

    async makeQuery(query: string) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
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

    async searchAnimeByName(name: string) {
        const query = `
        query {
            anime(slug: "${name}") {
                name
                year
            }
        }`;
        return this.makeQuery(query);
    }
}

export const animeService = new AnimeThemesService();