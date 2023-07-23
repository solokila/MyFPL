import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';

const AttendanceScreen = (props) => {
  const { navigation } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('20'); // Default selection
  const [attendanceData, setAttendanceData] = useState([
    // Replace this with your actual attendance data
    {
      id: '1',
      NameClass: 'Math Class',
      MissUntilNow: '5',
      AllCountMiss: '10',
    },
    {
      id: '2',
      NameClass: 'Math Class',
      MissUntilNow: '5',
      AllCountMiss: '10',
    },
    {
      id: '3',
      NameClass: 'Math Class',
      MissUntilNow: '5',
      AllCountMiss: '10',
    },
    // More attendance items here
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const menuOptions = ['2020', '2021', '2022', '2023'];

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
          })
        }
      >
        <Text style={styles.itemText}>NameClass: {item.NameClass}</Text>
        <Text style={styles.itemText}>MissUntilNow: {item.MissUntilNow}</Text>
        <Text style={styles.itemText}>AllCountMiss: {item.AllCountMiss}</Text>
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
      <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.menuText}>{text}</Text>
      </TouchableOpacity>

      {renderMenu()}

      <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',

  },
  menuButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#FED36A',
    borderWidth: 2,
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
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


