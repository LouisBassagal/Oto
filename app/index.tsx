import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import "./../global.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-black"
    >
      <Text className="text-white text-2xl mb-6">Bienvenue sur OTO</Text>
      
      <Pressable 
        className="bg-blue-500 px-6 py-3 rounded-lg"
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text className="text-white font-medium">Entrer dans l'app</Text>
      </Pressable>
    </View>
  );
}