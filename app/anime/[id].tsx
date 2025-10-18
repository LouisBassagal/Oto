import { Media } from "@/src/types/anilistTypes";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function AnimeThemesSelector() {
    const params = useLocalSearchParams<{
        id: string;
        mediaData: string;
    }>();

    const media = JSON.parse(params.mediaData) as Media;
    const anime: Media = media;
    return (
        <SafeAreaView>
            <Image source={{ uri: anime.bannerImage }} style={{ width: "100%", height: 200 }} />
            <View>
                <Text>Anime Themes Selector</Text>
            </View>
        </SafeAreaView>
    );
}