import { create } from "zustand";
import { Media } from "@/types/anilistTypes";

interface AnimeStore {
    selectedAnime: Media | null;
    setSelectedAnime: (anime: Media) => void;
}

export const useAnimeStore = create<AnimeStore>((set) => ({
    selectedAnime: null,
    setSelectedAnime: (anime) => set({ selectedAnime: anime }),
}));