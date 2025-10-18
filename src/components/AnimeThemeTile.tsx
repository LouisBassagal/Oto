import { Text, View } from "react-native";
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
    return (
        <View style={{ 
                ...getSize(), backgroundColor: '#0e1111', overflow: 'hidden', display: 'flex', flexDirection: "row",
                shadowColor: color || '#3B82F6', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,    
            }}>
            <View style={{ width: 5, height: "100%", backgroundColor: color, borderRadius: 12 }}></View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text className="font-poppins" style={{
                    color: 'white', fontSize: 16, margin: 8 
                }}>
                    {theme.song.title}
                </Text>
            </View>
        </View>
    );
}