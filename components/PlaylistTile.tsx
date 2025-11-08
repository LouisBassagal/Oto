import { Playlist } from "@/types/playlist";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface PlaylistTileProps {
    playlist: Playlist;
    onSelect: (playlist: Playlist) => void;
    onLongPress: () => void;
    onDelete: () => void;
    isDeletable?: boolean;
}

export default function PlaylistTile({ playlist, onSelect, onLongPress, isDeletable, onDelete }: PlaylistTileProps) {
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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable 
            onPress={() => onSelect(playlist)} 
            onLongPress={handleLongPress}
            className="relative w-full"
        >
            <Text className="text-white h-28 border-white border rounded-md">{playlist.name}</Text>

            {
                isDeleteMustHide ?
                    <View className="absolute flex justify-center items-baseline h-full top-0 right-0">
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
        </Pressable>
    );
};
