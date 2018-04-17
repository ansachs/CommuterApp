import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';
import _ from 'lodash'; // 4.17.4

const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const characterHeight = 14;
const scrubberWidth = 24;

class Scrubber extends React.PureComponent {

  constructor(props) {
    super(props);
    this.scrubMoveThrottled = _.throttle(this.scrubMove, 100);
    this.handleUserScrubbing();
  }

  handleUserScrubbing = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: e =>
        this.scrubMoveThrottled(e.nativeEvent.locationY),
      onPanResponderRelease: e =>
        this.scrubMoveThrottled(e.nativeEvent.locationY)
    });
  };

  scrubMove = locationY => {
    const scrubIndex = Math.floor(locationY / characterHeight);
    const safeIndex = Math.min(
      alphabet.length - 1,
      Math.max(0, scrubIndex)
    );

    this.props.onScrub(alphabet[safeIndex]);
  };

  render() {
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
        pointerEvents="box-only"
      >
        {alphabet.map(char => (
          <TouchableWithoutFeedback key={char}>
            <View>
              <Text style={styles.character}>{char}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default Scrubber;

const styles = StyleSheet.create({
  container: {},
  character: {
    backgroundColor: 'transparent',
    color: 'red',
    fontSize: 11,
    height: characterHeight,
    textAlign: 'center',
    width: scrubberWidth
  }
});
