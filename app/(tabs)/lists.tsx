import PlaylistTile from "@/components/PlaylistTile";
import { usePlaylistStore } from "@/store/playlistStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeInList from "@/components/ThemeInList";
import { Playlist } from "@/types/playlist";
import { router } from "expo-router";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function HomeScreen() {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false);
    const [description, setDescription] = useState("");
    const [isDeletable, setIsDeletable] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
    const storedPlaylists = usePlaylistStore((state) => state.playlists);
    const addNewPlaylist = usePlaylistStore((state) => state.addPlaylist);
    const [name, setName] = useState("");
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (isDeletable) {
            rotation.value = withTiming(1, { 
                duration: 500,
                easing: Easing.bounce
            });
        } else {
            rotation.value = withTiming(0, {
                duration: 500,
                easing: Easing.bounce
            });
        }
    }, [isDeletable, rotation]);

    useEffect(() => {
        if (storedPlaylists.length === 0 && isDeletable) {
            setIsDeletable(false);
        }
    }, [isDeletable, storedPlaylists]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value * 225}deg` }],
    }));

    const onCreatePlaylist = (name: string, description: string) => {
        addNewPlaylist(name, description);
    };

    const onPressPlaylist = (playlist: Playlist) => {
        if (isDeletable)
            return;
        setCurrentPlaylist(playlist);
        setIsPlaylistModalVisible(true);
        console.log("Selected playlist with ID:", playlist.id);
    }

    const onDeletePlaylist = (playlistId: string) => {
        usePlaylistStore.getState().removePlaylist(playlistId);
    }

    const onLongPress = () => {
        setIsDeletable(true);
    }

    const closeAddModal = () => {
        setName("");
        setDescription("");
        setIsAddModalVisible(false);
    }

    const closePlaylistModal = () => {
        setIsPlaylistModalVisible(false);
    }

    const onThemeListPress = (basename: string) => {
        router.push({
            pathname: "/player",
            params: {
                basename
            }
        });
    }

    return (
        <SafeAreaView 
            className="h-full w-full bg-[#0e1111] px-5 py-2"
        >
            <Text className="text-white font-poppins text-xl mb-5">Your Playlists</Text>
            {
                storedPlaylists.length > 0 ?
                    <FlatList
                        className="mb-20"
                        data={storedPlaylists}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <PlaylistTile 
                                playlist={item}
                                onPress={() => onPressPlaylist(item)}
                                onLongPress={onLongPress}
                                isDeletable={isDeletable}
                                onDelete={() => onDeletePlaylist(item.id)}
                            />
                        )}
                    />
                    :
                    <View className="w-full h-full justify-center items-center px-4">
                        <Ionicons name="albums-outline" size={64} color="#555555" />
                        <Text className="font-poppins mt-4 text-center text-gray-500">
                            No lists found. Add a new list by pressing the &quot;+&quot; button.
                        </Text>
                    </View>
            }
            <Pressable
                className="absolute size-16 bottom-28 right-5 bg-white rounded-full items-center justify-center"
                onPress={() => 
                    {
                        if (isDeletable) {
                            setIsDeletable(false);
                        } else {
                            setIsAddModalVisible(true);
                        }
                    }
                }
            >
                <Animated.View style={animatedStyle}>
                    <Ionicons name="add" size={32} color="#0e1111" />
                </Animated.View>
            </Pressable>

            <Modal visible={isAddModalVisible} animationType="fade" transparent={true}>
                <SafeAreaView className="flex-1 flex-col justify-between px-5 py-10 bg-[#0e1111]/90">
                    <Text className="w-full font-poppins text-white text-xl">New Playlist</Text>

                    <View className="flex-1 w-full justify-center gap-5 space-y-4">
                        <View>
                            <Text className="text-white mb-2">
                                Name
                            </Text>
                            <TextInput className="bg-white/90 !text-black border border-white rounded-lg"
                                placeholder="Enter a name for your new playlist."
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholderTextColor={"black"}
                            />
                        </View>

                        <View>
                            <Text className="text-white mb-2">
                                Description
                            </Text>
                            <TextInput className="bg-white/90 !text-black border border-white rounded-lg"
                                placeholder="Enter a description for your new playlist."
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                placeholderTextColor={"black"}
                            />
                        </View>

                    </View>

                    <View className="w-full flex-1 flex-row items-end gap-2">
                        <Pressable
                            className="w-1/2 bg-red-400/80 rounded-lg items-center justify-center p-4 mb-4"
                            onPress={() => {
                                closeAddModal();
                            }}
                        >
                            <Text className="font-poppins text-lg text-white">
                                Cancel
                            </Text>
                        </Pressable>

                        <Pressable
                            className="w-1/2 bg-blue-400/80 rounded-lg items-center justify-center p-4 mb-4"
                            onPress={() => {
                                onCreatePlaylist(name, description);
                                closeAddModal();
                            }}
                        >
                            <Text className="font-poppins text-lg text-white">
                                Create
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal>

            <Modal visible={isPlaylistModalVisible} animationType="fade" transparent={true}>
                <SafeAreaView className="flex-1 flex-col justify-between p-2 bg-[#0e1111]/90">
                    <Text className="text-white mb-2 text-2xl">{currentPlaylist?.name}</Text>

                    <Text className="text-gray-400 text-base mb-5">{currentPlaylist?.description}</Text>

                    <View className="w-full flex flex-row border mb-5 border-gray-400 items-center rounded-full px-2 overflow-hidden">
                        <Ionicons name="search" size={24} color="white" />
                        <TextInput className="bg-transparent" placeholder="Search a song..." placeholderTextColor="gray" />
                    </View>

                    <FlatList
                        className="!h-2/3"
                        data={currentPlaylist?.themes}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ 
                            gap: 10
                        }}
                        renderItem={({ item }) => (
                            <ThemeInList theme={item} onPress={() => {
                                onThemeListPress(item.basename);
                            }} />
                    )}/>

                    <View className="w-full flex-1 flex-row gap-2 mt-5">
                            <Pressable
                                className="w-4/5 h-14 bg-red-400/80 rounded-lg items-center justify-center"
                                onPress={() => {
                                    closePlaylistModal();
                                }}
                            >
                                <Text className="font-poppins text-lg text-white">
                                    Close
                                </Text>
                            </Pressable>

                            <Pressable
                                className="w-1/5 h-14 bg-blue-400/80 rounded-lg items-center justify-center"
                                onPress={() => {
                                    closePlaylistModal();
                                }}
                            >
                                <Ionicons name="pencil" size={24} color="white" />
                            </Pressable>
                        </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}