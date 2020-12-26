import { Button, ImagePicker, TextField } from "components"
import { FadeInView } from "components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { spacing } from "theme"
import ProfileImage from "./ProfileImage"
import { useKeyboard } from "hooks"
import { useForm, Controller } from "react-hook-form"
import RNImagePicker from "react-native-image-crop-picker"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
type FormData = {
  username: string
  email: string
}
const schema = yup.object().shape({
  username: yup.string().min(5).max(30).required("you should set user name ."),
  email: yup.string().email().required(),
})
interface Props {
  editMode: boolean
  onEnd(): void
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing[2],
    marginVertical: spacing[2],
    flex: 1,
    justifyContent: "space-between",
  },
})
const ProfileForm: React.FC<Props> = ({ editMode, onEnd }) => {
  const { keyboardShown } = useKeyboard()
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [profileImg, setProfileImg] = useState(null)
  const { control, errors, handleSubmit } = useForm<FormData>({
    mode: "all",
    resolver: yupResolver(schema),
  })
  const showCropper = (_img) => {
    setShowImagePicker(false)

    RNImagePicker.openCropper({
      path: _img,
      width: 300,
      height: 400,
      cropperCircleOverlay: true,
      mediaType: "photo",
      hideBottomControls: true,
      showCropGuidelines: false,
      showCropFrame: false,
      showsSelectedCount: false,
    }).then((image) => {
      setProfileImg(image.path)
    })
  }
  return (
    <>
      <View style={styles.container}>
        <View>
          {!keyboardShown && (
            <ProfileImage
              editMode={editMode}
              uri={profileImg}
              onEditPress={() => setShowImagePicker(true)}
            />
          )}
          <Controller
            control={control}
            name="username"
            defaultValue={""}
            render={({ onChange, onBlur, value }) => (
              <TextField
                onChangeText={(_t) => onChange(_t)}
                editable={editMode}
                onBlur={onBlur}
                value={value}
                placeholder={"User Name"}
                error={errors.username ? errors.username.message : null}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={""}
            name="email"
            render={({ onChange, onBlur, value }) => (
              <TextField
                onChangeText={(_t) => onChange(_t)}
                editable={editMode}
                onBlur={onBlur}
                placeholder={"Email"}
                value={value}
                style={{ marginTop: 20 }}
                error={errors.email ? errors.email.message : null}
              />
            )}
          />
        </View>
        {editMode && (
          <FadeInView>
            <Button text="Save" onPress={handleSubmit(onEnd)} />
          </FadeInView>
        )}
      </View>
      {showImagePicker && (
        <ImagePicker
          onClose={() => setShowImagePicker(false)}
          onImagesSelect={(_img) => showCropper(_img[0])}
        />
      )}
    </>
  )
}

export default ProfileForm
