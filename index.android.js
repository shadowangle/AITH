/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
var timeLimit = 10;
var timer = null;
var Frog = React.createClass({
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
      <Text style={{fontSize:50}}>{this.props.show?'🐬':''}</Text>
      </TouchableHighlight>
    )
  }
})
const STORAGE_KEY = '@highScore:data'
export default class game extends Component {
  constructor(){
    super();
    this.state={
      highScore: 0,
      timeCount: 0,
      score: 0,
      playing:false,
      holes:[false,false,false,false,false,false,false,false,false],
    }
  }
  componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value)=> {
      this.setState({
        highScore: (value == null)? 0:JSON.parse(value),
      })
      console.log('Value: '+value)
      console.log('Highscore: '+this.state.highScore)
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))
  }
  _save(){
        AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(this.state.highScore))
        .then(()=>console.log('Your highScore '+this.state.highScore+' has been saved'))
        .catch((error)=> console.log('AsyncStorage: '+error.message ))
        .done();
      }
  _startGame(){
    this.setState({
      timeCount: timeLimit,
      playing: true,
      score: 0,
    });
    frog = setInterval(()=>{
      this.setState({
        holes:[false,false,false,false,false,false,false,false,false],
      })
      var currentHoles = this.state.holes;
      currentHoles[Math.floor(Math.random()*9)] = true;
      this.setState({
        holes: currentHoles,
        })
      },800);

    timer = setInterval(()=> {
      this.setState({
        timeCount: this.state.timeCount - 1,
      });
      if(this.state.timeCount == 0){
        this._stopGame();
      }
    }, 1000);
  }
  _handleTouch(holeNumber){
    if(this.state.holes[holeNumber]){
      this.setState({
        score: this.state.score + 1,
         holes:[false,false,false,false,false,false,false,false,false],
      })
      var currentHoles = this.state.holes;
      currentHoles[Math.floor(Math.random()*9)] = true;
    }
  }
  _stopGame(){
        clearInterval(timer);
        clearInterval(frog);
        (this.state.score > this.state.highScore)? alert('New high score : '+this.state.score):null
        this.setState({
         holes: [false,false,false,false,false,false,false,false,false],
          playing:false,
          highScore:(this.state.score > this.state.highScore)? this.state.score : this.state.highScore,
        })
        this._save();
  }
  render() {
    return (
    <View style={styles.container}>
        <View style={styles.scoreRow}>
            <View  style={styles.highScore}>
                <Text>High Score</Text>
                <Text style={styles.numberCount}>{this.state.highScore}</Text>
                </View>
                <View style={styles.timeCount}>
                    <Text>Time</Text>
                    <Text style={styles.numberCount}>{this.state.timeCount}</Text>
                    </View>
                    <View style={styles.currentScore}>
                        <Text>Score</Text>
                        <Text style={styles.numberCount}>{this.state.score}</Text>
                  </View>
                  </View>
                      <View style={styles.holesRow}>
                          <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(0)} show={this.state.holes[0]}/>
                              </View>
                              <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(1)} show={this.state.holes[1]} />
                              </View>
                              <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(2)} show={this.state.holes[2]}/>
                              </View>
                          </View>
                          <View style={styles.holesRow}>
                          <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(3)} show={this.state.holes[3]}/>
                              </View>
                              <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(4)} show={this.state.holes[4]}/>
                              </View>
                              <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(5)} show={this.state.holes[5]}/>
                              </View>
                          </View>
                          <View style={styles.holesRow}>
                          <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(6)} show={this.state.holes[6]}/>
                              </View>
                              <View style={styles.hole}>
                              <Frog onPress={()=>this._handleTouch(7)} show={this.state.holes[7]}/>
                              </View>
                              <View style={styles.hole}>
                             <Frog onPress={()=>this._handleTouch(8)} show={this.state.holes[8]}/>
                              </View>
                          </View>

                  <View>
                      <Button 
                      title="Start Game"
                      onPress={this._startGame.bind(this)}
                      disabled={this.state.playing}
                      />
                      </View>

        </View>
    
    )
  }
}



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },numberCount:{
    fontSize: 30,
  },
  scoreRow:{
    flex:1,
    backgroundColor:'#a5d6a7',
    flexDirection:'row',
  },highScore:{
    flex:2,
    backgroundColor:'#ff4d4d',
    alignItems: 'center',
    borderRadius:20,
    margin:10,
  },timeCount:{
      flex:1,
      backgroundColor:'#ff4d4d',
      alignItems: 'center',
      borderRadius:20,
    margin:10,
  },currentScore:{
    flex:2,
    backgroundColor:'#ff4d4d',
    alignItems: 'center',
    borderRadius:20,
    margin:10,
  },
   holesRow:{
      backgroundColor:'#ffff33',
      flex:2,
      flexDirection:'row',
      
  },hole:{
      flex:1,
      backgroundColor:'#ffa31a',
      margin:10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('AITH', () => game);