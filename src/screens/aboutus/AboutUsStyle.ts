import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3EA1FF',
  },
  logoContainer: {
    height: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: -70,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -10,
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descriptionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
  },
});

export default styles;
