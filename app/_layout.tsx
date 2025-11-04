import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    let fontsLoaded = useFonts({
        // Contents
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,

        // Titles
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home", headerShown: false, orientation: "portrait" }} />
            <Stack.Screen name="player" options={{ headerShown: false, orientation: "landscape" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, orientation: "portrait" }} />
            <Stack.Screen name="anime/[id]" options={{ headerShown: false, orientation: "portrait" }} />
        </Stack>
    );
}
