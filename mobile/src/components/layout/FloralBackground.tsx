import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

const floralTopLeft = require('../../../assets/floral/floral-top-left.png');
const floralTopRight = require('../../../assets/floral/floral-top-right.png');
const floralBottomLeft = require('../../../assets/floral/floral-bottom-left.png');
const floralBottomRight = require('../../../assets/floral/floral-bottom-right.png');

const FIGMA_W = 390;

export function FloralBackground() {
  const { width } = useWindowDimensions();
  const s = width / FIGMA_W;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Image
        source={floralTopLeft}
        resizeMode="cover"
        style={[styles.piece, { top: 0, left: 0, width: 200 * s, height: 280 * s }]}
      />
      <Image
        source={floralTopRight}
        resizeMode="cover"
        style={[styles.piece, { top: 0, right: 0, width: 200 * s, height: 280 * s }]}
      />
      <Image
        source={floralBottomLeft}
        resizeMode="cover"
        style={[styles.piece, { bottom: 0, left: 0, width: 180 * s, height: 250 * s }]}
      />
      <Image
        source={floralBottomRight}
        resizeMode="cover"
        style={[styles.piece, { bottom: 0, right: 0, width: 180 * s, height: 250 * s }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    opacity: 0.75,
  },
});
