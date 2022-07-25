import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import allColors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {INPUT_FIELD} from '../../components/atoms';
import {Vehicle_Styles as styles} from './my-vehicle-styles';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import Row from '../../components/atoms/row';
import PickerModal from '../../components/molecules/modals/picker-modal';

const MyVehicle = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const [items, setItems] = React.useState([
    '9:30 AM - 10:00 AM',
    '9:30 AM - 11:00 AM',
    '9:20 AM - 10:00 AM',
  ]);
  const [selectedValue, setSelectedValue] =
    React.useState('9:30 AM - 10:00 AM');

  const [payload, setPayload] = React.useState({
    vehical: '',
    registration: '',
    type: '',
    model: '',
    year: '',
    color: '',
    vin: '',
  });
  const {colors} = useTheme();

  const onSigin = async () => {};

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <CustomHeader colors={colors} title="" allowBackBtn />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(16),
          paddingBottom: mvs(30),
        }}>
        <View style={styles.body}>
          <Bold label={'My Vehicle'} style={{fontSize: 24}} />
          <Regular
            label={'Add your vehicle to use our services'}
            style={{fontSize: 18}}
          />
          <View style={styles.input_container}>
            <INPUT_FIELD.InputDropDown
              title={'Vehical'}
              items={['Vehical B', 'Vehical C', 'Vehical A', 'Vehical D']}
              value={payload.vehical}
              onChangeText={t => setPayload({...payload, vehical: t})}
              label="VEHICLE"
              placeholder="Select your vehicle"
            />
            <INPUT_FIELD.InputView
              value={payload.registration}
              onChangeText={t => setPayload({...payload, registration: t})}
              label="REGISTRATION NUMBER"
              placeholder="Enter you Registration"
            />

            <INPUT_FIELD.InputDropDown
              items={['Type B', 'Type C', 'Type A', 'Type D']}
              value={payload.type}
              onChangeText={t => setPayload({...payload, type: t})}
              label="TYPE"
              placeholder="Select Type"
            />

            <INPUT_FIELD.InputDropDown
              items={['Model B', 'Model C', 'Model A', 'Model D']}
              value={payload.model}
              onChangeText={t => setPayload({...payload, model: t})}
              label="VEHICLE MODEL"
              placeholder="Select Model"
            />
            <Row style={{justifyContent: 'space-between'}}>
              <INPUT_FIELD.InputDropDown
                items={['Year B', 'Year C', 'Year A', 'Year D']}
                value={payload.year}
                style={{width: '46%'}}
                onChangeText={t => setPayload({...payload, year: t})}
                label="YEAR"
                placeholder="Select"
              />

              <INPUT_FIELD.InputDropDown
                items={['Color B', 'Color C', 'Color A', 'Color D']}
                value={payload.color}
                style={{width: '46%'}}
                dropdownStyle={{flex: 1}}
                onChangeText={t => setPayload({...payload, color: t})}
                label="COLOR"
                placeholder="Select"
              />
            </Row>
            <INPUT_FIELD.InputView
              value={payload.vin}
              onChangeText={t => setPayload({...payload, vin: t})}
              label="VIN"
              placeholder="Enter VIN number"
            />
          </View>
          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={() => navigation.navigate('Congratulation')}
            textStyle={{...styles.buttonText, color: colors.white}}
            style={{...styles.button}}
            title={'Proceed'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyVehicle;
