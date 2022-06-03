import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import fonts from '../../services/fonts'
type FcProps={
  label?: string | number;
  numberOfLines?: number;
  color?: string;
  size?: number ;
  onPress?: () => void;
  style?: object;
  children: any;
  }
const Bold : React.FC<FcProps> = ({
  label,
  numberOfLines = 1,
  size,
  color,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      style={{...styles.label, color: color, fontSize: size, ...style}}>
      {label}
      {children}
    </Text>
  );
};
export default Bold

const styles = StyleSheet.create({
    label:{
        fontFamily:fonts.bold,
    }
});
