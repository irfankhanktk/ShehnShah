import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    marginTop: mvs(40),
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
  button: {
    marginTop: mvs(50),
    width: mvs(360),
  },
  termsAndConditionContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: mvs(20),
    paddingHorizontal: mvs(20),
  },
  termsHeadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    paddingTop: mvs(10),
  },
  termsAndConditionLiteText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    paddingVertical: mvs(10),
  },
});
export default styles;
