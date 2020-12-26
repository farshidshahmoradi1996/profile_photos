import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Button } from "components"
import { useNavigation } from "@react-navigation/native"
const CONTIANER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const PHOTOSBTN: ViewStyle = {
  marginTop: 20,
}
export const HomeScreen = observer(function DemoScreen() {
  const navigation = useNavigation()

  return (
    <View style={CONTIANER}>
      <Button
        preset="primary"
        text="Profile"
        onPress={() => navigation.navigate("profile")}
      />
      <Button
        preset="primary"
        text="Photos"
        style={PHOTOSBTN}
        onPress={() => navigation.navigate("photos")}
      />
    </View>
  )
})
