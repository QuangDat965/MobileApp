import React from 'react';
import { Text } from 'react-native';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDateTime: ''
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.setState({ currentDateTime: now.toLocaleString() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <Text style = {{ textAlign: 'center'}}>{this.state.currentDateTime}</Text>;
  }
}

export default DateTime;
