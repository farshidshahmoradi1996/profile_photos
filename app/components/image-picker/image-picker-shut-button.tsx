import React from "react"
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 999,
    width: 75,
    height: 75,
    zIndex: 20,
  },
})
const ImagePickerShutPicker: React.FC<TouchableOpacityProps> = (props) => {
  return <TouchableOpacity style={styles.container} {...props} />
}

export default ImagePickerShutPicker
