import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { FadeInView, Icon } from "components"
import { color } from "theme"
const hitSlop = { bottom: 10, right: 10, top: 10, left: 10 }

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: color.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    width: 45,
    height: 45,
    zIndex: 20,
  },
})
const EditProfileButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      hitSlop={hitSlop}
      onPress={() => console.warn("xdsd")}
      {...props}
    >
      <Icon name="camera" color={color.primary} />
    </TouchableOpacity>
  )
}

export default EditProfileButton
