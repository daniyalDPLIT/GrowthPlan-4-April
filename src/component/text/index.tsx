import React from 'react';
import { Pressable, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { width } from '../../utils/dimessions';
import { AppColors } from '../../utils/colors';

interface TextComponentProps extends TextProps {
  children?: React.ReactNode;
  color?: string;
  textStyles?: TextStyle;
  size?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  onPress?: () => void;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  textProps?: TextProps,
  fontWeight?: 'bold' | 'normal'
}

export const LargeText: React.FC<TextComponentProps> = ({
  children = '',
  color = AppColors.black,
  textStyles = {},
  size = 6.5,
  textAlign = 'auto',
  textProps,
  onPress = undefined,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
    },
  });

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <Text style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};

export const MediumText: React.FC<TextComponentProps> = ({
  children = '',
  size = 4.5,
  textAlign,
  color = AppColors.black,
  textStyles,
  textProps,
  onPress = undefined,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontWeight: 'bold'
    },
  });

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <Text style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};

export const SmallText: React.FC<TextComponentProps> = ({
  children = '',
  size = 4,
  textAlign,
  color = AppColors.black,
  textStyles,
  textProps,
  onPress = undefined,
  fontWeight = 'normal'
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontWeight: fontWeight
    },
  });

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <Text style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};

export const UnderLineText: React.FC<TextComponentProps> = ({
  children = '',
  size = 4.5,
  textAlign,
  color = AppColors.black,
  textStyles,
  textProps,
  onPress = undefined,
  textDecorationLine = 'underline',
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      textDecorationLine: textDecorationLine,
    },
  });

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <Text style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};
