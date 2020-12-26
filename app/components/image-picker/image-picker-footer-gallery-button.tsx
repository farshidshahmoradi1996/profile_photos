import React from "react"
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { color } from "theme"

interface Props extends TouchableOpacityProps {
  uri: any
}
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 35,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: color.palette.lightGrey,
  },
  img: {
    width: "100%",
    height: "100%",
  },
})

const ImagePickerFooterGalleryButton: React.FC<Props> = ({ uri, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image
        source={{ uri }}
        style={styles.img}
        resizeMethod={"auto"}
        resizeMode={"cover"}
      />
    </TouchableOpacity>
  )
}

export default ImagePickerFooterGalleryButton
