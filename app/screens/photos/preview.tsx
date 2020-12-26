import { FadeInView, Header } from "components"
import React from "react"
import { Modal, View, FlatList, Image } from "react-native"

import { IReceipt } from "types/receipt"

interface Props {
  onClose(): void
  data: IReceipt
}

const Preview: React.FC<Props> = ({ data, onClose }) => {
  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header backButton onBackButtonPress={onClose} />
      </View>
      <View style={{ flex: 9 }}>
        <FlatList
          data={data.images}
          keyExtractor={(item) => item}
          centerContent
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                height: 250,
                marginVertical: 20,
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ width: "75%", height: "100%" }}
                resizeMethod={"auto"}
                resizeMode={"cover"}
              />
            </View>
          )}
        />
      </View>
    </FadeInView>
  )
}

export default Preview
