import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Loading = ({ isLoading }) => {
  return (
    <Modal transparent={true} visible={isLoading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Loading;
