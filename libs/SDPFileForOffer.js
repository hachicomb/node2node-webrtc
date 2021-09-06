'use strict';

const fs = require('fs')
const mkdirp = require('mkdirp')
const chokidar = require("chokidar");

class SDPFileForOffer {
    constructor() {
        this.offerFileName = "offer.txt";
        this.answerFileName = "answer.txt";
        this.dir = `./data/`;
        this.status = 0;
        this.watcher = null;
    }

    getOfferPath() {
        return `${dir}${this.offerFileName}`
    }

    getAnswerPath() {
        return `${dir}${this.answerFileName}`
    }

    async setUp()
    {
        this.status = 10;
        try {
            await mkdirp(this.dir)
        } catch (e) {
            throw Error('Error')
        }
    
        fs.writeFileSync(`${this.dir}${this.offerFileName}`, "")
        fs.writeFileSync(`${this.dir}${this.answerFileName}`, "")
    }

    writeOffer(str) {
        if (this.status < 10) throw Error('Error')

        fs.writeFileSync(`${this.dir}${this.offerFileName}`, str)
    }

    async waitAnswer() {
        if (this.status < 10) throw Error('Error')

        this.watcher = chokidar.watch(`${this.dir}${this.answerFileName}`, {
            ignored:/[\/\\]\./,
            persistent:true
        });

        await new Promise((resolve) => {this.watcher.on('ready', () =>{resolve()});});
        await new Promise(resolve => {this.watcher.on('change', (path) => {resolve()});});

        let answer = "";

        while (answer == "") {
            await new Promise(resolve => {setTimeout(resolve, 50);});
            answer = fs.readFileSync(`${this.dir}${this.answerFileName}`, {encoding: 'utf-8'});
        }

        answer = JSON.parse(answer);
        return answer;
    }

    async unWaitAnswer() {
        this.watcher.unwatch(`${this.dir}${this.answerFileName}`);
        await this.watcher.close();
    }

    createWatcher() {
        this.watcher = chokidar.watch(`${this.dir}${this.answerFileName}`, {
            ignored:/[\/\\]\./,
            persistent:true
        });

        return new Promise((resolve, reject) => {
            this.watcher.on('ready', () =>
            {
                resolve()
            });
        })
    }
}

module.exports = SDPFileForOffer;

