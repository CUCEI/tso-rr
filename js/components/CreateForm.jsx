import React from 'react';

import processes from '../singletons/processes.js';
import Process from '../models/ProcessModel';

export default class CreateForm extends React.Component{
    constructor () {
        super();

        this.state = this.resetState();
    }
    resetState () {
        return {
            name: '',
            time: ''
        };
    }
    onSubmit (e) {
        e.preventDefault();


        processes.add(new Process(this.state));

        this.setState(this.resetState());
    }
    onChange (e) {
        let stateName = e.target.name;
        let value = e.target.value;

        this.setState({
            [stateName]: value
        });
    }
    render () {
        return (
            <section className="create-form" onSubmit={this.onSubmit.bind(this)}>
                <h2>Nuevo Proceso</h2>
                <form noValidate>
                    <div className="form-group">
                        <label htmlFor="name">
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={this.onChange.bind(this)}
                            value={this.state.name}
                            placeholder="Proceso"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="time"
                            name="time"
                            onChange={this.onChange.bind(this)}
                            value={this.state.time}
                            placeholder="XXs"
                        />
                    </div>
                    <button type="submit" className="btn btn-default">
                        Crear
                    </button>
                </form>
            </section>
        );
    }
}
