import React, { useState } from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text/text"
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"
import { palette } from "theme/palette"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[0],

  borderBottomWidth: 1,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    error = null,
    onBlur = () => {},
    onFocus = () => {},
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const [isFocus, setIsFocus] = useState(false)
  return (
    <>
      <View style={[containerStyle, { borderBottomColor: isFocus ? color.primary : color.dim }]}>
        <TextInput
          onBlur={(e) => {
            setIsFocus(false), onBlur(e)
          }}
          onFocus={(e) => {
            setIsFocus(true), onFocus(e)
          }}
          placeholder={placeholder}
          placeholderTextColor={color.dim}
          underlineColorAndroid={color.transparent}
          style={inputStyle}
          ref={forwardedRef}
          {...rest}
        />
      </View>
      {error && <Text style={{ color: color.error, fontSize: 12 }}>{error}</Text>}
    </>
  )
}
