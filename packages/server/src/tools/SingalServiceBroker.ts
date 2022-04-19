import { Service, ServiceBroker } from 'moleculer';

export default class SingalServiceBroker extends ServiceBroker {
    constructor() {
        super();
    }

    registerService(service: Service) {
        this.createService(service);
    }
}
