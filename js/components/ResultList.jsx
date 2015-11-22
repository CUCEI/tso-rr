import React from 'react';

export default class ResultList extends React.Component {
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
            <tr>
                <td>{element.getID()}</td>
                <td>{element.get('name')}</td>
                <td>{element.get('time')}</td>
                <td>{element.getWaitingTime()}</td>
                <td>{element.get('state')}</td>
            </tr>
        );
    }
    render () {
        return (
            <section className={this.props.className}>
                <h3>Resultados</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Nombre</th>
                            <th>Duración</th>
                            <th>T. espera</th>
                            <th>Estado</th>
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
