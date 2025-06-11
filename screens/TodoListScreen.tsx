import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Ionicons } from '@expo/vector-icons';

import TodoItem from '../components/TodoItem';
import { RootStackParamList } from '../navigation/types';
import { RootState, AppDispatch } from '../store';
import { toggleExistingTodo, deleteExistingTodo, setFilter } from '../store/todosSlice';
import { Todo } from '../types';

// FILTERING LOGIC
const selectFilteredTodos = createSelector(
  (state: RootState) => state.todos.items,
  (state: RootState) => state.todos.filterStatus,
  (items, filterStatus) => {
    switch(filterStatus) {
      case 'active':
        return items.filter(todo => !todo.completed);
      case 'completed':
        return items.filter(todo => todo.completed);
      default:
        return items;
    }
  }
);

const FilterButton: React.FC <{
  title: string;
  onPress: () => void;
  isActive: boolean;
}> = ({ title, onPress, isActive }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterButton, isActive && styles.activeFilterButton]}
  >
    <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
)

type TodoListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TodoList'>;

interface Props {
  navigation: TodoListScreenNavigationProp;
}

const TodoListScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch: AppDispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector((state: RootState) => state.todos.filterStatus);

  const handleToggleComplete = (item: Todo) => {
    dispatch(toggleExistingTodo(item));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExistingTodo(id));
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
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Ionicons name="options" size={26} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      <View style={styles.filterContainer}>
        <FilterButton
          title="All"
          isActive={currentFilter === 'all'}
          onPress={() => dispatch(setFilter('all'))}
        />
        <FilterButton
          title="Active"
          isActive={currentFilter === 'active'}
          onPress={() => dispatch(setFilter('active'))}
        />
        <FilterButton
          title="Completed"
          isActive={currentFilter === 'completed'}
          onPress={() => dispatch(setFilter('completed'))}
        />
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={({ item }) => (
          <TodoItem
          item={item}
          onToggleComplete={() => handleToggleComplete(item)}
          onDelete={() => handleDelete(item.id)}
          onNavigateToEdit={navigateToEditScreen}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyListText}>No todos yet. Add some!</Text>}
      />

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodo')}
          style={styles.addButtonContainer}
        >
          <Text style={styles.addButtonText}>NEW TODO</Text>
        </TouchableOpacity>
      </View>

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
  addButtonContainer:{
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#268dfc',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
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
    color: '#ffffff',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeFilterButton: {
    backgroundColor: '#268dfc',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#268dfc',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  settingsButton: {
    marginLeft: 15,
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#e7e7e7',
  }
})
