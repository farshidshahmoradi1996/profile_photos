import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import { Button, Header, ImagePicker } from "components"

import AddForm from "./addForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { IReceipt } from "types/receipt"
type FormData = {
  date: string
  total: string
  location: string
}
interface Props {
  onClose(): void
  onAdd(any: IReceipt): void
}
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    flex: 8,
  },
  btnContainer: {
    flex: 1,
    minHeight: 40,
    marginHorizontal: "5%",
    justifyContent: "center",
  },
})

const schema = yup.object().shape({
  date: yup.string().required(),
  total: yup.string().required(),
  location: yup.string().required(),
})
export const AddReceiptModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [showImagePicker, setShowImagePicker] = useState(true)
  const [photos, setPhotos] = useState()

  const { control, errors, handleSubmit } = useForm<FormData>({
    mode: "all",
    resolver: yupResolver(schema),
  })
  const _onAdd = (_form: FormData) => {
    onAdd({ ..._form, images: photos })
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header backButton onBackButtonPress={onClose} />
        </View>
        <View style={styles.formContainer}>
          {photos && (
            <AddForm
              images={photos}
              control={control}
              errors={errors}
              onPreviewImages={() => {}}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <Button text="Upload" onPress={handleSubmit(_onAdd)} />
        </View>
      </View>
      {showImagePicker && (
        <ImagePicker
          onClose={onClose}
          multiple
          onImagesSelect={(_images) => {
            setPhotos(_images)
            setShowImagePicker(false)
          }}
        />
      )}
    </>
  )
}
