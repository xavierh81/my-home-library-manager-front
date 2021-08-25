// Imports
import React, { Component } from 'react'; 
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Define props type
type RoundedButtonProps = {
    text: String,
    onClick: Function
    enabled?: Boolean,
    loading?: Boolean,
    className?: String
}

// Define component
export class RoundedButton extends Component<RoundedButtonProps, {}> {
    static defaultProps = {
        text: '',
        enabled: true,
        loading: false,
        className: ''
    }

    // render will know everything!
    render() {
        const {text, enabled, loading, className, onClick} = this.props;

        return (
            <div className={`roundedButton ${!enabled ? "disabled " : ""}${!enabled ? "loading " : ""} ${className}`} onClick={() => onClick()}>
                {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#FFF" }} spin />} />}
                <span className="label">{text}</span>
            </div>
        )
    }
}