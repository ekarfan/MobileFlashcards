import React, {Component } from 'react';
import * as _ from "lodash";
import {
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { removeDeck } from "../utils/api";
import { deleteReduxDeck} from "../actions/index";
import { styles} from "../utils/styles";
import { NavigationActions } from 'react-navigation';

class DeckView extends Component {

   

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;

        return {
            title
        }
    }

    deleteDeck = ( key ) => {
        // remove deck from localStorage
        this.props.dispatch( deleteReduxDeck( key) );
        removeDeck( key );
        console.log("back");
        //this.props.navigation.goBack();
       
    }

    render() {
        const { deck } = this.props;

        return (
            <View style={{flex: 1}}>
                <View style={styles.deckView}>

                    <MaterialCommunityIcons name='cards' size={100} color='#DBDBDB' />
                    <Text style={styles.headerText}>{deck.title} </Text>
                    <Text style={styles.detailText}>{deck.questions ? `${deck.questions.length} Question(s)` : '0 Questions'}</Text>
                    

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'CardNew',
                            {title: deck.title}
                        )}
                        style={styles.addCardButton}>
                        <Text style={{ fontSize: 20 }}>Add Questions</Text>
                    </TouchableOpacity>

                    { deck.questions.length > 0 &&
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'Quiz',
                                {title: deck.title}
                            )}
                            style={styles.startQuizButton}>
                            <Text style={{ fontSize: 20, color: '#FFF' }}>Start Quiz</Text>
                        </TouchableOpacity>
                    }

                </View>

            </View>
        )
    }
}



function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        deck: _.cloneDeep( state[title] )
    }
}

export default connect(mapStateToProps)(DeckView);
