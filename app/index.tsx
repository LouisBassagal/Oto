import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
        }}
        >
        <Text style={{
            color: "white",
            fontSize: 24,
            marginBottom: 20,
        }}>Bienvenue sur OTO</Text>

        <TouchableOpacity
            style={{
            backgroundColor: "#3B82F6",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
            }}
            onPress={() => router.push("/(tabs)/home")}
        >
            <Text style={{
            color: "white",
            fontWeight: "500",
            }}>Entrer dans l&apos;app</Text>
        </TouchableOpacity>
    </View>
  );
}