import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3EA1FF',
  },
  contentContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#3EA1FF',
    padding: 12,
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  loader: {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  error: {
    color: 'red',
    padding: 16,
  },
});

export default styles;
