import AnimeTile from "@/components/AnimeTile";
import { anilistService } from "@/services/anilist";
import { Media } from "@/types/anilistTypes";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [popularAnime, setPopularAnime] = useState<Media[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Media[]>([]);
  const [isPopularLoading, setIsPopularLoading] = useState<boolean>(true);
  const [isTrendingLoading, setIsTrendingLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await anilistService.getPopularAnime(1, 10);
                setPopularAnime(result);
                setIsPopularLoading(false);
                const trendingResult = await anilistService.getTrendingAnime(1, 10);
                setTrendingAnime(trendingResult);
                setIsTrendingLoading(false);
            } catch (error) {
                Alert.alert("Erreur", "Impossible de récupérer les données");
                console.error(error);
            }
        };

        fetchData();
    }, []);


  return (
    <SafeAreaView
        style={{  backgroundColor: '#0e1111', flex: 1 }}>
        <ScrollView bounces style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: 32, textAlign: 'center' }}>Welcome to 音</Text>
            <View style={{ flexDirection: 'column', padding: 16 }}>
                <Text style={{ color: 'white', textAlign: 'left', fontFamily: 'Poppins_600SemiBold', fontSize: 24, marginBottom: 8 }}>Popular anime</Text>
                {isPopularLoading ? 
                    <View 
                        className="w-full h-72 justify-center items-center"
                    >
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                :
                    <FlatList horizontal
                        data={popularAnime}
                        style={{ 
                            flexGrow: 0
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                        renderItem={({ item }) => (
                            <AnimeTile media={item} />
                        )}
                    />
                }
            </View>

            <View style={{ flexDirection: 'column', padding: 16 }}>
                <Text style={{ color: 'white', textAlign: 'left', fontFamily: 'Poppins_600SemiBold', fontSize: 24, marginBottom: 8 }}>Trending anime</Text>
                {isTrendingLoading ? 
                    <View 
                        className="w-full h-72 justify-center items-center"
                    >
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                : 
                    <FlatList horizontal
                        data={trendingAnime}
                        style={{ flexGrow: 0 }}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ gap: 10 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <AnimeTile media={item} />
                        )}
                    />
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}