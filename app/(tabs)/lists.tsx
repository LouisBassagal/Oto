import PlaylistTile from "@/components/PlaylistTile";
import { usePlaylistStore } from "@/store/playlistStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const storedPlaylists = usePlaylistStore((state) => state.playlists);
    const addNewPlaylist = usePlaylistStore((state) => state.addPlaylist);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isDeletable, setIsDeletable] = useState(false);
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
    }, [isDeletable]);

    useEffect(() => {
        if (storedPlaylists.length === 0 && isDeletable) {
            setIsDeletable(false);
        }
    }, [storedPlaylists]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value * 225}deg` }],
    }));

    const onCreatePlaylist = (name: string, description: string) => {
        addNewPlaylist(name, description);
    };

    const onSelectPlaylist = (playlistId: string) => {
        if (isDeletable)
            return;
        console.log("Selected playlist with ID:", playlistId);
    }

    const onDeletePlaylist = (playlistId: string) => {
        usePlaylistStore.getState().removePlaylist(playlistId);
    }

    const onLongPress = () => {
        setIsDeletable(true);
    }

    const closeModal = () => {
        setName("");
        setDescription("");
        setIsModalVisible(false);
    }

    return (
        <SafeAreaView 
            className="h-full w-full bg-[#0e1111] px-5 py-2"
        >
            <Text className="text-white font-poppins text-xl mb-5">Your Playlists</Text>
            {
                storedPlaylists.length > 0 ?
                    <FlatList
                        data={storedPlaylists}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 10}}
                        renderItem={({ item }) => (
                            <PlaylistTile 
                                playlist={item}
                                onSelect={() => onSelectPlaylist(item.id)}
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
                            No lists found. Add a new list by pressing the "+" button.
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
                            setIsModalVisible(true);
                        }
                    }
                }
            >
                <Animated.View style={animatedStyle}>
                    <Ionicons name="add" size={32} color="#0e1111" />
                </Animated.View>
            </Pressable>

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
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
                                closeModal();
                                setIsModalVisible(false);
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
                                closeModal();
                                setIsModalVisible(false);
                            }}
                        >
                            <Text className="font-poppins text-lg text-white">
                                Create
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}