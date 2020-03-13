import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Loader from '../utilities/Loader';
import {callRemoteMethod} from '../utilities/WebServiceHandler';
import Constants from '../utilities/Constants';
import {renderIf} from '../utilities/CommonMethods';
import {customAlert} from '../utilities/CommonMethods';

export default class SearchScreen extends Component {
  static navigationOptions = {
    headerTitle: Constants.Strings.MAIN_TITLE,
  };
  state = {
    movieList: [],
    isLoading: false,
    searchText: '',
    noData: false,
  };
  global: any;

  constructor(props) {
    super(props);
    this.global.favoriteList = [];
  }

  searchButtonPressed = async () => {
    if (this.state.searchText.length) {
      var endpoint =
        Constants.URL.BASE_URL +
        Constants.URL.SEARCH_QUERY +
        this.state.searchText +
        '&' +
        Constants.URL.API_KEY;
      await callRemoteMethod(this, endpoint, {}, 'searchCallback', 'GET', true);
    } else {
      customAlert(Constants.Strings.MSG);
    }
  };

  searchCallback = response => {
    if (response.results.length) {
      this.setState({noData: false});
      this.setState({movieList: response.results});
    } else {
      this.setState({movieList: []});
      this.setState({noData: true});
    }
  };

  movieClick = obj => {
    global.favoriteList.push(obj);
    var movieList = this.state.movieList;
    movieList.splice(movieList.indexOf(obj), 1);
    this.setState({movieList: movieList});
  };

  render() {
    return (
      <View style={{flex: 1}}>
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
              <TextInput
                style={{textAlign: 'center', fontSize: 22}}
                placeholder={Constants.Strings.PLACEHOLDER}
                onChangeText={text => this.setState({searchText: text})}
                underlineColorAndroid={Constants.Colors.Transparent}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: Constants.Colors.Grey,
                  margin: 0,
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={this.searchButtonPressed.bind(this)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  {Constants.Strings.SEARCH_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {renderIf(
          this.state.noData,
          <Text style={{textAlign: 'center'}}>No data found.</Text>,
        )}
        {renderIf(
          this.state.movieList.length,
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
          </ScrollView>,
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
