import React from "react"
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native"

import { DefaultImageAvatar } from "assets"
import { color } from "theme"
import { FadeInView } from "components"
import EditProfileButton from "./EditProfileButton"
interface Props {
  uri?: string
  editMode?: boolean
  onEditPress(): void
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    borderColor: color.dim,
    borderRadius: 999,
    borderWidth: 1,
    height: 180,
    width: 180,
  },
})

const ProfileImage: React.FC<Props> = ({ uri, editMode, onEditPress }) => {
  return (
    <FadeInView style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={uri ? { uri } : DefaultImageAvatar}
          resizeMode={"cover"}
          resizeMethod={"auto"}
        />
        {editMode && <EditProfileButton onPress={onEditPress} />}
      </View>
    </FadeInView>
  )
}

export default ProfileImage
