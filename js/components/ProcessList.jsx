import React from 'react';
import _ from 'underscore';

import Process from './Process.jsx';
import processes from '../singletons/processes';

export default class ProcessList extends React.Component {
    constructor () {
        super();

        this.state = {
            processes: []
        }
    }
    componentWillMount () {
        let self = this;

        processes.on('update', function () {
            self.setState({
                processes: _(processes.where({type: self.props.type}))
            });
        });
    }
    renderProcesses (element) {
        console.log(element);
        return (
            <tr>
                <td>{element.cid.replace('c', '')}</td>
                <td>{element.get('name')}</td>
                <td>{element.get('time')}</td>
            </tr>
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
