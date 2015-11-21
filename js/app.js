import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MainView from './components/MainView.jsx';

const mainContainer = $('#main-content').get()[0];

ReactDOM.render(<MainView />, mainContainer);
