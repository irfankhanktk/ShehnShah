import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Buttons from '../../../components/atoms/Button';
import { CustomHeader } from '../../../components/molecules/header/header-1x';
// import HomeCard from './../../../components/molecules/home-card/home-card';
import { mvs } from '../../../services/metrices';
import DIVIY_API from '../../../store/api-calls';
import { Home_Styles as styles } from './home-styles';

const Home = (props) => {






  return (
    <View style={{ ...styles.conntainer}}>
      <View style={styles.body}>
          <Buttons.ButtonPrimary  onClick={()=>props?.navigation?.navigate('BusinessProfile')} title='Business Profile'/>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () =>
    DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: (parent_cat_id) =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
