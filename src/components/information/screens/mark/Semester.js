import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';


//service
import { getAllTranscripts, getAllSubjects } from '../../DataService';

const Semester = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  //data
  const [data, setData] = useState([]);
  //lấy danh sách học kỳ
  const [semester, setSemester] = useState([]);
  //selectedText semester
  const [selectedText, setSelectedText] = useState('Summer 2023');



  useEffect(() => {
    getData();
  }, []); //get data when first render

  //get data
  const getData = async () => {
    const response = await getAllTranscripts();
    // console.log('response:', response);
    if (response?.status === 200) {
      setData(response?.data);
      filterSemester(response?.data);
    }
  };

  //lọc dữ liệu danh sách học kỳ từ data không trùng nhau
  const filterSemester = (data) => {
    const uniqueSemesters = [...new Set(data.map(item => item.term))];
    setSemester(uniqueSemesters);
  };

      

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    
    <View style={styles.container}>
      <TouchableOpacity  onPress={toggleExpanded}>
      <View style={[styles.item]}>
        <Text 
        style={{
          color: '#FED36A',
           textAlign: 'center', 
           fontSize: 24, 
           fontWeight: 'bold'
           }}>
          {selectedText}
            </Text>
      </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.dropdown}>
          {/* Sử dụng map để tạo danh sách lựa chọn */}
          {semester.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={
                () => {
                  setSelectedText(item);
                  toggleExpanded();
                }
              }>
                <Text style={styles.option}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
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
  dropdown: {
    backgroundColor: '#455A64',
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 12,
    padding: 10,
  },
  option: {
    color: '#FED36A',
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
  },
  
});

export default Semester;

