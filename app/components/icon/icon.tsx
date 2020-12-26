import * as React from "react"

import { IconProps } from "./icon.props"

import RNVIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { color } from "theme"

export function Icon(props: IconProps) {
  const { style, name, color: colorProp = color.dim, size = 25 } = props

  return <RNVIcon name={name} size={size} color={colorProp} style={style} />
}
