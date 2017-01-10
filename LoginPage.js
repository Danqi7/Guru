//login
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

// import simpleAuthClient from 'react-native-simple-auth';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

const API_ENDPOINT = 'http://localhost:8080/api/users';
const AWS_ENDPOINT = 'https://i6as5jqiud.execute-api.us-east-2.amazonaws.com/prod/users/';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const fb = (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString());
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
    // const LinkedInLoginButton = <TouchableHighlight
    //                               onPress={this._onLoginPressed.bind(this, 'linkedin-web')}
    //                               underlayColor={'transparent'}>
    //                               <Image
    //                                 style={styles.button}
    //                                 source={require('./source/inkedin-signin-button.png')}/>
    //                              </TouchableHighlight>

    const LoadingBar = <ActivityIndicator
                          animating={this.state.loading}
                          style={[styles.loading]}
                          size='large' />

    return (
      <View style={styles.container}>
        {this.state.loading? LoadingBar : fb}
      </View>
    );
  }

  // _onLoginPressed(provider) {
  //   const _this = this;
  //   this.setState({
  //     loading: true,
  //   });
  //   simpleAuthClient
  //     .authorize(provider)
  //     .then((info) => {
  //       //store user info to db
  //       fetch(AWS_ENDPOINT, {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'X-API-KEY': 'CLmUChn7pF6sdweyO4HrB96W2fMO62IF4TgOoIdo',
  //         },
  //         body: JSON.stringify({
  //           info
  //         })
  //       }).then((response) => {
  //           console.log("response", response);
  //           return response.json()
  //         })
  //         .then((responseData) => {
  //           console.log("responseData", responseData);
  //           _this.props.navigator.push({
  //             title: provider,
  //             provider,
  //             user: responseData,
  //           });
  //           _this.setState({
  //             loading: true,
  //           });
  //         })
  //       console.log('info.id', info.id);
  //       AsyncStorage.setItem('id', info.id);
  //     })
  //     .catch((error) => {
  //       _this.setState({
  //         loading: false,
  //       });
  //       Alert.alert(
  //         'Authorize Error',
  //         error && error.description || 'Unknown'
  //       );
  //     });
  //
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
});

LoginPage.propTypes = {
 provider: React.PropTypes.string,
 navigator: React.PropTypes.object,
};

module.exports = LoginPage;
