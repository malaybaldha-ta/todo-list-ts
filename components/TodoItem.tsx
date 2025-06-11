import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Todo } from '../types';

interface TodoItemProps{
  item: Todo;
  onToggleComplete: (id:string) => void;
  onDelete: (id: string) => void;
  onNavigateToEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggleComplete,
  onDelete,
  onNavigateToEdit
}) => {
  return (
    <TouchableOpacity onPress= {() => onToggleComplete(item.id)} style={[styles.itemBase, item.completed && styles.itemCompleted]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onNavigateToEdit(item)} style={styles.editButton}>
         <Text><MaterialIcons name="edit" size={24} color="blue" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Text><MaterialIcons name="delete-outline" size={24} color="red" /></Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemBase: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    padding: 5,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  itemCompleted:{
    backgroundColor: '#e0e0e0',
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editButton: {
    padding: 10,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  deleteButton: {
    padding: 10,
    paddingHorizontal: 7,
    marginLeft: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
})

export default TodoItem;
