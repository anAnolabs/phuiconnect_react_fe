import React from 'react';
import { Text, StyleSheet, Platform, TextStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  filled?: boolean;
}

export default function Icon({ name, size = 24, color = COLORS.textSecondary, style, filled = false }: IconProps) {
  if (Platform.OS === 'web') {
    return (
      <Text
        style={[
          styles.webIcon,
          { fontSize: size, color },
          filled && { fontVariationSettings: "'FILL' 1" },
          style,
        ]}
      >
        {name}
      </Text>
    );
  }

  // Fallback for native (using emojis temporarily or react-native-vector-icons in future)
  // For MVP, we will render emojis on Native if Material isn't linked, 
  // but since we focus on web MVP right now, this suffices.
  return <Text style={[{ fontSize: size, color }, style]}>{name}</Text>;
}

const styles = StyleSheet.create({
  webIcon: {
    fontFamily: 'Material Symbols Outlined',
    // @ts-ignore - React Native Web supports this but types don't
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
  } as any,
});
