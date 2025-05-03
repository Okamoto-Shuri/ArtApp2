import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const getButtonStyles = () => {
    let baseStyle: ViewStyle = {};
    
    // Apply size
    if (size === 'sm') {
      baseStyle = { ...baseStyle, paddingVertical: 8, paddingHorizontal: 16 };
    } else if (size === 'md') {
      baseStyle = { ...baseStyle, paddingVertical: 12, paddingHorizontal: 20 };
    } else if (size === 'lg') {
      baseStyle = { ...baseStyle, paddingVertical: 16, paddingHorizontal: 24 };
    }
    
    // Apply variant
    if (variant === 'primary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: Colors.primary[500],
      };
    } else if (variant === 'secondary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: Colors.secondary[500],
      };
    } else if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary[500],
      };
    } else if (variant === 'ghost') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
      };
    }
    
    // Apply disabled state
    if (disabled || loading) {
      baseStyle = {
        ...baseStyle,
        opacity: 0.6,
      };
    }
    
    // Apply full width
    if (fullWidth) {
      baseStyle = {
        ...baseStyle,
        width: '100%',
      };
    }
    
    return baseStyle;
  };
  
  const getTextStyles = () => {
    let baseStyle: TextStyle = {};
    
    // Apply size
    if (size === 'sm') {
      baseStyle = { ...baseStyle, fontSize: 14 };
    } else if (size === 'md') {
      baseStyle = { ...baseStyle, fontSize: 16 };
    } else if (size === 'lg') {
      baseStyle = { ...baseStyle, fontSize: 18 };
    }
    
    // Apply variant
    if (variant === 'primary' || variant === 'secondary') {
      baseStyle = {
        ...baseStyle,
        color: Colors.white,
      };
    } else if (variant === 'outline' || variant === 'ghost') {
      baseStyle = {
        ...baseStyle,
        color: Colors.primary[500],
      };
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'secondary' ? Colors.white : Colors.primary[500]} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.spacing.sm,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});