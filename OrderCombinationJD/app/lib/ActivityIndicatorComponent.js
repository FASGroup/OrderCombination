import React, { Component } from 'react'

import {
    ActivityIndicator,
    StyleSheet,
    Alert,
    Dimensions,
    View,
    Modal
} from 'react-native'

const { width, height } = Dimensions.get('window')
export default class ActivityIndicatorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            modalVisiable: false
        };
    }

    render() {
        return (
            <Modal  transparent={true} visible={this.state.modalVisiable} onRequestClose={() => this.hideWaiting()}>
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, { height: 80 }]}
                        size="large"
                        color="#cccccc"
                    />
                </View>
            </Modal>
        );
    }

    showWaiting() {
        this.setState({ animating: true, modalVisiable: true });
    }

    hideWaiting() {
        this.setState({ animating: false, modalVisiable: false });
    }

}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    gray: {
        backgroundColor: '#cccccc'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8
    },
    container: {
        position: "absolute",
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    }
});