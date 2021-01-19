import * as Permissions from 'expo-permissions';

export const getLocationsPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
  } else {
    console.log('Permission to access location was', status);
  }
};
