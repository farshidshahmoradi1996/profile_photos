import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { HomeScreen, ProfileScreen, PhotosScreen } from "../screens"

export type PrimaryParamList = {
  profile: undefined
  home: undefined
  photos: undefined
}

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="photos" component={PhotosScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
