import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import TodoItem from '../components/TodoItem';
import { RootStackParamList } from '../navigation/types';
import { RootState, AppDispatch } from '../store';
import { toggleTodo, deleteTodo } from '../store/todosSlice';
import { Todo } from '../types';

type TodoListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TodoList'>;

interface Props {
  navigation: TodoListScreenNavigationProp;
}

const TodoListScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const navigateToEditScreen = (todo: Todo) => {
    navigation.navigate('EditTodo', { todo });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={ styles.historyButton }
        >
          <Text style={styles.historyButtonText}>HISTORY</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      <Button
        title="Add New Todo"
        onPress={() => navigation.navigate('AddTodo')}
      />

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onNavigateToEdit={navigateToEditScreen}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyListText}>No todos yet. Add some!</Text>}
      />
    </View>
  );

};

export default TodoListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 40,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  historyButton: {
    backgroundColor: '#a050eb',
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
  },
  historyButtonText: {
    color: '#ffffff', // Standard iOS blue for a button-like look
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    marginTop: 20,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'grey'
  },
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
    fontSize: 18,
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
  deleteButton: {
    padding: 10,
    paddingHorizontal: 7,
    marginLeft: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  itemBaseEditing: { /* Similar to itemBase, but maybe slightly different padding/look */
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
  editButton: {
    padding: 10,
    // paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 50,
   },
})
