import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { addNewTodo } from '../store/todosSlice';
import { AppDispatch } from '../store';
import { RootStackParamList } from '../navigation/types';

type AddTodoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTodo'>;

interface Props {
  navigation: AddTodoScreenNavigationProp;
}

const AddTodoScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim().length > 0) {
      dispatch(addNewTodo(title.trim()));
      navigation.goBack();
    } else {
      Alert.alert('Input Required', 'Please enter a title for the todo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What needs to be done?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Buy groceries"
        value={title}
        onChangeText={setTitle}
        autoFocus
        onSubmitEditing={handleAdd}
      />
      <Button title="Add Todo" onPress={handleAdd} />
    </View>
  );
};

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
    fontSize: 18,
  },
});

export default AddTodoScreen;