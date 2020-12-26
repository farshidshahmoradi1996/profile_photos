import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import CameraRoll from "@react-native-community/cameraroll"
import ImagePickerGalleryItem from "./image-picker-gallery-item"
import { Header } from "components/header/header"
import { Button } from "components/button/button"
import FadeInView from "components/fade-in-view/fade-in-view"

interface Props {
  onClose(): void
  multiple: boolean
  onSelect(images: any[]): void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  nextBtnContainer: {
    position: "absolute",
    zIndex: 30,
    bottom: 0,
    width: "95%",
    marginHorizontal: "2.5%",
    height: 60,
  },
})
const ImagePickerGallery: React.FC<Props> = ({
  onClose,
  multiple,
  onSelect,
}) => {
  const [photos, setPhotos] = useState<any[]>([])
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [after, setAfter] = useState<any>("")
  useEffect(() => {
    CameraRoll.getPhotos({ first: 20, assetType: "Photos" }).then((_e) => {
      setPhotos(_e.edges)
      setAfter(_e.page_info.end_cursor)
    })
  }, [])

  const loadMorePhotos = () => {
    CameraRoll.getPhotos({ after, first: 20, assetType: "Photos" }).then(
      (_e) => {
        setPhotos((prv) => [...prv, ..._e.edges])
        setAfter(_e.page_info.end_cursor)
      },
    )
  }

  const selectItem = (uri) => {
    if (multiple) {
      setSelectedPhotos((prv) =>
        prv.some((_u) => _u === uri)
          ? prv.filter((_i) => _i !== uri)
          : [...prv, uri],
      )

      return
    }
    onSelect([uri])
  }

  return (
    <View style={styles.container}>
      <Header backButton onBackButtonPress={onClose} />
      <FlatList
        numColumns={3}
        data={photos}
        contentContainerStyle={{
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
        keyExtractor={(item) => item.node.image.uri}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => {
          const uri = item.node.image.uri

          return (
            <ImagePickerGalleryItem
              uri={uri}
              selected={selectedPhotos.findIndex((_i) => _i === uri) + 1}
              onPress={() => selectItem(uri)}
            />
          )
        }}
      />
      {multiple && selectedPhotos?.length > 0 && (
        <FadeInView style={styles.nextBtnContainer}>
          <Button
            preset="primary"
            text="Next"
            onPress={() => onSelect(selectedPhotos)}
          />
        </FadeInView>
      )}
    </View>
  )
}

export default ImagePickerGallery
