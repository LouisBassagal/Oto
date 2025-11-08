import { useAnimeStore } from "@/store/animeStore";
import { Media } from "@/types/anilistTypes";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface AnimeTileProps {
  media: Media;
  onPress?: (media: Media) => void;
  onFavorite?: (media: Media, isFavorite: boolean) => void;
  variant?: 'small' | 'medium' | 'large';
}

export default function AnimeTile({ 
  media, 
  onPress,
  variant = 'medium' 
}: AnimeTileProps) {

    const getTitle = () => {
        return media.title.romaji || media.title.english || media.title.native;
    };

    const getImageUrl = () => {
        return media.coverImage.extraLarge || media.coverImage.medium;
    };

    const getSize = () => {
        switch (variant) {
        case 'small':
            return { width: 120, height: 200 };
        case 'large':
            return { width: 200, height: 320 };
        default:
            return { width: 160, height: 260 };
        }
    };

    const size = getSize();
    const themeColor = media.coverImage.color || '#3B82F6';

    const handlePress = (media: Media) => {
        useAnimeStore.getState().setSelectedAnime(media);
        router.push(`/anime/${media.id}`);
    };

    return (
        <Pressable
            style={[size, { paddingHorizontal: 8 }]}
            onPress={() => handlePress(media)}
        >
            <View style={{ height: '75%', marginVertical: 8, width: '100%' }}>
                <View 
                    style={{
                        borderRadius: 12,
                        shadowColor: themeColor,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 12,
                        elevation: 12,
                    }}
                >
                    <View 
                        style={{
                            borderRadius: 8,
                            shadowColor: themeColor,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 8,
                        }}
                    >
                        <Image
                            source={{ uri: getImageUrl() }}
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                borderRadius: 8,
                            }}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Title */}
                <View 
                    style={{ 
                        height: '25%', 
                        width: '100%', 
                        flexDirection: 'row', 
                        paddingTop: 8, 
                        gap: 5,
                        alignItems: 'center'
                    }}
                >
                    <View 
                        style={{
                            width: 3,
                            height: '60%',
                            backgroundColor: themeColor,
                            borderRadius: 2
                        }}
                    />
                    <Text 
                        style={{ 
                            color: 'white', 
                            fontFamily: 'Inter_600SemiBold',
                            flex: 1,
                            fontSize: 12 
                        }} 
                        numberOfLines={2}
                    >
                        {getTitle()}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}