import { Text } from "components/text/text"
import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { color, spacing } from "theme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Icon } from "components/icon/icon"
interface Props {
  value: string
  onChange(date: string): void
  title: string
  error?: string
}

const getateByTimestamp = (_time) => {
  const date = new Date(_time)
  const todate = date.getDate()
  const tomonth = date.getMonth() + 1
  const toyear = date.getFullYear()

  return `${toyear}/${tomonth}/${todate}`
}

const styles = StyleSheet.create({
  title: {
    color: color.palette.lightGrey,
    fontSize: 14,
  },
  container: {
    borderBottomColor: color.palette.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: spacing[2],
  },
})
export const InputDate: React.FC<Props> = ({
  value,
  onChange,
  title,
  error,
}) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <View>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => setShow(true)}
          activeOpacity={0.8}
          style={styles.container}
        >
          <Icon name="calendar-range" size={25} color={color.palette.black} />
          <Text style={{ paddingHorizontal: 10 }}>{value}</Text>
        </TouchableOpacity>
        {error && (
          <Text style={{ fontSize: 14, color: color.error }}>{error}</Text>
        )}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(e) => {
            if ((e.nativeEvent as any).timestamp)
              onChange(getateByTimestamp((e.nativeEvent as any).timestamp))
            setShow(false)
          }}
        />
      )}
    </>
  )
}
