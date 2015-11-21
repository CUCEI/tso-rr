import React from 'react';

import CreateForm from './CreateForm.jsx';

export default class MainView extends React.Component{
    render () {
        return (
            <div className="row">
                <CreateForm />
            </div>
        );
    }
}
