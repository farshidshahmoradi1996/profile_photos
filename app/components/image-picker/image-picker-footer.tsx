import React, { useEffect, useState } from "react"
import { PermissionsAndroid, StyleSheet, View } from "react-native"
import ImagePickerShutPicker from "./image-picker-shut-button"
import { Button } from "components/button/button"
import { Icon } from "components/icon/icon"
import { color } from "theme"
import CameraRoll from "@react-native-community/cameraroll"
import ImagePickerFooterGalleryButton from "./image-picker-footer-gallery-button"

interface Props {
  onShut(): void
  onNextCamera(): void
  onGallery(): void
  takenImage?: any
  onTakenImageOk(): void
  onTakenImageReload(): void
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(permission)
  return status === "granted"
}

const ImagePickerFooter: React.FC<Props> = ({
  onNextCamera,
  onShut,
  onGallery,
  takenImage,
  onTakenImageOk,
  onTakenImageReload,
}) => {
  useEffect(() => {
    hasAndroidPermission()
    CameraRoll.getPhotos({ first: 1 }).then((_e) =>
      setLatestPhotoInGallery(_e.edges[0]),
    )
  }, [])
  const [latestPhotoInGallery, setLatestPhotoInGallery] = useState(null)

  return (
    <View style={styles.container}>
      {takenImage ? (
        <>
          <View style={styles.itemContainer}>
            <Button preset={"icon"} onPress={onTakenImageReload}>
              <Icon name="reload" size={30} color={color.palette.white} />
            </Button>
          </View>
          <View style={styles.itemContainer}>
            <Button preset={"icon"} onPress={onTakenImageOk}>
              <Icon name="check" size={30} color={color.palette.white} />
            </Button>
          </View>
        </>
      ) : (
        <>
          <View style={styles.itemContainer}>
            {latestPhotoInGallery ? (
              <ImagePickerFooterGalleryButton
                onPress={onGallery}
                uri={latestPhotoInGallery?.node?.image?.uri}
              />
            ) : (
              <View />
            )}
          </View>
          <View style={styles.itemContainer}>
            <ImagePickerShutPicker onPress={onShut} />
          </View>
          <View style={styles.itemContainer}>
            <Button preset={"icon"} onPress={onNextCamera}>
              <Icon name="camera" size={30} color={color.palette.white} />
            </Button>
          </View>
        </>
      )}
    </View>
  )
}

export default ImagePickerFooter
