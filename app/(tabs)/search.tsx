// app/(tabs)/search.tsx - CONTENU SIMPLE
import AnimeTile from "@/components/AnimeTile";
import { anilistService } from "@/services/anilist";
import { Media } from "@/types/anilistTypes";
import { useState } from "react";
import { FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    const [searchAnime, setSearchAnime] = useState<Media[]>([]);

    const handleSearchChange = async (text: string) => {
        const results: Media[] = await anilistService.searchAnimeByName(text);
        setSearchAnime(results);
    }
  return (
    <SafeAreaView style={{ 
        flex: 1, justifyContent: 'center', alignItems: 'center', 
        backgroundColor: '#0e1111', paddingHorizontal: 10, 
        height: '100%', width: '100%'
    }}>
        <TextInput placeholder="Search for anime..." style={{ 
            height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10,
            width: '100%', borderRadius: 5, backgroundColor: '#1e2222', color: '#ffffff'
            }}
            onEndEditing={(e) => {
                handleSearchChange(e.nativeEvent.text);
            }}
        />
        <FlatList
            data={searchAnime}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
            renderItem={({ item }) => (
                <AnimeTile media={item} />
            )}
            style={{ width: '100%' }}
        />
    </SafeAreaView>
  );
}