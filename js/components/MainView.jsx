import React from 'react';

import CreateForm from './CreateForm.jsx';
import ProcessList from './ProcessList.jsx';

export default class MainView extends React.Component{
    render () {
        return (
            <div className="row">
                <CreateForm />
                <ProcessList
                    className="col-sm-offset-4 col-sm-4"
                    type="ejecucion"
                />
                <div className="col-sm-12">
                    <ProcessList
                        className="col-sm-6"
                        type="nuevo"
                    />
                    <ProcessList
                        className="col-sm-6"
                        type="listo"
                    />
                    <ProcessList
                        className="col-sm-6"
                        type="bloqueado"
                    />
                    <ProcessList
                        className="col-sm-6"
                        type="terminado"
                    />
                </div>
            </div>
        );
    }
}
