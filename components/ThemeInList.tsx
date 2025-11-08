import { PlaylistTheme } from "@/types/playlist";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ThemeInListProps {
    theme: PlaylistTheme;
    onPress?: () => void;
}


export default function ThemeInList({ theme, onPress }: ThemeInListProps) {

    return (
        <TouchableOpacity className="
                flex flex-row w-full bg-black/90 
                rounded-md p-2 items-center justify-center gap-2
                shadow-lg
            "
            onPress={onPress}
            style={{
                shadowColor: theme.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
            }}
        >
            <Image
                source={{ uri: theme.cover }}
                style={{ width: 80, height: 100 }}
                className="rounded"
            />
            <View className="flex-1 ml-4">
                <Text 
                    className="text-lg font-bold"
                    style={{ color: theme.color || '#fff' }}
                >
                    {theme.animeTitle}
                </Text>
                <Text className="text-gray-400 text-base">
                    {theme.songTitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
}