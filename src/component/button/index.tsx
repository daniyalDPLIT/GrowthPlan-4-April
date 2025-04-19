import React, { useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { SmallText } from '../text';
import styles from './styles';
import { AppColors } from '../../utils/colors';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  withShadow?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  textProps?: object;
  disabled?: boolean;
  buttonTextColor?: string;
  size?: number;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children = 'Button',
  variant = 'primary',
  withShadow = false,
  containerStyle = {},
  textStyle = {},
  textProps = {},
  disabled = false,
  buttonTextColor = AppColors.white,
  size = 4,
  ...touchableOpacityProps
}) => {
  const getStyles = useMemo(() => {
    return {
      container: {
        ...styles.container,
        ...(disabled
          ? styles.disableContainer
          : variant === 'primary'
            ? styles.primaryContainer
            : styles.secondaryContainer),
        ...(withShadow && styles.shadow),
      },
    };
  }, [variant, withShadow, disabled]);

  return (
    <TouchableOpacity
      style={[getStyles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      {...touchableOpacityProps}>
      <SmallText
        color={disabled ? AppColors.black : buttonTextColor}
        textStyles={textStyle}
        textProps={textProps}
        size={size}
      >
        {children}
      </SmallText>
    </TouchableOpacity>
  );
};

export default Button;
