import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import Video, { VideoRef } from "react-native-video";

export default function Player() {
    const params = useLocalSearchParams<{
        basename: string;
    }>();
    const basename: string = params.basename || "";
    const URL = `https://v.animethemes.moe/${basename}`;
    const videoRef = useRef<VideoRef>(null);

    return (
        <Video
            ref={videoRef}
            source={{ uri: URL }}
        />
    );
};