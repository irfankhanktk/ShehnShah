//import liraries
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View, Text, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Regular from '../../presentation/typography/regular-text';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {useNavigation, CommonActions, useTheme} from '@react-navigation/native';
import styles from './history.styles';
import moment from 'moment';
const History = props => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(1);
  const [flag, setflag] = useState('completed');

  const {
    user_info,
    categories,
    home_categories,

    fetchSubCategories,
    fetchHomeCategories,
  } = props;

  const renderRequestCard = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card}>
        <ImagePlaceholder uri={item?.image} containerStyle={styles.image} />
        <View
          style={{
            borderRadius: mvs(10),
            paddingHorizontal: mvs(10),
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Regular style={{color: colors.primary}} label={item?.name} />
          <Regular style={{color: colors.border}} label={moment().fromNow()} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <Regular style={{color: colors.text}} label={'Completed'} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{...styles.conntainer, backgroundColor: colors.background}}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={styles.earningContainer}>
        <Text style={styles.earningText}>Total Earnings</Text>
        <Text style={styles.earningText}>$550</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={categories?.data}
          contentContainerStyle={{paddingHorizontal: mvs(22)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRequestCard}
        />
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
