import React from 'react';
import Vivus from 'vivus';
import RadarChart from './Radar.js';

export default class RadarVivusChart extends RadarChart {
    constructor(props){
        super(props);
        this.state = { finished: false };
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.replay !== this.props.replay) this.setState({finished:false});
    }
    componentDidMount() {
        this.run();
    }
    componentDidUpdate(prevProps,prevState){
        if (!this.state.finished) this.run()
    }
    run(){
        var animate = this.props.options && this.props.options.animate || {};
        new Vivus(this.refs.vivus.getDOMNode(), {
            type: animate.type || 'delayed',
            duration: animate.duration || 'delayed',
            start: 'autostart',
            selfDestroy: true
        }, this.finish.bind(this));
    }
    finish() {
        this.setState({ finished: true });
    }
}