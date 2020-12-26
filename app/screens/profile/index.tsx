import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen } from "components"
import ProfileForm from "./ProfileForm"

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,

    flex: 1,
  },
})

export const ProfileScreen = observer(function DemoScreen() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  return (
    <Screen preset="fixed">
      <Header
        backButton
        rightBtnText={!isEditMode && "Edit"}
        onRightPress={() => setIsEditMode(true)}
      />
      <View style={styles.formContainer}>
        <ProfileForm editMode={isEditMode} onEnd={() => setIsEditMode(false)} />
      </View>
    </Screen>
  )
})
