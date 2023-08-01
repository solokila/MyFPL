import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

//service
import { getAllNotifications } from '../../DataService';



const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.name}>Tác giả: {item.author}</Text>
      <Text style={styles.time}>{item.date?item.date:"Chưa xác định"}</Text>
    </View>
  </TouchableOpacity>
);

const Study = (props) => {
  const {navigation} = props;


  useEffect(() => {
    getData();
  }, []); //get data when first render


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await getAllNotifications();
    // console.log('response:', response);
    if (response?.status === 200) {
      filterData(response?.data);
      setLoading(false);
    }
  };

  //lọc dữ liệu
  const filterData = (data) => {
    const newData = data.filter((item) => {
      return item.type === 1;
    });
    setData(newData);
  };

  
  const renderItem = ({item}) => (
    <Item item={item} onPress={() => handleItemPress(item)} />
  );

  const handleItemPress = item => {
    // console.log('Pressed item:', item.name);
    navigation.navigate('Detail', {data:item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={getData}
        refreshing={loading}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    paddingTop: 12,
    width: '100%',
    height: '100%',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 14,
    color: '#B8B8B8',
    marginTop: 6,
  },
  time: {
    fontSize: 14,
    color: '#B8B8B8',
    marginTop: 10,
  },
});

export default Study;


