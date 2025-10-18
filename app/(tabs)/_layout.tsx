import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

// Composant d'icône avec effet glassmorphisme
function GlassTabIcon({ name, color, focused }: any) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        borderWidth: focused ? 1 : 0,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: focused ? "#FFF" : "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      }}
    >
      <Ionicons 
        name={name} 
        size={24} 
        color={color}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          elevation: 0,
          
          // Glassmorphisme intense
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 25, // Bords arrondis
          borderWidth: 0,
          borderColor: "rgba(255, 255, 255, 0.1)",
          
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal: 20,
          
          // Effet de flou et d'ombre
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 25,
        },
        
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 5,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        },
        
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Accueil",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <GlassTabIcon 
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: "Recherche",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <GlassTabIcon 
              name={focused ? "search" : "search-outline"}
              color={color}
              focused={focused}
            />
          ),
        }} 
      />
    </Tabs>
  );
}