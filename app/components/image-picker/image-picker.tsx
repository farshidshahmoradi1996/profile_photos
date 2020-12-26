import FadeInView from "components/fade-in-view/fade-in-view"
import { Header } from "components/header/header"

import React, { useRef, useState } from "react"
import { Alert, ImageBackground, Modal, StyleSheet, View } from "react-native"
import { RNCamera } from "react-native-camera"
import { color } from "theme"

import ImagePickerFooter from "./image-picker-footer"
import ImagePickerGallery from "./image-picker-gallery"
import {
  androidCameraPermissionOptions,
  androidRecordAudioPermissionOptions,
} from "./image-picker-permisions-text"
interface Props {
  onClose(): void
  onImagesSelect(imgs: any): void
  multiple?: boolean
}

const styles = StyleSheet.create({
  modalContainr: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 10,
    justifyContent: "space-between",
  },
  ImageBackground: {
    flex: 1,
  },
})
interface TakePictureResponse {
  width: number
  height: number
  uri: string
  base64?: string
  exif?: { [name: string]: any }
  pictureOrientation: number
  deviceOrientation: number
}

export const ImagePicker: React.FC<Props> = ({
  onClose,
  onImagesSelect,
  multiple = false,
}) => {
  const [frontCamera, setFrontCamera] = useState(false)
  const [takenImage, setTakenImage] = useState<TakePictureResponse | null>(null)
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const RNcameraRef = useRef(null)

  const shut = () =>
    RNcameraRef.current
      .takePictureAsync()
      .then((_e) => {
        setTakenImage(_e)
      })
      .catch(() => {
        Alert.alert("Error in Take Image ")
      })

  return (
    <Modal onRequestClose={onClose} transparent style={styles.modalContainr}>
      <FadeInView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.palette.black,
        }}
      >
        {takenImage ? (
          <ImageBackground
            source={{ uri: takenImage.uri }}
            style={styles.ImageBackground}
          />
        ) : (
          <RNCamera
            ref={RNcameraRef}
            style={{ flex: 1, zIndex: 5 }}
            type={
              frontCamera
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            flashMode={RNCamera.Constants.FlashMode.off}
            useCamera2Api
            androidCameraPermissionOptions={androidCameraPermissionOptions}
            androidRecordAudioPermissionOptions={
              androidRecordAudioPermissionOptions
            }
          />
        )}
        <View style={styles.menuContainer}>
          {showGallery ? (
            <ImagePickerGallery
              onClose={() => setShowGallery(false)}
              multiple={multiple}
              onSelect={(_images) => onImagesSelect(_images)}
            />
          ) : (
            <>
              <Header
                backButton
                onBackButtonPress={onClose}
                rightBtnText="Gallery"
                backButtonColor={color.palette.white}
              />
              <ImagePickerFooter
                takenImage={takenImage}
                onShut={shut}
                onNextCamera={() => setFrontCamera(!frontCamera)}
                onGallery={() => setShowGallery(true)}
                onTakenImageOk={() => onImagesSelect([takenImage.uri])}
                onTakenImageReload={() => setTakenImage(null)}
              />
            </>
          )}
        </View>
      </FadeInView>
      {}
    </Modal>
  )
}
