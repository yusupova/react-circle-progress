/*
 * @Author: cyy 
 * @Date: 2018-04-02 15:04:13 
 * @Last Modified by: cyy
 * @Last Modified time: 2018-04-02 15:46:09
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CanCirPro extends Component {
    static defaultProps = {
        radius: 45,
        percent: 97,
        borderWidth: 6,
        startcolor: '#ffd460',
        centercolor: '#fcc241',
        endColor: '#f79d00',
        textStyle: { fontSize: 11, color: "#fa9a22", textAlign: 'center' }
    }
    static propTypes = {
        radius: PropTypes.number,
        percent: PropTypes.number,
        borderWidth: PropTypes.number,
        startcolor: PropTypes.string,
        centercolor: PropTypes.string,
        endColor: PropTypes.string,
        textStyle: PropTypes.object,
    }
    render() {
        return (<div className="cancirproOut" style={{
            width: (this.props.radius + this.props.borderWidth) * 2,
            height: (this.props.radius + this.props.borderWidth) * 2,
        }} >
            <canvas className="cancirproIn" ref={cancirpro => {
                this._cancirpro = cancirpro;
                this.onDraw(cancirpro);
            }}
                width={(this.props.radius + this.props.borderWidth) * 2} height={(this.props.radius + this.props.borderWidth) * 2}
            />

            <div className="cancirproContent" style={{
                width: (this.props.radius + this.props.borderWidth) * 2,
                height: (this.props.radius + this.props.borderWidth) * 2,
            }} >
                {this.props.children ? this.props.children :
                    <div style={this.props.textStyle}>{this.props.percent}%</div>}
            </div>

        </div>);
    }
    onDraw(cancirpro) {
        if (cancirpro) {
            let canvas = this._cancirpro;
            let ctx = canvas.getContext("2d");

            let width = (this.props.radius + this.props.borderWidth) * 2;
            if (window.devicePixelRatio) {
                canvas.style.width = width + "px";
                canvas.style.height = width + "px";
                canvas.height = width * window.devicePixelRatio;
                canvas.width = width * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }

            ctx.beginPath();
            let grd1 = ctx.createLinearGradient(0, 0, 0, 90);
            grd1.addColorStop(0, "#ffd460");
            grd1.addColorStop(1, "#fcc241");
            ctx.lineCap = 'round';
            ctx.strokeStyle = grd1;
            ctx.lineWidth = this.props.borderWidth;
            ctx.arc(this.props.radius + this.props.borderWidth, this.props.radius + this.props.borderWidth, this.props.radius, Math.PI * (1.4), Math.PI * (1.4 + 1), false);
            ctx.stroke();


            if (this.props.percent > 50) {
                ctx.beginPath();
                let grd2 = ctx.createLinearGradient(0, 90, 0, 0);
                grd2.addColorStop(0, "#fcc241");
                grd2.addColorStop(1, "#f79d00");
                ctx.lineCap = 'round';
                ctx.strokeStyle = grd2;
                ctx.lineWidth = this.props.borderWidth;
                ctx.arc(this.props.radius + this.props.borderWidth, this.props.radius + this.props.borderWidth, this.props.radius, Math.PI * (2.4), Math.PI * (2.4 + ((this.props.percent - 50) / 50)), false);
                ctx.stroke();
            }
        }
    }

}
