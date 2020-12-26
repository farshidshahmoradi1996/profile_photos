import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import ImageViewer from "./image-viewer"

import { Controller } from "react-hook-form"

import { IconInput, InputDate } from "components"

interface Props {
  images: string[]
  control: any
  errors: any
  onPreviewImages(): void
}
const styles = StyleSheet.create({
  container: { marginHorizontal: "5%" },
  imagesContainer: { justifyContent: "center", alignItems: "center" },
})

const AddForm: React.FC<Props> = ({
  images,
  control,
  errors,
  onPreviewImages,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.imagesContainer}>
        <ImageViewer images={images} onPress={onPreviewImages} />
      </View>
      <View style={{ marginTop: 50 }}>
        <Controller
          name="date"
          control={control}
          defaultValue={""}
          render={({ onChange, value }) => (
            <InputDate
              onChange={onChange}
              value={value}
              title={"Date of purchese"}
              error={errors?.date ? errors?.date?.message : null}
            />
          )}
        />
        <Controller
          name="total"
          control={control}
          defaultValue={""}
          render={({ onChange, value }) => (
            <IconInput
              style={{ marginTop: 20 }}
              onChangeText={onChange}
              keyboardType="number-pad"
              value={value}
              title={"Total"}
              iconName={"currency-usd"}
              error={errors?.total ? errors?.total?.message : null}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          defaultValue={""}
          render={({ onChange, value }) => (
            <IconInput
              style={{ marginTop: 20 }}
              onChangeText={onChange}
              value={value}
              title={"Location"}
              iconName={"map-marker"}
              error={errors?.location ? errors?.location?.message : null}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}

export default AddForm
