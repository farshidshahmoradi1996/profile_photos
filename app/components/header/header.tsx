import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { color, spacing } from "../../theme"
import { translate } from "../../i18n/"
import { useNavigation } from "@react-navigation/native"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onRightPress,
    rightBtnText,

    headerText,
    headerTx,
    style,
    titleStyle,
    backButton = false,
    onBackButtonPress,
    backButtonColor = color.dim,
  } = props
  const navigation = useNavigation()
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={{ ...ROOT, ...style }}>
      {backButton && (
        <Button preset="icon" onPress={onBackButtonPress || navigation.goBack}>
          <Icon name="arrow-left" color={backButtonColor} />
        </Button>
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightBtnText ? (
        <Button preset="link" text={rightBtnText} onPress={onRightPress} />
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
