import * as path from 'path';
import * as fs from 'fs-extra';
import { WechatParseOptions } from '../interface';

interface Config {
    name: string;
    ruokuai: {
        username: string;
        password: string;
    };
    wechat: WechatParseOptions;
}

let _config = fs.readJSONSync(path.join(__dirname, '../../config.json'), { encoding: 'utf8' });

if (process.argv.length > 2){
    for (let i=2; i < process.argv.length; i=i+2) {
        let key = process.argv[i];
        let val = process.argv[i+1];
        if (key.indexOf('--')>=0)
            key = key.replace('--','');
        process.env[key.toLocaleUpperCase()] = val;
    }
}

if (process.env.WECHAT_NAME && process.env.WECHAT_BIZ) {
    console.info('命令行参数启动，自动切换到搜狗模式');
    _config.name = process.env.WECHAT_NAME || _config.name;
    _config.wechat.biz = process.env.WECHAT_BIZ || _config.wechat.biz;
    _config.ruokuai.username = process.env.RUOKUAI_USERNAME || _config.ruokuai.username;
    _config.ruokuai.password = process.env.RUOKUAI_PASSWORD || _config.ruokuai.password;
    _config.wechat.mode = 'sougou';
}

export const config: Config = _config;

console.info('env参数', config);

export const wechat = {
    domain: 'https://mp.weixin.qq.com',
    path: '/mp/profile_ext',
    querystring: {
        action: 'getmsg',
        __biz: config.wechat.biz,
        f: 'json',
        offset: 10,
        count: 10,
        is_ok: 1,
        scene: 123,
        uin: '777',
        key: '777',
        pass_ticket: '',
        wxtoken: '',
        appmsg_token: config.wechat.appmsg_token,
        x5: '0'
    },
    headers: {
        'Accept': '*/*',
        // 'Accept-Encoding': 'gzip, deflate, sdch, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': config.wechat.cookie,
        'Host': 'mp.weixin.qq.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    }
};



export const dbPath = path.join(__dirname, '../../db');
fs.mkdirpSync(dbPath);