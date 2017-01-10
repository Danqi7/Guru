//profile
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  Image,
  Navigator,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

// import InputModal from './InputModal';

const API_ENDPOINT = 'http://localhost:8080/api/users';
const AWS_ENDPOINT = 'https://i6as5jqiud.execute-api.us-east-2.amazonaws.com/prod/users/';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: null,
      modalVisible: false,
      schoolText: '',
      hometownText: '',
    };
  }

  render() {
    const name = this.props.user.firstName + " " + this.props.user.lastName;
    const imageSource = this.props.user.profile_picture;
    // const inputMoal = this.props.showModal ? <InputModal /> : null;
    return (
      <Navigator
        initialRoute={{
          title: 'Welcome Page',
          authProviders: [
            'linkedin-web'
          ]
        }}
        renderScene={(route, navigator) => {
          return (
            <View style={styles.container}>
              <Image
                source={{uri: imageSource}}
                style={styles.profileImage}
              >
              </Image>
              <Text style={styles.text}>
                {name}
              </Text>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 18,
  },
  profileImage: {
    marginTop: 85,
    height: 80,
    borderRadius: 40,
    width: 80
  },
});

Profile.propTypes = {
  user: React.PropTypes.object,
  showModal: React.PropTypes.bool,
},

module.exports = Profile;
