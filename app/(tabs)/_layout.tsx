import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

function TabIcon({ name, color, focused }: any) {
    return (
        <View
        className={`flex-1 items-center justify-center ${focused ? 'mt-0' : 'mt-1'}`}
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
            tabBarStyle: {
            backgroundColor: "#161d1d",
            opacity: 0.9,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            position: 'absolute',
            width: "100%",
            height: "10%",

            borderRadius: 10,
            borderTopWidth: 0,
            paddingHorizontal: 20,
            },
        }}
        >
            <Tabs.Screen 
                name="home" 
                options={{ 
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon 
                    name={focused ? "home" : "home-outline"}
                    color={color}
                    focused={focused}
                    />
                )}} 
            />
            <Tabs.Screen 
                name="search" 
                options={{ 
                title: "Search",
                
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon 
                    name={focused ? "search" : "search-outline"}
                    color={color}
                    focused={focused}
                    />
                )}}
            />
            <Tabs.Screen 
                name="lists" 
                options={{ 
                title: "My lists",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon 
                    name={focused ? "list" : "list-outline"}
                    color={color}
                    focused={focused}
                    />
                )}}
            />
        </Tabs>
    );
}