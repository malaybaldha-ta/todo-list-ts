import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import Todo from '@types';

const HistoryItem: React.FC<{item: Todo }> = ({item}) => (
    <View style={styles.historyItem}>
    <Text style={styles.historyItemTitle}>{item.title}</Text>
    {item.completedAt && (
      <Text style={styles.historyItemDate}>
        Completed on: {new Date(item.completedAt).toLocaleString()}
      </Text>
    )}
  </View>
);

const HistoryScreen: React.FC = () => {

  const allTodos = useSelector((state: RootState) => state.todos.items);
  const completedTodos = allTodos
    .filter(todo => todo.completed && todo.completedAt)
    .sort((a, b) => (b.completedAt! - a.completedAt!));

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryItem item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No completed tasks in your history yet.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  listContent: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  historyItemDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'grey',
  }
});

export default HistoryScreen;