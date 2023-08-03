import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

//service
import { getAllTranscripts, getAllSubjects } from '../../DataService';


function MarkPage() {

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
      <TouchableOpacity onPress={()=>handleItemPress(item._id)}>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' }}>
            <Text style={styles.title}>{item.term}</Text>
            <Text style={styles.title}>{findSubject(item.subject_id)?.idSubject}</Text>
            <Text style={styles.title}>{item.mark}</Text>
          </View>


          <Collapsible collapsed={!isExpanded}>
            <View style={[{ width: '100%', height: '1', backgroundColor: 'white' }]}></View>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }]}>
              <View style={[{}]}>
                <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Kỳ: {item.term}</Text>
                <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Môn: {findSubject(item.subject_id)?.name}</Text>
              </View>
              <View>
                <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>Tín chỉ: {findSubject(item.subject_id)?.credit}</Text>
                <Text style={[{ color: '#FFFFFF', fontSize: 16 }]}>{item.mark>5?"passed":"fail"}</Text>
              </View>
            </View>


          </Collapsible>
        </View>

      </TouchableOpacity>
    );
  };

  const handleItemPress = (itemID) => {
    // Xử lý hành động khi một mục được bấm vào
    // console.log('Pressed item:', itemID);
    setExpandedItem((prevExpandedItem) => (prevExpandedItem === itemID ? null : itemID))
  };

  
  return (
    <View style={styles.container} >
      <View style={{}}>
        <Text style={{
          color: '#FFFFFF',
          fontSize: 24,
          lineHeight: 30,
          letterSpacing: 0.5,
          padding: 10
        }}>
          điểm trung bình: 9.18 {'\n'}
          tín chỉ: 27/97 -
          6 miễn giảm
        </Text>

        <Text style={{
          padding: 10,
          fontSize: 30,
          fontWeight: 'bold',
          color: '#fff',
          lineHeight: 34,
          letterSpacing: 0.5
        }}>
          Thống kê
        </Text>

        <View style={[styles.table, { margin: 10 }]}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn chưa học</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn đạt</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn học lại</Text>
            <Text style={[styles.cell, styles.header, { fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }]}>Tổng môn đang học</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.cell, styles.number]}>22</Text>
            <Text style={[styles.cell, styles.number]}>11</Text>
            <Text style={[styles.cell, styles.number]}>0</Text>
            <Text style={[styles.cell, styles.number]}>0</Text>
          </View>
        </View>

        <View style={[styles.item, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Học kỳ             </Text>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Mã Môn</Text>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>Điểm</Text>
        </View>

      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          scrollEnabled={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212832',
    width: '100%',
    height: '100%',
  },

  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#455A64',
  },
  cell: {
    padding: 10,
    flex: 1,
    color: '#FFFFFF'
  },
  number: {
    textAlign: 'center',
    color: '#FFFFFF'
  },

  item: {
    backgroundColor: '#455A64',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },

});
export default MarkPage;

//data
// Data phai co rieng phan tu de xac dinh Collapsible co collapse hay khong
//khong the chi su dung 1 useState vi no se mo va dong het tat ca cung 1 luc
// thay vao do cho mang data vào useState va dung set de cap nhat gia tri


