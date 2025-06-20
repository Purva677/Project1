import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

export default function App() {
  const [fruitList, setFruitList] = useState(['Apple', 'Orange']);
  const [newFruit, setNewFruit] = useState('');

  const addFruit = () => {
    if (newFruit.trim() === '') {
      Alert.alert('Error', 'Fruit name cannot be empty');
      return;
    }

    if (fruitList.includes(newFruit.trim())) {
      Alert.alert('Duplicate', 'This fruit already exists');
      return;
    }

    setFruitList([...fruitList, newFruit.trim()]);
    setNewFruit('');
  };

  const deleteFruit = (fruitName) => {
    Alert.alert(
      'Delete Fruit',
      `Are you sure you want to remove ${fruitName}?`,
      [
        { text: 'Cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const updatedList = fruitList.filter((item) => item !== fruitName);
            setFruitList(updatedList);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits Manager App 🍇</Text>

      <FlatList
        data={fruitList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteFruit(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter the fruit name"
          value={newFruit}
          onChangeText={setNewFruit}
          style={styles.input}
        />
        <Button title="Add Fruit" onPress={addFruit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 6,
    marginRight: 10
  }
});
