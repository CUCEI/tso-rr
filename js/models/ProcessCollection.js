import {Collection} from 'backbone';

import Process from './ProcessModel';

export default class ProcessCollection extends Collection {
    constructor(options) {
        super(options);

        this.model = Process;
    }
}
