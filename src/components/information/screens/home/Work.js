import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const Work = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => handleItemPress(item)} />
  );

  const handleItemPress = item => {
    console.log('Pressed item:', item.name);
    navigation.navigate('WorkStack');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    paddingTop: 12,
  },
  item: {
    backgroundColor: '#455A64',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 16,
    color: '#B8B8B8',
    marginTop: 6,
  },
  time: {
    fontSize: 16,
    color: '#B8B8B8',
    marginTop: 10,
  },
});

export default Work;

const data = [
  {
    id: '1',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: lientt',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '2',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '3',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '4',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '5',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '6',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: ' 20/10/2021 10:00',
  },
  {
    id: '7',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
  {
    id: '8',
    title: 'P.CTSV THÔNG BÁO NHẬN THÀNH CÔNG BHYT ĐỢT 02 - T6/2023',
    name: 'Người đăng: nhuntq20',
    time: 'Thời gian: 20/10/2021 10:00',
  },
];