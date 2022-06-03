import {number} from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../services/colors';
import fonts from '../../services/fonts';
import {mvs} from '../../services/metrices';
type FcProps = {
  label?: string | number;
  numberOfLines?: number;
  color?: string;
  size?: number ;
  onPress?: () => void;
  style?: object;
  children: any;
};
const Regular: React.FC<FcProps> = ({
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

export default Regular;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    fontSize: mvs(15),
    color: colors.headerTitle, //default color
  },
});
