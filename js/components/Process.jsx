import React from 'react';

export default class Process extends React.Component {
    constructor () {
        super();

        this.state = {
            element: {}
        }
    }

    componentWillMount () {
        let self = this;

        self.setState({
            element: self.props.element.toJSON()
        });

        self.props.element.on('change', function () {
            self.setState({
                element: self.props.element.toJSON()
            });
        });
    }

    render () {
        return (
            <tr>
                <td>{this.props.element.getID()}</td>
                <td>{this.state.element.name}</td>
                <td>{this.props.element.getTimeLeft()}</td>
            </tr>
        );
    }
}
