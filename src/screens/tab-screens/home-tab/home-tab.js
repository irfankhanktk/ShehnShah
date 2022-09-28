import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {BaseURL} from '../../../ApiServices';
import Buttons from '../../../components/atoms/Button';
import {CustomHeader} from '../../../components/molecules/header/header-1x';
import {mvs} from '../../../services/metrices';
import DIVIY_API from '../../../store/api-calls';
import {Home_Styles as styles} from './home-styles';

const Home = props => {
  const [payLoad, setpayLoad] = useState({
    laoding: true,
    data: [],
  });

  const getData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    await fetch(`${BaseURL}auth/all_business`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          console.log('vendor data=====', result);
          setpayLoad({...payLoad, data: result.data.result[0], laoding: false});
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getData();
  }, [payLoad.laoding]);

  return (
    <View style={{...styles.conntainer}}>
      <ScrollView contentContainerStyle={styles.body}>
        {payLoad?.data &&
          payLoad?.data?.map((item, index) => (
            <View style={{marginVertical: mvs(10)}} key={index}>
              <Buttons.ButtonPrimary
                onClick={() =>
                  props?.navigation?.navigate('BusinessProfile', {id: item.id})
                }
                title={item?.title}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Home;
