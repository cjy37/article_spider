import { config } from './constants';
import * as wechat from './wechat';

process.on('uncaughtException', function(e){
    console.error('UE:Catch in process', e);
});
 
process.on('unhandledRejection', (reason) => {
    console.info('UR:Catch in process', reason);
});

process.on('rejectionHandled', (p) => {
    console.info('RH:Catch in process', p);
});

wechat.start(config.name, config.wechat);