import React from 'react';
import $ from 'jquery';

import ProcessCollection from '../models/ProcessCollection'
import CreateForm from './CreateForm.jsx';
import ProcessList from './ProcessList.jsx';
import ResultList from './ResultList.jsx';

export default class MainView extends React.Component{
    constructor () {
        super();

        this.state = {
            running: false,
        }

        this.excecutionProcessList = new ProcessCollection();
        this.newProcessList = new ProcessCollection();
        this.readyProcessList = new ProcessCollection();
        this.blockedProcessList = new ProcessCollection();
        this.finishedProcessList = new ProcessCollection();
    }

    setKeyboardEvents () {
        let self = this;

        $(document).on('keypress', function (event) {
            switch (event.which) {
                case 101: // E
                    self.abortRunningProcess();
                    break;
                case 115: // S
                    self.abortAllProcesses();
                    break;
                case 98: // B
                    self.blockRunningProcess();
                    break;
            }
        });
    }

    addNewProcess (newProcess) {

        if (!this.state.running) {
            this.setState({
                running: true
            }, function () {
                this.setKeyboardEvents();
                this.start();
            });
        }

        if (this.readyProcessList.length < this.getReadyListMaxLenght()) {
            if (this.excecutionProcessList.length === 1) {
                newProcess.ready();
                this.readyProcessList.push(newProcess);
            } else {
                newProcess.excecute();
                this.excecutionProcessList.push(newProcess);
            }
        } else {
            this.newProcessList.push(newProcess);
        }
    }

    start () {
        let self = this;

        if (self.state.running) {
            self.timeout = setTimeout(function () {
                self.doTransaction();

                self.start();
            }, 1000);
        }
    }

    stop () {
        this.setState({
            running: false
        });

        clearTimeout(this.timeout);
    }

    doTransaction () {
        let runningProcess = this.excecutionProcessList.first();

        if (runningProcess == undefined) {
            return;
        }

        if (runningProcess.getTimeLeft() == 0) {
            this.finishRunningProcess();
        } else {
            runningProcess.incrementExcecutionTime();
        }

        this.checkBlockedProcesses();

    }

    finishRunningProcess () {
        let finishedProcess = this.excecutionProcessList.shift();

        finishedProcess.finish();
        this.finishedProcessList.push(finishedProcess);

        this.runNextProcess();
    }

    runNextProcess () {
        let newProcess;
        let nextProcess = this.readyProcessList.shift();

        nextProcess.excecute();
        this.excecutionProcessList.push(nextProcess);

        if (this.readyProcessList.length < this.getReadyListMaxLenght()) {
            newProcess = this.newProcessList.shift();
            newProcess.ready();
            this.readyProcessList.push(newProcess);
        }

    }

    abortRunningProcess () {
        let runningProcess = this.excecutionProcessList.shift();

        runningProcess.abort();
        this.finishedProcessList.push(runningProcess);

        this.runNextProcess();
    }

    abortAllProcesses () {
        this.abortRunningProcess();

        this.purgeProcessLists([
            this.excecutionProcessList,
            this.readyProcessList,
            this.newProcessList,
            this.blockedProcessList,
        ]);
    }

    purgeProcessLists (lists) {
        let element;
        let list = lists.shift();

        while (element = list.shift()) {
            this.finishedProcessList.push(element);
        }

        if (lists.length) {
            this.purgeProcessLists(lists);
        } else {
            this.stop();
        }
    }

    blockRunningProcess () {
        let runningProcess = this.excecutionProcessList.shift();

        runningProcess.block();
        this.blockedProcessList.push(runningProcess);

        this.runNextProcess();
    }

    getReadyListMaxLenght () {
        return 5 - this.blockedProcessList.length;
    }

    checkBlockedProcesses () {
        this.blockedProcessList.each(this.checkBlockedProcess.bind(this));
    }

    checkBlockedProcess (element) {
        if (element == undefined) {
            return;
        }

        if (element.getBlockedTimeLeft() == 0) {
            element.ready();
            this.blockedProcessList.remove(element);
            this.readyProcessList.push(element);
        } else {
            element.incrementBloquedTimePassed();
        }
    }

    render () {
        return (
            <div className="row">
                <CreateForm
                    onSubmit={this.addNewProcess.bind(this)}
                />
                <ProcessList
                    className="col-sm-offset-4 col-sm-4"
                    type="ejecucion"
                    list={this.excecutionProcessList}
                />
                <div>
                    <ProcessList
                        className="col-sm-6"
                        type="nuevo"
                        list={this.newProcessList}
                    />
                    <ProcessList
                        className="col-sm-6"
                        type="listo"
                        list={this.readyProcessList}
                    />
                </div>
                <div>
                    <ProcessList
                        className="col-sm-6"
                        type="bloqueado"
                        list={this.blockedProcessList}
                    />
                    <ProcessList
                        className="col-sm-6"
                        type="terminado"
                        list={this.finishedProcessList}
                    />
                </div>
                <ResultList
                    className="col-sm-12"
                    type="terminado"
                    list={this.finishedProcessList}
                />
            </div>
        );
    }
}
