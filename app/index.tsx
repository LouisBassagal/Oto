import { Text, View } from "react-native";
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
      <Text className="text-white">Test</Text>
    </View>
  );
}
