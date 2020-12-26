import { Text } from "components/text/text"
import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { IReceipt } from "types/receipt"

interface Props {
  data: IReceipt
  onPress(): void
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  imgContainer: {
    width: 100,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    flex: 3,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  txtContainer: { flex: 7, marginHorizontal: 10 },
})
export const ReceiptCard: React.FC<Props> = ({ data, onPress }) => {
  const imgUri = data?.images[data?.images?.length - 1]
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: imgUri }} style={styles.img} />
      </View>
      <View style={styles.txtContainer}>
        <Text>{data?.location}</Text>
        <Text>{data?.total}</Text>
        <Text style={{ marginTop: 50 }}>{data?.date}</Text>
      </View>
    </TouchableOpacity>
  )
}
;``
