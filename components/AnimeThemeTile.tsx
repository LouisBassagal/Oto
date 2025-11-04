import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AnimeTheme } from "../types/animeThemesTypes";

interface AnimeThemeTileProps {
    variant: 'small' | 'medium' | 'large';
    theme: AnimeTheme;
    color?: string;
}

export default function AnimeThemeTile({ variant, theme, color }: AnimeThemeTileProps) {
    const getSize = () => {
        switch (variant) {
        case 'small':
            return { width: 140, height: 60 };
        case 'large':
            return { width: 200, height: 320 };
        default:
            return { width: 160, height: 260 };
        }
    };

    const onPress = () => {
        router.push({
            pathname: "/player",
            params: { 
                basename: theme.animethemeentries[0]?.videos.nodes[0]?.basename || "",    
            }
        });
    };

    return (
        <Pressable
             style={{ 
                ...getSize(), backgroundColor: '#0e1111', display: 'flex', flexDirection: "row",
                shadowColor: color, shadowOpacity: 0.8, shadowRadius: 4,
            }}
            className="h-full w-full"
            onPress={() => onPress()}
        >
            <View
                className="w-full h-full flex-1 flex-row bg-[#0e1111]"
                style={{
                        borderRadius: 12,
                        shadowColor: color,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 12,
                        elevation: 12,
                    }}
            >
                <View style={{ width: 5, height: "100%", backgroundColor: color, borderRadius: 12 }}></View>

                <View 
                    className="flex-1 h-full justify-center"
                >
                    <Text className="font-poppins h-full align-middle" style={{
                        color: 'white', fontSize: 16, margin: 8 
                    }}>
                        {theme.song.title}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}