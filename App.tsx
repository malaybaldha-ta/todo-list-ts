import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import TodoListScreen from './screens/TodoListScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';
import HistoryScreen from './screens/HistoryScreen';
import { RootStackParamList } from './navigation/types';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const LoadingGate = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
  </View>
)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingGate />} persistor={persistor}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

