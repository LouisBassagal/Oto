import AnimeThemeTile from "@/components/AnimeThemeTile";
import PlaylistTile from "@/components/PlaylistTile";
import { animeThemesService } from "@/services/animethemes";
import { useAnimeStore } from "@/store/animeStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { AnimeTheme } from "@/types/animeThemesTypes";
import { PlaylistTheme } from "@/types/playlist";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeThemesSelector() {
    const [openings, setOpenings] = useState<AnimeTheme[]>([]);
    const [endings, setEndings] = useState<AnimeTheme[]>([]);
    const [themeToAdd, setThemeToAdd] = useState<AnimeTheme | null>(null);
    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false);
    const [isOpeningsLoading, setIsOpeningsLoading] = useState<boolean>(true);
    const [isEndingsLoading, setIsEndingsLoading] = useState<boolean>(true);
    const [isLongPress, setIsLongPress] = useState<boolean>(false);
    const anime = useAnimeStore(state => state.selectedAnime)!;
    const playlists = usePlaylistStore(state => state.playlists);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await animeThemesService.getAnimeThemesByAnimeId(anime.id);
            const openings = response.filter((theme) => theme.type === "OP");
            setIsOpeningsLoading(false);
            const endings = response.filter((theme) => theme.type === "ED");
            setIsEndingsLoading(false);
            setOpenings(openings);
            setEndings(endings);
        };

        fetchThemes();
    }, [])

    const onLongPressTheme = (theme: AnimeTheme) => {
        setIsPlaylistModalVisible(true);
        setThemeToAdd(theme);
        console.log("Long pressed theme:", theme);
    }

    const onRegisterThemeToPlaylist = (theme: AnimeTheme | null, playlistId: string) => {
        // Convert AnimeTheme to PlaylistTheme
        if (!theme) return;

        const playlistTheme: PlaylistTheme = {
            id: theme.id.toString(),
            basename: theme.animethemeentries[0]?.videos.nodes[0]?.basename || "",
            songTitle: theme.song.title,
            animeTitle: anime.title.romaji,
            cover: anime.coverImage.extraLarge,
            color: anime.coverImage.color,
            type: theme.type
        }
        usePlaylistStore.getState().addThemeToPlaylist(playlistId, playlistTheme);
    }

    return (
        <SafeAreaView style={{  backgroundColor: '#0e1111', flex: 1, display: 'flex' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Image banner with black gradient for style */}
                <View>
                    <Image source={{ uri: anime.bannerImage }} style={{ width: "100%", height: 200 }} />
                    <LinearGradient colors={['transparent', '#0e1111']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }} />
                </View>

                {/* Anime profile with stylized cover picture */}
                <View style={{ 
                    marginTop: -100, marginBottom: 16,
                }}>
                    <View style={{
                        width: 150, height: 250, borderRadius: 12,
                        overflow: 'hidden', display: "flex", alignSelf: "center",
                    }}>
                        <Image source={{ uri: anime.coverImage.extraLarge }} style={{ width: "100%", height: "100%", resizeMode: 'cover' }} />
                    </View>
                    <Text style={{ 
                        color: anime.coverImage.color, fontSize: 24, marginTop: 8, textAlign: 'center'
                    }} className="font-poppins-bold">
                        {anime.title.romaji }
                    </Text>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Ionicons name="language-outline" size={24} color={anime.coverImage.color} />
                        <Text style={{ color: 'white', marginLeft: 8 }}>{anime.title.native}</Text>
                        <Text style={{ color: 'white', marginLeft: 8 }}>{anime.title.english}</Text>
                    </View>

                    {/* Anime Description */}
                    <View style={{ padding: 16 }}>
                        <Text style={{ color: 'white', textAlign: 'auto' }} numberOfLines={6}>
                            {anime.description ? anime.description.replace(/<[^>]+>/g, '') : 'No description available.'}
                        </Text>
                    </View>
                </View>

                {/* Anime Themes Selector */}
                <View style={{ flex: 1, gap: 24, marginBottom: 32 }}>
                    <View>
                        <Text style={{ color: anime.coverImage.color, fontSize: 20, marginLeft: 16, marginBottom: 8 }} className="font-poppins-bold">
                            Openings ({openings.length})
                        </Text>

                        {
                            isOpeningsLoading ?
                                <ActivityIndicator 
                                    size="large" 
                                    color={anime.coverImage.color}
                                    className="my-6"
                                />
                            :
                            <FlatList
                                data={openings}
                                renderItem={({ item }) => <AnimeThemeTile
                                    variant="small" theme={item} color={anime.coverImage.color}
                                    isLongPress={isLongPress} onLongPress={() => { onLongPressTheme(item)}}
                                    setIsLongPress={setIsLongPress}
                                />}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                className="overflow-visible"
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: 16, gap: 10 }}
                            />
                        }
                    </View>

                    <View>
                        <Text style={{ color: anime.coverImage.color, fontSize: 20, marginLeft: 16, marginBottom: 8 }} className="font-poppins-bold">
                            Endings ({endings.length})
                        </Text>
                        {
                            isEndingsLoading ?
                                <ActivityIndicator 
                                    size="large" 
                                    color={anime.coverImage.color}
                                    className="my-6"
                                />
                            :
                                <FlatList
                                    data={endings}
                                    renderItem={({ item }) => <AnimeThemeTile 
                                        variant="small" theme={item} color={anime.coverImage.color} 
                                        isLongPress={isLongPress} onLongPress={() => { onLongPressTheme(item)}} 
                                        setIsLongPress={setIsLongPress}
                                    />}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="overflow-visible"
                                    contentContainerStyle={{ paddingLeft: 16, gap: 10 }}
                                />
                        }
                    </View>
                </View>
            </ScrollView>

            <Modal visible={isPlaylistModalVisible} animationType="fade" transparent={true}>
                <SafeAreaView className="flex-1 flex-col justify-between px-2 py-5 bg-[#0e1111]/90">
                    <Text className="text-white mb-2 text-2xl">Playlist</Text>

                    <FlatList
                        className="mb-2"
                        data={playlists}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <PlaylistTile 
                                playlist={item}
                                onPress={() => {
                                    onRegisterThemeToPlaylist(themeToAdd, item.id);
                                    setIsPlaylistModalVisible(false);
                                }}
                                onLongPress={() => {}}
                                isDeletable={false}
                                onDelete={() => {}}
                            />
                        )}
                    />

                    <View>
                        <TouchableOpacity 
                            className="w-full h-14 bg-red-400/80 rounded-lg items-center justify-center"
                            onPress={() => {
                                setIsPlaylistModalVisible(false);
                            }}    
                        >
                            <Text className="text-white">Close</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}