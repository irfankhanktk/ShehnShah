import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  button: {
    marginTop: mvs(350),
    width: mvs(360),
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});
export default styles;
