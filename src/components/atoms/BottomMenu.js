//core
import React from 'react';
import {
    StyleSheet, TouchableOpacity, View
} from 'react-native';
// import colors from '../../config/colors';
import { mvs } from '../../services/metrices';
import Regular from '../../presentation/typography/regular-text';
// import { getScaleValueFromWidthPer, HP, palette } from "../config";
//exnternal
//internal imports
const BottomMenu =({colors,...props}) => {
  const {
    state: {index, routes},
    navigation,
    descriptors,
    style,
    activeTintColor,
    activeFeaturedTintColor,
  } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        height: mvs(83),
        paddingHorizontal:mvs(22),
        borderTopLeftRadius: mvs(20),
        borderTopRightRadius: mvs(20),
        backgroundColor: colors.card,
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}>
      {routes.map((route, idx) => {
        const {options} = descriptors[route.key];

        const isFocused = index === idx;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon(isFocused, 'white', 10)
            : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              // flex: 1,
              backgroundColor: `transparent`,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.customIcon}>
              {icon}
              <Regular
                label={route.name}
                style={{
                  fontSize: mvs(10),
                  color: colors.headerTitle,
                  color: isFocused ? colors.primary : colors.headerTitle,
                  textAlign: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  customIcon: {
    height: mvs(83),
    // width: mvs(83),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomMenu;
