import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';

//service
import { getAttendanceById, getAllSubjects } from '../../DataService';

//context
import { UserContext } from '../../../users/UserContext';



const AttendanceScreen = (props) => {
  const { navigation } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('20'); // Default selection

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getData();
    getSubjects();
  }, []); //get data when first render

  const getData = async () => {
    const response = await getAttendanceById(user._id);
    // console.log('response:', response);
    if (response?.status === 200) {
      setData(response?.data);
      setLoading(false);
    }
  };

  const getSubjects = async () => {
    const response = await getAllSubjects();
    // console.log('response:', response);
    if (response?.status === 200) {
      setSubjects(response?.data);
    }
  };

  //find subject by id
  const findSubject = (id) => {
    const subject = subjects.find((item) => {
      return item._id === id;
    });
    return subject;
  };



  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const [selectedItem, setSelectedItem] = useState(null);

  const menuOptions = ['2022', '2023'];

  const [text, setText] = useState(menuOptions[menuOptions.length - 1]);

  const handleMenuItemPress = (option) => {
    setSelectedMenuItem(option);
    setShowMenu(false);
    // Fetch new data based on the selected option here if required
    // For simplicity, we're using dummy data.
    setText(option);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={
          () => props.navigation.navigate('AttendanceInfoScreen',
          {
            attendanceData: item,
            subjectName: findSubject(item.subject_id)?.name,
          })
        }
      >
      <View style={styles.itemRow}>
          <View style={styles.itemColumnleft}>
            <Text
             style={styles.classNameText}
             numberOfLines={2}
             >{findSubject(item.subject_id)?.name}</Text>
            {item.Description ? (
              <Text style={styles.itemDescription}>{item.Description}</Text>
            ) : null}
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.missCount}>{item.dateAbsent.length}</Text>
            <Text style={styles.itemSmallText}>Vắng mặt</Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.allCount}>{item.dateAbsent.length+item.datePresent.length}</Text>
            <Text style={styles.itemSmallText}>Tổng số buổi</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMenu = () => {
    return (
      <Modal visible={showMenu} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.menuModal}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.menuOption}
                onPress={() => handleMenuItemPress(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuText}>{text}</Text>
        {/* Render a custom icon for the menu button */}
        <Text style={styles.menuIcon}>{showMenu ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {renderMenu()}

      <FlatList
        data={data}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={getData}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  classNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSmallText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  itemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row', // Arrange the itemColumns horizontally
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Each itemColumn takes equal space
  },
  itemColumnleft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2, // Each itemColumn takes equal space
  },
  itemDescription: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  missCount: {
    color: '#FF5252', // Red color for MissUntilNow count
    fontSize: 18,
    fontWeight: 'bold',
  },
  allCount: {
    color: '#00FF66',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    color: '#FED36A',
    fontSize: 18,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',

  },
  menuButton: {
    alignSelf: 'center',
    paddingVertical: 20, // Increase this value to make the button taller
    paddingHorizontal: 30, // Increase this value to make the button wider
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#FED36A',
    borderWidth: 2,
    flexDirection: 'row', // To align text and icon horizontally
    alignItems: 'center', // To center items vertically
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5, // Add some space between the text and icon
  },
  menuIcon: {
    color: '#FED36A',
    fontSize: 18,
  },
  menuModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  menuOption: {
    paddingVertical: 5,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    color: '#FFFFFF',
    // fontWeight: 'bold',
    fontSize: 14,
  },
});


