import { useEffect } from "react"
import { BackHandler } from "react-native"

export const useBackHandler = (onBackPress) => {
  useEffect(() => {
    const backListener = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    )
    return () => {
      backListener.remove()
    }
  }, [onBackPress])
}
