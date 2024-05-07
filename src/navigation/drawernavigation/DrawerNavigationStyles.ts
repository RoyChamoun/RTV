import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  drawerItem: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: 32,
  },
});
