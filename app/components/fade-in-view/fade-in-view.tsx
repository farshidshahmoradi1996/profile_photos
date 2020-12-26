import React, { useEffect, useRef } from "react"
import { Animated, ViewStyle } from "react-native"

interface Props {
  style?: ViewStyle
  delay?: number
  duration?: number
  scale?: boolean
  swipeUp?: boolean
  swipeUpHeight?: number
}

export const FadeInView: React.FC<Props> = ({ children, style, delay = 0, duration = 200 }) => {
  const animValue = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      delay,
      useNativeDriver: true,
      duration,
    }).start()
  }, [animValue, delay, duration])

  return (
    <Animated.View
      style={{
        ...style,
        opacity: animValue,
      }}
    >
      {children}
    </Animated.View>
  )
}

export default FadeInView
