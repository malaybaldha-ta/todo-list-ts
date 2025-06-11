import 'react-native-gesture-handler';
import  React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { setupDatabaseAsync } from './services/database';
import { fetchTodos } from './store/todosSlice';

import TodoListScreen from './screens/TodoListScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

import { RootStackParamList } from './navigation/types';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const LoadingGate = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
  </View>
)

const App: React.FC = () => {
  useEffect(() => {
    const initializeApp = async () => {
      await setupDatabaseAsync();
      store.dispatch(fetchTodos());
    };

    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ title: 'My Todos' }}
          />
          <Stack.Screen
            name="AddTodo"
            component={AddTodoScreen}
            options={{ title: 'Add New Todo' }}
          />
          <Stack.Screen
            name="EditTodo"
            component={EditTodoScreen}
            options={{ title: 'Edit Todo' }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: 'Task History'}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

