import { Playlist } from "@/types/playlist";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface PlaylistTileProps {
    playlist: Playlist;
    onLongPress: () => void;
    onPress: (playlist: Playlist) => void;
    onDelete: () => void;
    isDeletable?: boolean;
}

export default function PlaylistTile({ playlist, onPress, onLongPress, isDeletable, onDelete }: PlaylistTileProps) {
    const scale = useSharedValue(0);
    const [isDeleteMustHide, setIsDeleteMustHide] = useState(false);

    const handleLongPress = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onLongPress();
    };

    useEffect(() => {
        if (isDeletable) {
            scale.value = withTiming(1, {
                duration: 500,
                easing: Easing.bounce,
            }, (finished) => {
                if (finished) {
                    scheduleOnRN(onAnimationEnd);
                }
            });
        } else {
            setIsDeleteMustHide(true);
            scale.value = withTiming(0, {
                duration: 500,
                easing: Easing.bounce,
            });
        }
    }, [isDeletable]);

    const onAnimationEnd = () => {
        if (!isDeletable) {
            setIsDeleteMustHide(false);
        }
    }

    const getImageGrid = () => {
        if (playlist.themes.length === 0) {
            return null;
        }

        if (playlist.themes.length === 1) {
            return (
                <View className="w-full flex">
                    <Image
                        source={{ uri: playlist.themes[0].cover }}
                        className="w-full h-full"
                    />
                </View>
            );
        }

        if (playlist.themes.length === 2) {
            return (
                <View className="flex-1 w-full flex-row justify-between">
                    <Image
                        source={{ uri: playlist.themes[0].cover }}
                        style={{ width: "50%" }}
                    />
                    <Image
                        source={{ uri: playlist.themes[1].cover }}
                        style={{ width: "50%" }}
                    />
                </View>
            );
        }

        if (playlist.themes.length === 3) {
            return (
                <View className="flex-1 w-full flex-col justify-between">
                    <View className="flex-1 w-full h-50 flex-row">
                        <Image
                            className="w-1/2 h-full"
                            source={{ uri: playlist.themes[0].cover }}
                        />
                        <Image
                            source={{ uri: playlist.themes[1].cover }}
                            className="w-1/2 h-full"
                        />
                    </View>
                    <Image
                        source={{ uri: playlist.themes[2].cover }}
                        className="w-full h-1/2"
                    />
                </View>
            );
        }

        return (
            <View className="flex-1 flex-row flex-wrap justify-between">
                {playlist.themes.slice(0, 4).map((theme, index) => (
                    <Image
                        key={index}
                        source={{ uri: theme.cover }}
                        className="w-1/2 h-1/2"
                    />
                ))}
            </View>
        )
    }

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
            <TouchableOpacity
                onPress={() => onPress(playlist)} 
                onLongPress={handleLongPress}
                className="
                    relative flex flex-col
                    rounded-md p-2 w-1/2
                "
            >
                <View className="size-44 overflow-hidden rounded-md">
                    {
                        getImageGrid()
                    }
                </View>

                <View className="mt-2 mb-4 mx-1 overflow-hidden">
                    <Text className="text-white ">{playlist.name}</Text>
                    <Text className="text-gray-400 mt-1">{playlist.themes.length} theme{playlist.themes.length !== 1 ? 's' : ''}</Text>
                </View>

                {
                    isDeleteMustHide ?
                        <View className="absolute flex justify-center items-baseline h-full top-0 right-0 z-50">
                            <Animated.View style={animatedStyle}>
                                <Pressable
                                    className="flex shrink-0 justify-center items-center top-1 right-1 bg-red-600 rounded-full size-10 p-1"
                                    onPress={() => onDelete()}
                                >
                                    <Ionicons name='trash-bin-outline' size={16} color="white" />
                                </Pressable>
                            </Animated.View>
                        </View>
                    :
                        null
                }
            </TouchableOpacity>
    );
};
