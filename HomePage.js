//homepage
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  TabBarIOS,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Profile from './Profile';
import FeedView from './FeedView';
import Icon from 'react-native-vector-icons/Ionicons';

const API_ENDPOINT = 'http://localhost:8080/api/users';
const AWS_ENDPOINT = 'https://i6as5jqiud.execute-api.us-east-2.amazonaws.com/prod/users/';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'profileTab',
      dataSource: null,
    };
  }

  componentWillMount() {
    fetch(AWS_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': 'CLmUChn7pF6sdweyO4HrB96W2fMO62IF4TgOoIdo',
      },
    })
      .then((response) => {
        console.log("=====", response);
        return  response.json()
      })
      .then((userData) => {
        const dataSource = [];
        userData = JSON.parse(userData);
        console.log("=====!!!!", userData);
        for (var key in userData) {
          if (userData.hasOwnProperty(key)) {
            dataSource.push(userData[key]);
          }
        }
        console.log("bar", dataSource);
        this.setState({
          dataSource: dataSource,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log("this.props.user", this.props.user);
    console.log("?????", this.state.dataSource);
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title="Profile"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}>
          <Profile user={this.props.user} showModal={this.props.showModal}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Explore"
          iconName="ios-eye-outline"
          selectedIconName="ios-eye"
          selected={this.state.selectedTab === 'home2Tab'}
          onPress={() => {
            this.setState({
              selectedTab: 'home2Tab',
            });
          }}>
          <FeedView dataSource={this.state.dataSource}/>
        </Icon.TabBarItem>
    </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
  },
  tabContent: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HomePage.propTypes = {
  user: React.PropTypes.object,
};

module.exports = HomePage;
