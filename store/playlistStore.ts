import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Playlist, PlaylistTheme } from '@/types/playlist';

interface PlaylistStore {
    playlists: Playlist[];
    currentPlaylist?: Playlist;
    addPlaylist: (name: string, description: string) => void;
    removePlaylist: (playlistId: string) => void;
    addThemeToPlaylist: (playlistId: string, theme: PlaylistTheme) => void;
    removeThemeFromPlaylist: (playlistId: string, themeId: string) => void;
    renamePlaylist: (playlistId: string, newName: string) => void;

    addCurrentPlaylist: (playlist: Playlist) => void;
    removeCurrentPlaylist: () => void;
}

export const usePlaylistStore = create<PlaylistStore>()(
    persist(
        (set) => ({
            playlists: [],

            addPlaylist: (name: string, description: string) => set((state) => ({
                playlists: [
                    ...state.playlists,
                    {
                        id: uuidv4(),
                        name,
                        description: description,
                        themes: [],
                    },
                ],
            })),

            removePlaylist: (playlistId: string) => set((state) => ({
                playlists: state.playlists.filter((playlist) => playlist.id !== playlistId),
            })),

            addThemeToPlaylist: (playlistId: string, theme: PlaylistTheme) => set((state) => ({
                playlists: state.playlists.map((playlist) =>
                    playlist.id === playlistId
                        ? { 
                            ...playlist, 
                            themes: [...playlist.themes, theme] 
                        } : playlist
                ),
            })),

            removeThemeFromPlaylist: (playlistId: string, themeId: string) => set((state) => ({
                playlists: state.playlists.map((playlist) =>
                    playlist.id === playlistId
                        ? {
                            ...playlist,
                            themes: playlist.themes.filter((theme) => theme.id !== themeId),
                        } : playlist
                ),
            })),
            
            renamePlaylist: (playlistId: string, newName: string) => set((state) => ({
                playlists: state.playlists.map((playlist) => 
                    playlist.id === playlistId
                        ? { 
                            ...playlist, 
                            name: newName 
                        } : playlist
                )
            })),

            addCurrentPlaylist: (playlist: Playlist) => set(() => ({
                currentPlaylist: playlist,
            })),

            removeCurrentPlaylist: () => set(() => ({
                currentPlaylist: undefined,
            })),
        }),
        { 
            name: 'playlist-storage', 
            storage: createJSONStorage(() => AsyncStorage) 
        }
    )
);