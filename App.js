import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true, 
      pokemon: [],
      url: 'https://pokeapi.co/api/v2/pokemon'
    }
  }

  componentDidMount(){
    this.getPokemon();
  }

  getPokemon = () => {
    this.setState({ loading:true})
    fetch(this.state.url)
      .then(res => res.json())
      .then( res =>{

        this.setState({
          pokemon: res.results,
          url: res.next,
          loading: false
        })

      });
  };

  render(){
    if(this.state.loading)
    return(
      <View style={styles.container}>
        <text>Descargando Pokemon!</text>
      </View>
    );

    return(
      <View style={{flex:1, paddingTop:50, paddingLeft:30}}>
        <text>Listado de Pokemon!</text>
        <FlatList
          data={this.state.pokemon}
          renderItem={
            ({item }) => <text>{ item.name}</text>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
  
    );
  }
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
