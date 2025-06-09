import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { editTodo } from '../store/todosSlice';

type EditTodoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditTodo'>;
type EditTodoScreenRouteProp = RouteProp<RootStackParamList, 'EditTodo'>;

interface Props {
  navigation: EditTodoScreenNavigationProp;
  route: EditTodoScreenRouteProp;
}

const EditTodoScreen: React.FC<Props> = ({ navigation, route }) => {

  const { todo } = route.params;
  const [currentTitle, setCurrentTitle] = useState(todo.title);
  const dispatch: AppDispatch = useDispatch();

  const handleSave = () => {
    if (currentTitle.trim().length > 0) {
      dispatch(
        editTodo({
          id: todo.id,
          title: currentTitle.trim(),
        })
      );
      navigation.goBack();
    } else {
      Alert.alert('Input Required', 'Please enter a title for the todo.');
    }
  };

  return (
      <View style={styles.container}>
      <Text style={styles.label}>Edit Todo Title:</Text>
      <TextInput
          style={styles.input}
          value={currentTitle}
          onChangeText={setCurrentTitle}
          autoFocus
          onSubmitEditing={handleSave}
      />
      <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={handleSave} />
          <View style={{marginVertical: 5}} />
          <Button title="Cancel" onPress={() => navigation.goBack()} color="#FF6347" />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default EditTodoScreen;