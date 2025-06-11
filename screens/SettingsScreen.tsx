import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch, clearAll } from '@store';

const SettingsScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all of your todos? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Delete All",
          onPress: () => dispatch(clearAll()),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danger Zone</Text>
      <Text style={styles.description}>
        Clearing all data will permanently remove all of your tasks from this device.
      </Text>
      <Button
        title="Clear All Todos"
        color="#D93F3F"
        onPress={handleClearData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default SettingsScreen;