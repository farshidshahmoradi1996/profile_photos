import { Icon } from "components/icon/icon"
import { Text } from "components/text/text"
import React, { useState } from "react"
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
} from "react-native"
import { color, spacing } from "theme"

interface Props extends TextInputProps {
  value: string

  title: string
  style?: ViewStyle
  iconName: string
  error?: string
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: color.palette.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: color.palette.lightGrey,
    fontSize: 14,
  },
})

export const IconInput: React.FC<Props> = ({
  value,
  title,

  iconName,
  style,
  error,
  onChangeText,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  return (
    <View style={{ ...style }}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          ...styles.container,
          borderBottomColor: focus ? color.primary : color.palette.lightGrey,
        }}
      >
        <Icon name={iconName} color={color.palette.black} />
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ paddingVertical: 10, width: "80%" }}
          value={value}
          onChangeText={(_t) => onChangeText(_t)}
          {...rest}
        />
      </View>
      {error && (
        <Text style={{ fontSize: 14, color: color.error }}>{error}</Text>
      )}
    </View>
  )
}
