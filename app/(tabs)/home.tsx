import AnimeTile from "@/src/components/AnimeTile";
import { anilistService } from "@/src/services/anilist";
import { Media } from "@/src/types/anilistTypes";
import { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [popularAnime, setPopularAnime] = useState<Media[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Media[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await anilistService.getPopularAnime(1, 10);
                setPopularAnime(result);
                const trendingResult = await anilistService.getTrendingAnime(1, 10);
                setTrendingAnime(trendingResult);
            } catch (error) {
                Alert.alert("Erreur", "Impossible de récupérer les données");
                console.error(error);
            }
        };

        fetchData();
    }, []);


  return (
    <SafeAreaView
        style={{  backgroundColor: '#0e1111' }}
        className="flex-1 bg-black">
        <ScrollView bounces style={{ flex: 1, flexDirection: 'column' }}>
            <Text className="text-white font-poppins-bold text-4xl w-full items-center justify-center text-center">Welcome to 音</Text>
            <View className="flex flex-col p-4">
                <Text className="text-white text-left text-2xl font-poppins-bold mb-2">Popular anime</Text>
                <FlatList horizontal
                    data={popularAnime}
                    style={{ flexGrow: 0 }}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <AnimeTile media={item} />
                    )}
                />
            </View>

            <View className="flex flex-col h-full p-4">
                <Text className="text-white text-left text-2xl font-poppins-bold mb-2">Trending anime</Text>
                <FlatList horizontal
                    data={trendingAnime}
                    style={{ flexGrow: 0 }}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <AnimeTile media={item} />
                    )}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}