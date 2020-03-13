import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
import Constants from '../utilities/Constants';
import Loader from '../utilities/Loader';

export default class FavoriteScreen extends Component {
  static navigationOptions = {
    headerTitle: Constants.Strings.SECONDARY_TITLE,
    headerRight: <View />,
  };

  state = {
    movieList: [], // Will contain details about a particular movie.
    isLoading: false, // Whether loader is to be shown
  };

  constructor(props) {
    super(props);
    this.props.navigation.addListener(
      'didFocus',
      this.componentDidFocus.bind(this),
    );
  }

  componentDidFocus() {
    this.setState({movieList: global.favoriteList});
  }

  movieClick = obj => {
    var movieList = this.state.movieList;
    movieList.splice(movieList.indexOf(obj), 1);
    this.setState({movieList: movieList});
  };

  render() {
    return (
      <View style={{backgroundColor: Constants.Colors.Grey}}>
        {this.state.isLoading ? (
          <Loader show={true} loading={this.state.isLoading} />
        ) : null}
        <StatusBar
          backgroundColor={Constants.Colors.Cyan}
          barStyle="light-content"
        />
        <View style={{backgroundColor: Constants.Colors.Grey}}>
          <View style={styles.cardView}>
            <View style={{margin: 10, alignItems: 'center'}}>
              <Text
                style={{textAlign: 'center', fontSize: 22, color: '#1aa9e0'}}>
                My Favorite{' '}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: Constants.Colors.Grey,
                  margin: 0,
                }}
              />
            </View>
          </View>
        </View>
        {this.state.movieList == null ? null : (
          <ScrollView
            style={styles.movieList}
            showsVerticalScrollIndicator={false}>
            <View>
              {this.state.movieList.map(function(obj, i) {
                return (
                  <TouchableOpacity
                    onLongPress={this.movieClick.bind(this, obj)}
                    key={i}
                    style={{margin: 10, marginBottom: 5}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri:
                            obj.poster_path != null
                              ? Constants.URL.IMAGE_URL + obj.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE,
                        }}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text numberOfLines={3} style={{fontSize: 17}}>
                          {obj.original_title}
                        </Text>
                        <View style={styles.rowView}>
                          <Text>{Constants.Strings.RELEASE_DATE}</Text>
                          <Text>{obj.release_date}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text>{Constants.Strings.LANGUAGE}</Text>
                          <Text>{obj.original_language}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text>{Constants.Strings.POPULARITY}</Text>
                          <Text>{obj.popularity} %</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.lineView} />
                  </TouchableOpacity>
                );
              }, this)}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    margin: 10,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#1aa9e0',
    width: 80,
    borderRadius: 10,
  },
  buttonText: {color: 'white', margin: 5, alignSelf: 'center'},
  lineView: {height: 2, marginTop: 10, backgroundColor: '#EDEDED'},
  movieList: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    elevation: 10,
  },
  image: {width: 120, height: 180, marginLeft: 5, marginRight: 20},
  rowView: {flexDirection: 'row', marginTop: 10},
});
