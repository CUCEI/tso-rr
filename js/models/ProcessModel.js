import {Model} from 'backbone';

export default class Process extends Model {
    defaults () {
        return {
            state: 'nuevo',
            executed_time: 0,
            arraived_at: Math.floor(new Date().getTime() / 1000)
        }
    }
    getID() {
        return this.cid.replace('c', '');
    }
    getTimeLeft () {
        return this.get('time') - this.get('executed_time');
    }
    getBlockedTimeLeft () {
        return this.get('block_time') - this.get('block_time_passed');
    }
    getWaitingTime() {
        if (this.get('excecuted_at')) {
            return this.get('excecuted_at') - this.get('arraived_at');
        } else {
            return 'N/A';
        }
    }
    incrementExcecutionTime() {
        let executed_time = this.get('executed_time');

        this.set('executed_time', ++executed_time);
    }
    incrementBloquedTimePassed() {
        let block_time_passed = this.get('block_time_passed');

        this.set('block_time_passed', ++block_time_passed);
    }
    abort() {
        this.set('state', 'error');
    }
    finish() {
        if (false) { // just for testing
            let state = this.get('state');

        } else {
            this.set('state', 'ejecutado');
        }
    }
    excecute() {

        if (!this.get('excecuted_at')) {
            this.set('excecuted_at', Math.floor(new Date().getTime() / 1000))
        }

        this.set('state', 'ejecutando');
    }
    ready() {
        this.set({
            state: 'listo',
            block_time: 0,
            block_time_passed: 0
        });
    }
    block() {
        this.set({
            state: 'bloqueado',
            block_time: this.getRandomIntInclusive(3, 5),
            block_time_passed: 0
        });

    }
    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
