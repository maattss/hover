import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapStyle: {
    width,
    height,
  },
  textStyle: {
    backgroundColor: 'transparent',
  },
});

export default Styles;
