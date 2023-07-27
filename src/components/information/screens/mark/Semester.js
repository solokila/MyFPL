import React, { useState } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Collapsible from 'react-native-collapsible';

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const Semester = ({ title, description }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    }

  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
      <View style={[styles.item]}>
        <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Summer 2023</Text>
      </View>
      <Collapsible collapsed={isCollapsed}>
            <Text>{description}</Text>
          </Collapsible>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    paddingTop: 16,
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
  
});

export default Semester;

// const data = [
//   {
//     id: '1',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '2',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '3',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '4',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '5',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '6',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '7',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
//   {
//     id: '8',
//     title: 'Lập trình game',
//     name: 'Điểm trung bình: 9',
//     time: 'Trạng thái: Passed',
//   },
// ];