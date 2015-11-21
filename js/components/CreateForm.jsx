import React from 'react';

export default class CreateForm extends React.Component{
    onSubmit (e) {
        e.preventDefault();


    }
    render () {
        return (
            <section className="create-form" onSubmit={this.onSubmit}>
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
