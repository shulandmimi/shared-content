import { ServiceBroker } from 'moleculer';
import path from 'path';

const ext = process.env.NODE_ENV !== 'development' ? 'js' : 'ts';

// @ts-ignore
const broker = new ServiceBroker({ logger: console, namespace: 'main' });

broker.loadServices(path.resolve(__dirname, './services/'), `**/*.${ext}`);

// broker.loadService(path.resolve(__dirname, './services/api-gateway.service.ts'));

broker.start().catch(err => console.log(err.message));
