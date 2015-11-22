import React from 'react';

import processes from '../singletons/processes.js';
import Process from '../models/ProcessModel';

export default class CreateForm extends React.Component{
    onSubmit (e) {
        e.preventDefault();

        this.props.onSubmit(new Process({
            name: Math.random().toString(36).substr(2, 5),
            time: this.getRandomIntInclusive(5, 20)
        }));
    }
    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    render () {
        return (
            <section className="create-form" >
                <h2>Nuevo Proceso</h2>
                <form noValidate onSubmit={this.onSubmit.bind(this)}>
                    <button type="submit" className="btn btn-default">
                        Crear
                    </button>
                </form>
            </section>
        );
    }
}
