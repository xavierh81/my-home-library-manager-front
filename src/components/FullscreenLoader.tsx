// Imports
import React, { Component } from 'react'; 
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Define props type
type FullScreenLoaderProps = {

}

// Define component
export class FullScreenLoader extends Component<FullScreenLoaderProps, {}> {
    static defaultProps = {

    }

    // render will know everything!
    render() {
        return (
            <div className={`fullScreenLoader`}>
                <div className="loader">
                    <Spin indicator={<LoadingOutlined spin />} />
                </div>
            </div>
        )
    }
}