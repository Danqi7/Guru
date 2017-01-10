//ProfileCard
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  Image,
  Navigator,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var username = this.props.user.firstName + " " + this.props.user.lastName;
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={{uri: this.props.user.profile_picture}}/>
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.nameText}>{username}</Text>
          <Text style={styles.titleText}>{this.props.user.headline}</Text>
        </View>
        <View style={styles.likeButton}>
          <Icon name="thumbs-o-up" size={20} color="rgb(31, 126, 226)" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
  },
  image: {
    marginLeft: 8,
    height: 50,
    borderRadius: 25,
    width: 50,
  },
  middleSection: {
    marginLeft: 8,
    width: 300,
  },
  likeButton: {
    marginLeft: 5,
    marginRight: 1,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    color: '#676c72',
  },
});

ProfileCard.propTypes = {
  user: React.PropTypes.object,
},

module.exports = ProfileCard;
