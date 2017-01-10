//FeedView
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  ActivityIndicator,
  Image,
  Navigator,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import ProfileCard from './ProfileCard';
// import SearchBar from './SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


class FeedView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.dataSource),
      text: null,
    };
  }

  componentDidMount() {
    console.log("haha", this);
  }

  render() {
    const feedView = <ListView
                        ref = "yo"
                        style={styles.container}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                          <ProfileCard user={rowData} />
                        }
                      />;
    const searchView = <Text>{this.state.text}</Text>;
    const scene = this.state.text ? searchView : feedView;

    const cancelButton =  <TouchableHighlight
                            style={styles.cancelButton}
                            underlayColor={'transparent'}
                            onPress={() => {this._onPressCancelButton()}}>
                            <Text style={styles.cancelText}>
                              {"cancel"}
                            </Text>
                          </TouchableHighlight>;
    const titleButton = <TouchableHighlight
                            style={styles.cancelButton}
                            underlayColor={'transparent'}>
                            <Text style={styles.cancelText}>
                              {""}
                            </Text>
                          </TouchableHighlight>;
    const sideNavBar = this.state.text ? cancelButton : titleButton;

    console.log(this.state.dataSource);
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
            <View style={styles.outerContainer}>
              {scene}
            </View>
          );
        }}
        navigationBar={
           <Navigator.NavigationBar
             style={styles.navigationBar}
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                   return null;
               },
               RightButton: (route, navigator, index, navState) => {
                 return null;
               },
               Title: (route, navigator, index, navState) => {
                 return (
                   <View style={styles.navBarContainer}>
                     <TouchableHighlight
                       underlayColor={'transparent'}>
                       <View style={styles.searchBar}>
                       <Icon
                         style={styles.icon}
                         name="ios-search"
                         color="white"
                         size={16}
                       />
                       <TextInput
                         style={styles.text}
                         placeholder={'Search...'}
                         onChangeText={(text) => this.setState({text: text})}
                         value={this.state.text}
                        />
                        </View>
                     </TouchableHighlight>
                     {sideNavBar}
                   </View>
                 );
               },
             }}
           />
         }
      />
    );
  }

  _onPressCancelButton() {
    this.setState({
      text: null,
    });
  }

}

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row'
  },
  cancelText: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    height: 25,
    marginTop: 7,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    marginLeft: 15,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    height: 25,
    width: 300,
    backgroundColor: "#4B77BE",
    marginLeft: 15,
    marginTop: 4,
    borderRadius: 3,
  },
  text: {
    flex: 1,
    height: 25,
    fontSize: 14,
    color: 'white',
    marginLeft: 7,
    marginTop: 2,
  },
  navigationBar: {
    backgroundColor: '#4183D7',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dcdcdc',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ececec',
    marginTop: 40,
  },
});

FeedView.propTypes = {
  dataSource: React.PropTypes.array,
};

module.exports = FeedView;
