import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './src/Login'
import RegistrationScreen from './src/Register'
import HomeScreen from './src/Home'
import MyStack from './src/router'
import { MyContextControllerProvider } from './src/store/Index'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <MyContextControllerProvider>
      <PaperProvider>
        <View style={{ flex: 1 }}>
          <MyStack />
        </View>
      </PaperProvider>
    </MyContextControllerProvider>

  )
}

export default App