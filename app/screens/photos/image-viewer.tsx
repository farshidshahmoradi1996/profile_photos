import { Text } from "components"
import React from "react"
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"
import { color } from "theme"

interface Props {
  images: string[]
  onPress(): void
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 200,

    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  numberContainer: {
    position: "absolute",
    bottom: -15,
    right: -15,
    borderRadius: 999,
    elevation: 4,
    backgroundColor: "white",
    zIndex: 10,
    minWidth: 45,
    minHeight: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  number: { fontSize: 24, color: color.primary },
  secondImage: {
    zIndex: 0,
    position: "absolute",
    top: 20,
    borderRadius: 10,
    height: "95%",
    width: "90%",
    marginHorizontal: "5%",
  },
})
const ImageViewer: React.FC<Props> = ({ images, onPress }) => {
  const latestImage = images[images.length - 1]
  const underImage = images.length > 1 ? images[images.length - 2] : null
  console.log(latestImage)
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}
    >
      {underImage && (
        <Image
          source={{ uri: underImage }}
          resizeMode={"cover"}
          resizeMethod={"auto"}
          style={styles.secondImage}
        />
      )}
      <Image
        source={{ uri: latestImage }}
        resizeMode={"cover"}
        resizeMethod={"auto"}
        style={{ zIndex: 55, borderRadius: 10, width: "100%", height: "100%" }}
      />

      <View style={styles.numberContainer}>
        <Text style={styles.number}>{images.length}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ImageViewer
