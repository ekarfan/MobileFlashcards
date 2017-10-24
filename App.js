import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import { Constants } from 'expo';
import { MaterialIcons  } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';

import  { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckNew from './components/DeckNew'
import DeckView from './components/DeckView'
import DecksList from './components/DecksList'
import CardNew from "./components/CardNew";
import Quiz from './components/Quiz'
import { setLocalNotification } from "./utils/helpers"
import { purple, blue, white} from "./utils/colors"


// custom status bar
function FlashCardStatusBar ({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
      const Tabs = TabNavigator({
          DecksList: {
              screen: DecksList,
              navigationOptions: {
                  tabBarLabel: 'Deck List',
              }
          },
          DeckNew: {
              screen: DeckNew,
              navigationOptions: {
                  tabBarLabel: 'New Deck',
              }
          }
      }
      );

      const navOptions = {
          headerTintColor: '#FFF',
          headerStyle: {
              backgroundColor: '#8DC63F'   //'#1485ff'
          }
      }

      const App = StackNavigator({
          Home: {
              screen: Tabs,
              navigationOptions: { ...navOptions, title: 'FlashCards' }
          },
          DeckView: {
              screen: DeckView,
              navigationOptions: navOptions
          },
          CardNew: {
              screen: CardNew,
              navigationOptions: { ...navOptions, title: 'Add Quiz Item' }
          },
          Quiz: {
              screen: Quiz,
              navigationOptions: { ...navOptions, title: 'Quiz' }
          }
      })

    return (
          <Provider store={createStore(reducer, applyMiddleware(ReduxThunk))}>
            <View style={{flex: 1}}>
                <FlashCardStatusBar backgroundColor={purple} barStyle='light-content'/>
                <App/>
            </View>
        </Provider>
    );
  }
}
