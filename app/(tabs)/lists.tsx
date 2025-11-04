import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const [storedLists, setStoredLists] = useState([]);
    const [isStoredListsLoading, setIsStoredListsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getStoredLists = async () => {

        };

        getStoredLists();
    }, []);

    const handleAddPress = () => {
        alert("Add button pressed");
    };

    return (
        <SafeAreaView 
            className="h-full w-full bg-[#0e1111]"
        >
            {
                isStoredListsLoading ? 
                    <View className="w-full h-full justify-center items-center">
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                    :
                    <ScrollView className="w-full h-full">
                    </ScrollView>
            }
            <Pressable
                className="absolute size-16 bottom-28 right-5 bg-white rounded-full items-center justify-center"
                onPress={handleAddPress}
            >
                <Ionicons name="add" size={32} color="#0e1111" />
            </Pressable>
        </SafeAreaView>
    );
}