//LoadingPage
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  AsyncStorage,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class LoadingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'Welcome to LinkYou'}
        </Text>
        <Text style={styles.text}>
          {'Realize your career ambitions'}
        </Text>
      </View>
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
});

module.exports = LoadingPage;
