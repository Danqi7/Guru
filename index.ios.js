//flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  AppRegistry,
  Alert,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Linking
} from 'react-native';

// import LoginPage from './LoginPage';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';

// import Icon from 'react-native-vector-icons/FontAwesome';

const API_ENDPOINT = 'http://localhost:8080/api/users';
const AWS_ENDPOINT = 'https://i6as5jqiud.execute-api.us-east-2.amazonaws.com/prod/users/';

class Guru extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = {
      fetched: false,
      user: null,
    };
     AsyncStorage.setItem("id", "8Vc4ZVe-ej");
    // get user by userID from db
    AsyncStorage.getItem("id", (err, result) => {
      if (err || !result) {
        console.log("err", err);
        console.log("result", result);
        this.setState({
          fetched: true,
        });
      } else {
        fetch(AWS_ENDPOINT + result)
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((responseJson) => {
            if (!responseJson) {
              this.setState({
                fetched: true,
              });
            }
            console.log('user: ', responseJson);
            this.setState({
              fetched: true,
              user: JSON.parse(responseJson),
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  render() {
     return (
       <Navigator
         style={styles.container}
         initialRoute={{
           title: 'Welcome Page',
           authProviders: [
             'linkedin-web'
           ]
         }}
         renderScene={(route, navigator) => {
           if (route.user) {
             return <HomePage user={route.user} showModal={true} />;
           }
           if (!this.state.fetched) {
             return <LoadingPage />;
           }
           const page = this.state.user ?
             <HomePage user={this.state.user} showModal={false} />
             : <LoadingPage />
            return page;

         }}
       />
     );
   }
}

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'rgba(31, 126, 226, 1)',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  navigationBarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  navigationBarText: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  rocket: {
    marginTop: 13,
    marginLeft: 5,
  },

  text: {
     color: 'black',
     backgroundColor: 'white',
     fontSize: 30
   },
   container: {
     flex: 1
   },
   content: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     marginRight: 10,
     marginLeft: 10
   },
   buttonText: {
     color: '#fff',
     fontSize: 18,
     alignSelf: 'center'
   },
   button: {
     height: 36,
     flexDirection: 'row',
     borderRadius: 8,
     marginBottom: 10,
     justifyContent: 'center'
   },
   pic: {
     width: 100,
     height: 100
   },
   mono: {
     fontFamily: 'Menlo',
     paddingTop: 10
   },
   scroll: {
     marginTop: 0,
     paddingTop: 0,
     backgroundColor: '#f2f2f2',
     borderColor: '#888',
     borderWidth: 1,
     marginBottom: 10,
     padding: 10,
     flexDirection: 'row'
   },
   header: {
     fontWeight: 'bold',
     marginBottom: 10,
     marginTop: 10,
     fontSize: 16
   },
   loading: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   'google-web': {
     backgroundColor: '#ccc'
   },
   facebook: {
     backgroundColor: '#3b5998'
   },
   twitter: {
     backgroundColor: '#48BBEC'
   },
   instagram: {
     backgroundColor: '#3F729B'
   },
   tumblr: {
     backgroundColor: '#36465D'
   },
   'linkedin-web': {
     backgroundColor: '#0077B5'
   }
});

AppRegistry.registerComponent('Guru', () => Guru);
