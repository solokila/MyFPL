import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

//service
import { getAllTranscripts, getAllSubjects } from '../../DataService';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';



function History() {

  //lấy danh sách môn học
  const [subjects, setSubjects] = useState([]);
  const getSubjects = async () => {
    const response = await getAllSubjects();
    if (response?.status === 200) {
      setSubjects(response?.data);
    }
  };

  // tìm tên môn học theo id
  const findSubject = (id) => {
    const subject = subjects.find((item) => {
      return item._id === id;
    });
    // console.log('subject:', subject);
    return subject;
  };

  useEffect(() => {
    getData();
    getSubjects();
  }, []); //get data when first render

  //data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //filter data
  const filterData = (data) => {
    const newData = data.filter((item) => {
      return item.status === 1 || item.status === 2 || item.status === 3;
    });
    setData(newData);
  };

  //get data
  const getData = async () => {
    const response = await getAllTranscripts();
    // console.log('response:', response);
    if (response?.status === 200) {
      filterData(response?.data);
      setLoading(false);
    }
  };

  // State để theo dõi mục đang được mở rộng
  const [expandedItem, setExpandedItem] = useState(null);


  
  const renderItem = ({ item }) => {
    const isExpanded = expandedItem === item._id;
    return (
      <TouchableOpacity onPress={() => handleItemPress(item._id)}>
      <View style={[styles.item, {}]}>
        <View style={[, { flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' }]}>
           <Text style={styles.title}>{item.term}</Text>
           <Text style={styles.title}>{findSubject(item.subject_id).idSubject}</Text>
           <Text style={styles.title}>{item.status}</Text>
         </View>

        <Collapsible collapsed={!isExpanded}>
          <View style={[{ width: '100%', height: '1', backgroundColor: 'white' }]}></View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }]}>
            <View style={[{}]}>
               <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 16 , 
                //giới hạn độ dài của text
                width: 100,
                }}>Môn: {findSubject(item.subject_id).name}</Text>
               <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Điểm: {item.mark}</Text>
             </View>
             <View>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Tín chỉ: {findSubject(item.subject_id).credit}</Text>
              <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Số buổi: 17</Text>
            </View>
           </View>
         </Collapsible>
      </View>
      </TouchableOpacity>
    );
  };


  const handleItemPress = (itemID) => {
    // Xử lý hành động khi một mục được bấm vào
    setExpandedItem((prevExpandedItem) => (prevExpandedItem === itemID ? null : itemID))
  };



  return (
    <View style={styles.container}>

      <View style={styles.containerTop}>
        <Text style={styles.titleTopText}>Học kỳ</Text>
        <Text style={styles.titleTopText}>Mã Môn</Text>
        <Text style={styles.titleTopText}>Trạng thái</Text>
      </View>

      <FlatList
        data={data}
        onRefresh={getData}
        refreshing={loading}
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
    paddingTop: 16,
  },
  containerTop: {
    backgroundColor: '#FED36A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 0,
    marginHorizontal: 0,
    // borderRadius: 10,
    elevation: 5,
  },

  titleTopText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212832',
    flexDirection: 'row'
  },

  item: {
    backgroundColor: '#455A64',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flexDirection: 'row'
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

export default History;



