import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import WebView from 'react-native-webview'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5
// const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5

export default function Bottomsheet(showModal, url) {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(e => {
      context.value = { y: translateY.value }
    })
    .onUpdate(e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y)
    })
    .onEnd(e => {
      if (translateY.value > -MAX_TRANSLATE_Y) {
        translateY.value = withSpring(SCREEN_HEIGHT)
      }
      if (translateY.value < -MAX_TRANSLATE_Y) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y)
      }
    })

  /**
   * Animated style for the bottom sheet
   */
  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })

  /**
   * Scrolls to a specific destination
   * @param {number} destination - The destination to scroll to
   */
  const scrollTo = (destination) => {
    'worklet'
    translateY.value = withSpring(destination, { damping: 50 })
  }

  useEffect(() => {
    // Initial scroll to show the bottom sheet partially
    scrollTo(-SCREEN_HEIGHT / 3)
  }, [])

  return (
    <>
      {
        showModal === true  && (

          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
              <View style={styles.line} />
              <WebView
                style={styles.containerWeb}
                source={{ uri: url }}
              />
            </Animated.View>
          </GestureDetector>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  bottomsheet_container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: "",
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    zIndex: 12000,
    borderRadius: 25,
    paddingHorizontal: 10
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  containerWeb: {
    flex: 1,
    marginTop: 100,
    backgroundColor: 'white'
  },
})