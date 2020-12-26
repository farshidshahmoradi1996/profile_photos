import { Text } from "components/text/text"
import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  View,
} from "react-native"
import { color } from "theme"

interface Props extends TouchableOpacityProps {
  uri: any
  selected: number
}
const styles = StyleSheet.create({
  container: {
    width: "28%",
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.palette.white,
    margin: 10,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  numberContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 999,
    minHeight: 30,
    minWidth: 30,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
})
const ImagePickerGalleryItem: React.FC<Props> = ({
  uri,
  selected,
  ...rest
}) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image
        source={{ uri }}
        style={styles.img}
        resizeMethod={"auto"}
        resizeMode={"cover"}
      />
      {selected > 0 && (
        <View style={styles.numberContainer}>
          <Text>{selected}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default ImagePickerGalleryItem
