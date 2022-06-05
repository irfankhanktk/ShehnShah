import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Cross, HeartOutline, Map, Minute, Percent, Ratings, Share, StarFill } from '../../assets/common-icons';
import { Bg } from '../../assets/images';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import ServiceCard from '../../components/molecules/service-card';
import ThemeContext from '../../context/theme-context';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import HeadingTitle from './../../components/molecules/heading-title/index';
import LabelValue from './../../components/molecules/label-value-row/index';
import ReviewsRaing from './../../components/molecules/reviews-rating/index';
import Bold from './../../presentation/typography/bold-text';
import colors from './../../services/colors';
import { STYLES as styles } from './style';
import ServiceButton from './../../components/molecules/services-button/index';
import Buttons from '../../components/atoms/Button';
import SemiBold from './../../presentation/typography/semibold-text';
const services = [

  { icon: 'Services', title: 'Services', value: '5 Services' },
  { icon: 'Photos', title: 'Services', value: '% Services' },
  { icon: 'Services', title: '2.5K Reviews', value: '5 Services' },
  { icon: 'Schedule', title: 'Availability', value: 'See Schedule' },
  { icon: 'Discount', title: 'Discounts', value: 'View Promos' },
];
const about = 'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const BusinessProfile = (props) => {
  const { user_info, } = props;
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
  });
  const { showAlert } = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{ height: mvs(210), width: '100%' }}>
            <ImagePlaceholder uri={Bg} containerStyle={{ width: '100%', height: '100%' }} />
            <View style={{ position: 'absolute', left: mvs(20), top: mvs(20) }} >
              <FontAwesome size={mvs(25)} color={colors.white} name='angle-left' />
            </View>
          </View>
          <Row style={{ paddingHorizontal: mvs(16), marginTop: mvs(25) }}>
            <View style={{ width: mvs(109), padding: mvs(21), borderRadius: mvs(23), borderWidth: 0.7, borderColor: colors.GDFDFDF }}>
              <ImagePlaceholder borderRadius={mvs(12)} uri={Bg} containerStyle={{ width: mvs(68), height: mvs(68) }} />
            </View>
            <View style={{ flex: 1, marginLeft: mvs(13) }}>
              <Bold numberOfLines={2} label={'Total Al Safeer Car Wash & Car Service'} size={mvs(20)} />
              <Row style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: mvs(5) }}>
                <Map />
                <Regular color={colors.G9B9B9B} size={mvs(16)} label={'  Sharjah Al nahada road'} />
              </Row>
              <Row justifyContent={'space-between'} style={{ marginTop: mvs(5), }}>
                <HeartOutline />
                <Share />
              </Row>
            </View>
          </Row>
          <View style={{ borderBottomWidth: 0.7, borderColor: colors.GE1E1E1, marginTop: mvs(25), marginBottom: mvs(16), marginHorizontal: mvs(16) }} />
          <Row>
            <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: mvs(18) }}>
              {services.map((item, index) => <ServiceCard middleText={index === 2 ? '4.1' : null} value={index === 2 ? null : item.value} title={item.title} icon={item.icon} div={services.length - 1 !== index} />)}
            </ScrollView>
          </Row>
          <HeadingTitle title='About' />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <Regular numberOfLines={null} label={about?.length > 185 && isMoreBtn ? `${about?.slice(0, 183)} ...` : about} size={mvs(16)} color={colors.B1E1E1E} />
            {isMoreBtn && about?.length > 185 && <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
              <Regular color={colors.primary} label={'Read More'} />
            </TouchableOpacity>}
          </View>
          <HeadingTitle title='Gallery' />
          <View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: mvs(18) }} horizontal>
              {[0, 1, 2, 3].map((ele, index) => <View key={index} style={{ marginRight: mvs(10), height: mvs(158), width: mvs(236) }}>
                <ImagePlaceholder containerStyle={{ height: '100%', width: '100%', borderRadius: mvs(16) }} uri={Bg} />
              </View>)}
            </ScrollView>
          </View>
          <HeadingTitle title='Contact information' />
          <View>
            <LabelValue label={'Address'} value={'05698 Simonis Point'} />
            <LabelValue label={'Website'} value={'www.shehnshah .com'} />
            <LabelValue label={'Phone'} value={'+96 348 4545651'} />
            <LabelValue label={'Email Address'} value={'mail@site.com'} bw={0} />
          </View>
          <HeadingTitle title='Business Hours' />
          <LabelValue label={'Sunday'} value={'Closed'} vColor={colors.RFA3E3E} />
          <LabelValue label={'Monday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <LabelValue label={'Tuesday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <LabelValue label={'Wednesday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <LabelValue label={'Thursday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <LabelValue label={'Friday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <LabelValue bw={0} label={'Satureday'} value={'10:00 AM - 6:00 PM'} vColor={colors.B323232} />
          <HeadingTitle title='Rating & Reviews' />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <Row justifyContent={'space-between'}>
              <Bold color={colors.black} style={{ transform: [{ translateY: -mvs(10) }] }} size={mvs(42)} label={'4.7'} />
              <Ratings width={mvs(230)} />
            </Row>
            <Row>
              <Bold color={colors.black} size={mvs(12)} label={'out of 5'} />
              <Bold color={colors.black} size={mvs(12)} label={'9,555 ratings'} />
            </Row>
          </View>
          <ReviewsRaing />
          <HeadingTitle title='Services' />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <ServiceButton icon='CarWash' title='Car Wash' />
            <ServiceButton icon='Maintenance' title='Maintenance Schedule' />
            <ServiceButton icon='Oil' title='Oil and Filter service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Engine' title='Engine' />
          </View>
          <View style={{ backgroundColor: colors.FBF8F8,flexGrow:1, paddingBottom:mvs(30), }}>
            <HeadingTitle title='Service offering' />
            <View>
              <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: mvs(18) }}>
                {[0, 1, 2, 3, 4].map((ele, index) => (<View style={{ width: mvs(181), marginRight: mvs(7), borderTopRightRadius: mvs(8), borderRadius: mvs(8), overflow: 'hidden' }}>
                  <ImagePlaceholder containerStyle={{ height: mvs(104), width: '100%', }} uri={Bg} />
                  <View style={{ padding: mvs(5), backgroundColor: colors.white }}>
                    <Row alignItems='center'>
                      <Row alignItems='center'>
                        <StarFill height={mvs(13)} width={mvs(13)} />
                        <Regular label={` ${4.9} (${2.3}k)`} />
                      </Row>
                      <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Buttons.ButtonPrimary title='AED 30' textStyle={{ fontSize: mvs(12), color: colors.primary }} style={{ width: mvs(72), borderRadius: mvs(5), height: mvs(21), backgroundColor: `${colors.primary}30` }} />
                      </View>
                    </Row>
                    <Regular color={colors.black} numberOfLines={2} label={'Subtitle or description Subtitle or...'} />
                    <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} />
                    <Row>
                      <Row justifyContent='flex-start'>
                        <Minute />
                        <Regular size={mvs(12)} color={colors.B2E3036} label={' 20 Min'} />
                      </Row>
                      <Row justifyContent='flex-start'>
                        <Percent />
                        <Regular size={mvs(12)} color={colors.B2E3036} label={' Get 20% OFF'} />
                      </Row>
                    </Row>
                  </View>
                </View>))}
              </ScrollView>
            </View>
            <HeadingTitle title='Coupons & Promos' />
            <View>
              <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: mvs(18) }}>
                {[0, 1, 2, 3, 4].map((ele, index) => (<View style={{ width: mvs(134), marginRight: mvs(7), borderTopRightRadius: mvs(8), borderRadius: mvs(8), overflow: 'hidden' }}>
                  <ImagePlaceholder containerStyle={{ height: mvs(91), width: '100%', }} uri={Bg} />
                  <View style={{ padding: mvs(5), backgroundColor: colors.white }}>
                    <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} />
                    <SemiBold color={colors.black} numberOfLines={2} label={'50% OFF Car Wash'} />
                    <Regular size={mvs(11)} color={colors.G5E5E5E} label={'Description...'} />
                    <TouchableOpacity style={{ width: mvs(83),backgroundColor:colors.primary, height: mvs(15), borderRadius: mvs(3),flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                      <Cross/>
                      <Regular label={' Cash Voucher'} style={{ textTransform:'uppercase',fontSize: mvs(8), color: colors.white }} />
                    </TouchableOpacity>
                    <Bold size={mvs(12)} color={colors.black} label={'3.00 AED'}/>
                    {/* <Buttons.ButtonPrimary style={{ width: mvs(83), height: mvs(15), borderRadius: mvs(3), }} title='Cash Voucher' /> */}
                  </View>
                </View>))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchUsers: (user_id) => DIVIY_API.fetchUsers(user_id),
  updatePersonalInfo: (payload, user_id) => DIVIY_API.updatePersonalInfo(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
