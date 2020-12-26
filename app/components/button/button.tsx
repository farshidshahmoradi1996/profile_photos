import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
const withhitSlop = { bottom: 10, left: 10, right: 10, top: 10 }
const withouthitSlop = { bottom: 0, left: 0, right: 0, top: 0 }
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <TouchableOpacity
      hitSlop={preset === "icon" ? withhitSlop : withouthitSlop}
      style={viewStyle}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  )
}
