import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {
  HeartOutline,
  Map,
  Minute,
  Ratings,
  Share,
} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import PageLoader from '../../components/atoms/page-loader';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import ServiceCard from '../../components/molecules/service-card';
import ThemeContext from '../../context/theme-context';
import Regular from '../../presentation/typography/regular-text';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import HeadingTitle from './../../components/molecules/heading-title/index';
import LabelValue from './../../components/molecules/label-value-row/index';
import ReviewsRaing from './../../components/molecules/reviews-rating/index';
import ServiceOffering from './../../components/service-offering/index';
import Bold from './../../presentation/typography/bold-text';
import colors from './../../services/colors';
import {STYLES as styles} from './style';
import RatingStar from './../../components/molecules/rating-star/index';
import ReviewModal from './../../components/molecules/modals/review-modal';
const services = [
  {icon: 'Services', title: 'Services', value: '5 Services'},
  {icon: 'Photos', title: 'Photos', value: '10+ Photos'},
  {icon: 'Services', title: '2.5K Reviews', value: '5 Services'},
  {icon: 'Schedule', title: 'Availability', value: 'See Schedule'},
  {icon: 'Discount', title: 'Discounts', value: 'View Promos'},
];
const about =
  'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const BusinessProfile = props => {
  const {user_info} = props;
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
  });
  const {showAlert} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(true);
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const ref = React.useRef(null);
  React.useEffect(() => {}, []);
  // if (loading) {
  //   return <View style={{ flex: 1 }}>
  //     <PageLoader />
  //   </View>
  // }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          onScroll={e => {
            console.log('this scrol Value', e?.nativeEvent?.contentOffset?.y);
          }}
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{height: mvs(210), width: '100%'}}>
            <ImagePlaceholder
              uri={Bg}
              containerStyle={{width: '100%', height: '100%'}}
            />
            <TouchableOpacity
              onPress={() => props?.navigation?.goBack()}
              style={{position: 'absolute', left: mvs(20), top: mvs(20)}}>
              <FontAwesome
                size={mvs(25)}
                color={colors.white}
                name="angle-left"
              />
            </TouchableOpacity>
          </View>
          <Row style={{paddingHorizontal: mvs(16), marginTop: mvs(25)}}>
            <View
              style={{
                padding: mvs(10),
                borderRadius: mvs(23),
                borderWidth: 0.7,
                borderColor: colors.GDFDFDF,
              }}>
              <ImagePlaceholder
                borderRadius={mvs(12)}
                uri={Bg}
                containerStyle={{width: mvs(55), height: mvs(55)}}
              />
            </View>
            <View style={{flex: 1, marginLeft: mvs(13)}}>
              <Row>
                <Bold
                  numberOfLines={2}
                  style={{flex: 1}}
                  label={'Total Al Safeer Car Wash & Car Service'}
                  size={mvs(20)}
                />
                <Row justifyContent={'space-between'} style={{width: mvs(60)}}>
                  <TouchableOpacity>
                    <Share />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(true);
                    }}>
                    <HeartOutline />
                  </TouchableOpacity>
                </Row>
              </Row>
              <Row alignItems="flex-end">
                <Row
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Map />
                  <Regular
                    color={colors.G9B9B9B}
                    size={mvs(16)}
                    label={'  Sharjah Al nahada'}
                  />
                </Row>
                <Row style={{width: mvs(80), alignItems: 'flex-end'}}>
                  <Minute />
                  <Bold
                    style={{
                      lineHeight: mvs(15),
                      transform: [{translateY: mvs(2)}],
                    }}
                    color={colors.B323232}
                    size={mvs(15)}
                    label={' 5.4 KM'}
                  />
                </Row>
              </Row>
            </View>
          </Row>
          <View
            style={{
              borderBottomWidth: 0.7,
              borderColor: colors.GE1E1E1,
              marginTop: mvs(25),
              marginBottom: mvs(16),
              marginHorizontal: mvs(16),
            }}
          />
          <Row>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}>
              {services.map((item, index) => (
                <ServiceCard
                  onPress={() => {
                    let y = 1307;
                    if (index === 1) {
                      y = 133;
                    } else if (index === 2) {
                      y = 968;
                    } else if (index === 3) {
                      y = 699;
                    } else if (index === 4) {
                      y = 0;
                    }
                    ref?.current?.scrollTo({x: 0, y: y, animated: true});
                  }}
                  middleText={index === 0 ? '4.1' : null}
                  value={index === 2 ? null : item.value}
                  title={item.title}
                  icon={item.icon}
                  div={services.length - 1 !== index}
                />
              ))}
            </ScrollView>
          </Row>
          <HeadingTitle title="About" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <Regular
              numberOfLines={null}
              label={
                about?.length > 185 && isMoreBtn
                  ? `${about?.slice(0, 183)} ...`
                  : about
              }
              size={mvs(16)}
              color={colors.B1E1E1E}
            />
            {isMoreBtn && about?.length > 185 && (
              <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                <Regular color={colors.primary} label={'Read More'} />
              </TouchableOpacity>
            )}
          </View>
          <HeadingTitle title="Gallery" />
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}
              horizontal>
              {[0, 1, 2, 3].map((ele, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: mvs(10),
                    height: mvs(158),
                    width: mvs(236),
                  }}>
                  <ImagePlaceholder
                    containerStyle={{
                      height: '100%',
                      width: '100%',
                      borderRadius: mvs(16),
                    }}
                    uri={Bg}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <HeadingTitle title="Contact information" />
          <View>
            <LabelValue label={'Address'} value={'05698 Simonis Point'} />
            <LabelValue label={'Website'} value={'www.shehnshah .com'} />
            <LabelValue label={'Phone'} value={'+96 348 4545651'} />
            <LabelValue
              label={'Email Address'}
              value={'mail@site.com'}
              bw={0}
            />
          </View>
          <HeadingTitle title="Business Hours" />
          <LabelValue
            label={'Sunday'}
            value={'Closed'}
            vColor={colors.RFA3E3E}
          />
          <LabelValue
            label={'Monday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <LabelValue
            label={'Tuesday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <LabelValue
            label={'Wednesday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <LabelValue
            label={'Thursday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <LabelValue
            label={'Friday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <LabelValue
            bw={0}
            label={'Satureday'}
            value={'10:00 AM - 6:00 PM'}
            vColor={colors.B323232}
          />
          <HeadingTitle title="Rating & Reviews" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <Row justifyContent={'space-between'}>
              <Bold
                color={colors.black}
                style={{transform: [{translateY: -mvs(10)}]}}
                size={mvs(42)}
                label={'4.7'}
              />
              <Row>
                <View>
                  <RatingStar
                    rate={5}
                    size={mvs(7)}
                    list={[1, 2, 3, 4, 5]}
                    width={mvs(40)}
                    style={{alignSelf: 'flex-end'}}
                  />
                  <RatingStar
                    rate={5}
                    size={mvs(7)}
                    list={[1, 2, 3, 4]}
                    width={mvs(32)}
                    style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                  />
                  <RatingStar
                    rate={5}
                    size={mvs(7)}
                    list={[1, 2, 3]}
                    width={mvs(24)}
                    style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                  />
                  <RatingStar
                    rate={5}
                    size={mvs(7)}
                    list={[1, 2]}
                    width={mvs(16)}
                    style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                  />
                  <RatingStar
                    rate={5}
                    size={mvs(7)}
                    list={[1]}
                    width={mvs(8)}
                    style={{
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end',
                      marginTop: mvs(2.4),
                    }}
                  />
                </View>
                <View style={{paddingLeft: mvs(10)}}>
                  <View
                    style={{
                      height: mvs(4),
                      borderRadius: mvs(5),
                      backgroundColor: colors.primary,
                      width: mvs(183),
                    }}
                  />
                  <View
                    style={{
                      height: mvs(4),
                      borderRadius: mvs(5),
                      marginTop: mvs(5),
                      backgroundColor: colors.primary,
                      width: mvs(36),
                    }}
                  />
                  <View
                    style={{
                      height: mvs(4),
                      borderRadius: mvs(5),
                      marginTop: mvs(5),
                      backgroundColor: colors.primary,
                      width: mvs(16),
                    }}
                  />
                  <View
                    style={{
                      height: mvs(4),
                      borderRadius: mvs(5),
                      marginTop: mvs(5),
                      backgroundColor: colors.primary,
                      width: mvs(2),
                    }}
                  />
                  <View
                    style={{
                      height: mvs(4),
                      borderRadius: mvs(5),
                      marginTop: mvs(5),
                      backgroundColor: colors.primary,
                      width: mvs(2),
                    }}
                  />
                </View>
              </Row>
            </Row>
            <Row>
              <Bold color={colors.black} size={mvs(12)} label={'out of 5'} />
              <Bold
                color={colors.black}
                size={mvs(12)}
                label={'9,555 ratings'}
              />
            </Row>
          </View>
          <ReviewsRaing />
          {/* <HeadingTitle title='Services' />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <ServiceButton icon='CarWash' title='Car Wash' />
            <ServiceButton icon='Maintenance' title='Maintenance Schedule' />
            <ServiceButton icon='Oil' title='Oil and Filter service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Engine' title='Engine' />
          </View> */}
          <View
            style={{
              backgroundColor: colors.FBF8F8,
              flexGrow: 1,
              paddingBottom: mvs(30),
              marginTop: mvs(20),
            }}>
            <HeadingTitle title="Service offering" />
            <ServiceOffering moveTo="ServiceOfferingDetails" />
            {/* <CouponPromo /> */}
          </View>
        </ScrollView>
      </View>
      <ReviewModal
        setVisible={() => setVisible(false)}
        items={images}
        setItems={setImages}
        visible={visible}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchUsers: user_id => DIVIY_API.fetchUsers(user_id),
  updatePersonalInfo: (payload, user_id) =>
    DIVIY_API.updatePersonalInfo(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
