import React, { useState } from 'react';
import { View, TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import styles from './styles';
import { SmallText } from '../text';
import { AppColors } from '../../utils/colors';

interface TextFInputProps {
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderColor?: string;
  inputProps?: TextInputProps;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  label?: string;
  inputContainer?: StyleProp<ViewStyle>;
  onChange: (text: string) => void;
  value: string;
}

const TextFInput: React.FC<TextFInputProps> = ({
  inputStyle = {},
  containerStyle = {},
  placeholder,
  placeholderColor = AppColors.white,
  inputProps,
  keyboardType = 'default',
  onSubmitEditing,
  returnKeyType = 'default',
  secureTextEntry = false,
  label,
  inputContainer,
  onChange,
  value
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={[styles.container1, containerStyle]}>
      {label && (
        <SmallText size={3.5} fontWeight='bold' color={AppColors.black}>
          {label}
        </SmallText>
      )}
      <View style={[styles.inputContainer1, { borderColor: !focus ? AppColors.white : AppColors.primary }, inputContainer]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[styles.input, inputStyle]}
          onChangeText={onChange}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          blurOnSubmit={false}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          {...inputProps}
        />
      </View>
    </View>
  );
};

export default TextFInput;
