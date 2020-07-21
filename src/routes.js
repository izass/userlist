import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AddUser from './pages/addUser'
import Main from './pages/main'

const Routes = createStackNavigator({
  Main,
  AddUser,
})

export default createAppContainer(Routes)
