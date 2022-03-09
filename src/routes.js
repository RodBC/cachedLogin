import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login } from './Login';
import { Register } from './Register';
import { ViewServer } from './ListServers';
// useEffect(() => {
//   AsyncStorage.getItem('user').then(user => {
//     if (user) {
//       navigation.navigate('ListUrls');
//     }
//   })
// }, []);

const Routes = createAppContainer(
  createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login'
      },
    },
    ViewServers: {
      screen: ViewServer,
      navigationOptions: {
        title: 'Servidores'
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Registro de Servidores'
      }
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#009999',
      },
    },
  })
)
export default Routes;