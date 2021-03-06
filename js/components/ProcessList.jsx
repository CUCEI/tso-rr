import React from 'react';
import _ from 'underscore';

import Process from './Process.jsx';

export default class ProcessList extends React.Component {
    constructor () {
        super();

        this.state = {
            processes: []
        }
    }
    componentWillMount () {
        let self = this;

        self.props.list.on('update', function () {
            self.setState({
                processes: self.props.list.toArray()
            });
        });
    }
    renderProcesses (element) {

        return (
            <Process
                element={element}
            />
        );
    }
    render () {
        let type = this.props.type;

        return (
            <section className={this.props.className}>
                <h3>{type.charAt(0).toUpperCase() + type.slice(1) + (type == 'ejecucion'? '': 's')}</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Nombre</th>
                            <th>Servicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.processes.map(this.renderProcesses)}
                    </tbody>
                </table>
            </section>
        );
    }
}
