import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Entypo';
import * as SVGS from '../../assets/common-icons';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {INPUT_STYLES} from '../../styles/input';
import {OtpInput} from './../molecules/otp-input/otp-input';
import Buttons from './Button';
import PhoneInput from 'react-native-phone-input'

type IProps = {
  label?: string | number;
  value?: string;
  onChangeText?: (t: string | any) => void;
  placeholder?: string;
  containerStyle?: object;
  secureTextEntry?: boolean;
  editable?: boolean;
  maxLength?: number | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  style?: object;
  children?: any;
  isMatch?: boolean;
  leftIcon: string;
  rightIcon: string;
  ref:any,
  setValue?: (arg: any) => void;
};

const InputSecondary: FC<IProps> = ({
  label = '',
  value = '',
  onChangeText,
  placeholder = 'placeholder',
  containerStyle,
  secureTextEntry,
  maxLength,
  keyboardType,
  style,
  leftIcon='User',
  rightIcon='User',
  editable = true,
}) => {
  const [eye, setEye] = React.useState(true);
  const {colors}: any = useTheme();
  const LIcon = SVGS[leftIcon];
  const RIcon = SVGS[rightIcon];
  return (
    <View style={[{marginBottom: mvs(18)}, containerStyle]}>
      <SemiBold
        label={label}
        style={{color: colors.text, marginBottom: mvs(10)}}
      />
      <View
        style={{
          ...INPUT_STYLES.SECONDARY_INPUT,
          backgroundColor: colors.white,
          ...style,
        }}>
        <LIcon
          name={eye ? 'eye' : 'eye-with-line'}
          color={colors.text}
          size={mvs(20)}
        />
        <TextInput
          editable={editable}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry ? eye : false}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          onChangeText={onChangeText}
          style={{
            color: colors.black,
            padding: mvs(5),
            ...style,
            flex: 1,
            borderLeftWidth: 2,
            borderLeftColor: colors.gray,
            marginLeft: mvs(10),
            paddingLeft: mvs(10),
          }}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setEye(f => !f)}
            style={{
              right: mvs(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={eye ? 'eye' : 'eye-with-line'}
              color={colors.text}
              size={mvs(20)}
            />
          </TouchableOpacity>
        ) : (
          rightIcon?<View
            style={{
              right: mvs(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
           <RIcon
            />
          </View>:null
        )}
      </View>
    </View>
  );
};
const ReviewInput: FC<IProps> = ({
  label = 'Write a Review',
  value = '',
  placeholder = '',
  style,
  containerStyle,
  children,
}) => {
  const {colors}: any = useTheme();
  return (
    <View style={{paddingTop: mvs(15), marginVertical: mvs(15)}}>
      <View style={[INPUT_STYLES.REVIEW_CONTAINER, containerStyle]}>
        {children}
      </View>
      <View style={INPUT_STYLES.REVIEW_LABEL_CONTAINER}>
        <Regular
          label={label}
          style={{fontSize: mvs(14), color: colors.text}}
        />
      </View>
    </View>
  );
};

const CustomOtpInput: FC<IProps> = ({value, setValue, isMatch = true}) => {
  const {colors}: any = useTheme();
  return (
    <View style={{height: mvs(85), marginTop: mvs(28), alignItems: 'center'}}>
      <Regular
        label={'Verification Code'}
        style={{color: colors.primary, marginBottom: mvs(7)}}
      />
      <OtpInput isMatch={isMatch} value={value} setValue={setValue} />
    </View>
  );
};
const PhoneTextInput: FC<IProps> = ({onChangeText, ref, containerStyle}) => {
  return (
    <View
      style={[
        {
          width: '80%',
          backgroundColor: 'red',
          alignSelf: 'center',
          height: mvs(59),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: mvs(15),
          borderRadius: mvs(15),
        },
        containerStyle,
      ]}>
      <PhoneInput
        ref={ref}
        initialCountry={'gb'}
        // initialValue={'92xx xxxxxxx'}
        textProps={{
          placeholder: 'xxxx xxxxxxx',
          placeholderTextColor: 'blue',
        }}
        onChangePhoneNumber={onChangeText}
      />
    </View>
  );
};

const DatePicker: FC<IProps> = ({onChangeText = () => {}, value}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log('date::', date);

    onChangeText(moment(date).format('lll'));
    hideDatePicker();
  };
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Regular label={'Select time'} style={{marginBottom: mvs(10)}} />
      <Buttons.ButtonPrimary
        title={value}
        onClick={() => setDatePickerVisibility(true)}
        style={{height: mvs(38), backgroundColor: colors.secondary}}
        textStyle={{color: colors.primary}}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'datetime'}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // maximumDate={new Date(moment().subtract(18, 'years'))}
        // minimumDate={new Date(moment().subtract(50, 'years'))}
      />
    </View>
  );
};

export const INPUT_FIELD = {
  DatePicker,
  InputSecondary,
  ReviewInput,
  CustomOtpInput,
  PhoneTextInput
};
