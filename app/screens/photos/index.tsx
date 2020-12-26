import React, { useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, ReceiptCard, Screen, Text } from "components"
import { IReceipt } from "types/receipt"
import { color } from "theme"

import { AddReceiptModal } from "./addModal"
import Preview from "./preview"

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    marginHorizontal: "10%",
  },
  emptyText: {
    color: color.palette.lightGrey,
    fontSize: 23,
    textAlign: "center",
  },
})
const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      start uploading your receipts and keep track
    </Text>
  </View>
)
export const PhotosScreen = observer(function DemoScreen() {
  const [receipts, setReceipts] = useState<IReceipt[]>([])
  const [addReceiptModalOpen, setAddReceiptModalOpen] = useState<boolean>(false)
  const [previewData, setPreviewData] = useState<IReceipt>(null)

  if (previewData) {
    return <Preview data={previewData} onClose={() => setPreviewData(null)} />
  }
  if (addReceiptModalOpen)
    return (
      <AddReceiptModal
        onClose={() => setAddReceiptModalOpen(false)}
        onAdd={(_item) => {
          setReceipts((prv) => [...prv, { ..._item }])
          setAddReceiptModalOpen(false)
        }}
      />
    )
  return (
    <>
      <Screen preset="fixed">
        <Header
          backButton
          rightBtnText={"Add"}
          onRightPress={() => setAddReceiptModalOpen(true)}
        />
        <View style={styles.formContainer}>
          <FlatList
            data={receipts}
            renderItem={({ item }) => (
              <ReceiptCard data={item} onPress={() => setPreviewData(item)} />
            )}
            ListEmptyComponent={<EmptyList />}
            keyExtractor={({ images }) => images.join()}
          />
        </View>
      </Screen>
    </>
  )
})
