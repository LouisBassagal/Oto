import { usePlaylistStore } from "@/store/playlistStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Video, { VideoRef } from "react-native-video";

export default function Player() {
    const params = useLocalSearchParams<{
        basename: string;
    }>();
    const basename: string = params.basename || "";
    const URL = `https://v.animethemes.moe/${basename}`;
    const videoRef = useRef<VideoRef>(null);
    const currentPlaylist = usePlaylistStore((state) => state.currentPlaylist);
    const [playlistIndex, setPlaylistIndex] = useState(0);

    useEffect(() => {
        if (currentPlaylist === undefined)
            return;

        const index = currentPlaylist.themes.findIndex((theme => theme.basename === basename));
        setPlaylistIndex(index);

        videoRef.current?.enterPictureInPicture();
        return () => {
            usePlaylistStore.getState().removeCurrentPlaylist();
        };
    }, []);

    const OnVideoEnd = () => {
        if (currentPlaylist === undefined)
            return;
        const nextIndex = playlistIndex + 1;
        if (nextIndex >= currentPlaylist.themes.length)
            return;

        const nextTheme = currentPlaylist.themes[nextIndex];
        const nextURL = `https://v.animethemes.moe/${nextTheme.basename}`;
        videoRef.current?.seek(0);
        videoRef.current?.setSource({ uri: nextURL });
        setPlaylistIndex(nextIndex);
    }

    const OnPreviousVideo = () => {
        if (currentPlaylist === undefined)
            return;

        const prevIndex = playlistIndex - 1;
        if (prevIndex < 0)
            return;

        const prevTheme = currentPlaylist.themes[prevIndex];
        const prevURL = `https://v.animethemes.moe/${prevTheme.basename}`;
        videoRef.current?.seek(0);
        videoRef.current?.setSource({ uri: prevURL });
        setPlaylistIndex(prevIndex);
    }

    const OnNextVideo = () => {
        if (currentPlaylist === undefined)
            return;

        const nextIndex = playlistIndex + 1;
        if (nextIndex >= currentPlaylist.themes.length)
            return;

        const nextTheme = currentPlaylist.themes[nextIndex];
        const nextURL = `https://v.animethemes.moe/${nextTheme.basename}`;
        videoRef.current?.seek(0);
        videoRef.current?.setSource({ uri: nextURL });
        setPlaylistIndex(nextIndex);
    }

    return (
        <View
            className="flex-1 flex-row bg-black"
        >
            <Video
                ref={videoRef}
                source={{ uri: URL }}
                style={{ flex: 1 }}
                controls
                resizeMode="contain"
                paused={false}
                fullscreen={true}
                onEnd={OnVideoEnd}
            />
        </View>
    );
};