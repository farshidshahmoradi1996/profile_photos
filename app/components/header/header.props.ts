import { ViewStyle, TextStyle } from "react-native"
import { IconTypes } from "../icon/icons"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY BOWSER
   */
  headerTx?: string

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */

  /**
   * What happens when you press the left icon
   */

  /**
   * Icon that should appear on the right
   */
  rightBtnText?: string

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: ViewStyle

  /**
   * Title style overrides.
   */
  titleStyle?: TextStyle

  backButton?: boolean
  onBackButtonPress?(): void
  backButtonColor?: string
}
