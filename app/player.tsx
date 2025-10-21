import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";
import Video, { VideoRef } from "react-native-video";

export default function Player() {
    const params = useLocalSearchParams<{
        basename: string;
    }>();
    const basename: string = params.basename || "";
    const URL = `https://v.animethemes.moe/${basename}`;
    const videoRef = useRef<VideoRef>(null);

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Video
                ref={videoRef}
                source={{ uri: URL }}
                style={{ flex: 1 }}
                controls
                resizeMode="contain"
                paused={false}
                fullscreen={true}
            />
        </View>
    );
};