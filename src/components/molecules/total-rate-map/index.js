import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Map, RightArrow, Total} from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import {mvs} from '../../../services/metrices';
import Row from '../../atoms/row';
import colors from '../../../services/colors';
import Regular from '../../../presentation/typography/regular-text';
import RatingStar from '../rating-star';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const TotalRateMap = ({loading, data,address=''}) => {
  return (
    <Row
      alignItems="center"
      style={{
        height: mvs(96),
        paddingHorizontal: mvs(20),
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        marginTop: mvs(17),
        borderColor: colors.GD8D8D8,
      }}>
      <ShimmerPlaceholder
        style={{width: mvs(100), height: mvs(70)}}
        visible={loading}>
        {data?.businessReviews?.logo ? (
          <Image
            source={{uri:data?.businessReviews?.logo}}
            resizeMode="contain"
            style={{width: mvs(100), height: mvs(100)}}
          />
        ) : (
          <Total />
        )}
      </ShimmerPlaceholder>
      <View
        style={{marginLeft: mvs(15), flex: 1, justifyContent: 'space-between'}}>
        <ShimmerPlaceholder visible={loading}>
          <Bold
            label={data?.businessReviews?.title}
            size={mvs(16)}
            color={colors.black}
          />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <Row justifyContent="flex-start">
            <Map />
            <Regular
              style={{transform: [{translateY: mvs(-3)}]}}
              color={colors.G9B9B9B}
              label={` ${address}`}
            />
          </Row>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <RatingStar width={mvs(84)} rate={5} />
        </ShimmerPlaceholder>
      </View>
      {/* <TouchableOpacity>
                <RightArrow />
            </TouchableOpacity> */}
    </Row>
  );
};
export default TotalRateMap;
