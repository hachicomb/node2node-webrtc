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
    }

    async waitOffer(str) {
        if (this.status < 10) throw Error('Error')

        let offer;
        if (fs.existsSync(`${this.dir}${this.offerFileName}`)) {
            offer = fs.readFileSync(`${this.dir}${this.offerFileName}`, {encoding: 'utf-8'});
        }

        if (! offer) {
            this.watcher = chokidar.watch(`${this.dir}${this.offerFileName}`, {
                ignored:/[\/\\]\./,
                persistent:true
            });

            // ready
            await new Promise(resolve => {this.watcher.on('ready', resolve)});

            while (! offer) {
                // add or change
                await Promise.race([new Promise(resolve => {this.watcher.on('change', resolve)}), 
                                new Promise(resolve => {this.watcher.on('add', resolve)})]);

                offer = fs.readFileSync(`${this.dir}${this.offerFileName}`, {encoding: 'utf-8'});
            }

            this.watcher.unwatch(`${this.dir}${this.answerFileName}`);
            await this.watcher.close();
            this.watcher = null;
        }
        return JSON.parse(offer)
    }

    writeAnswer(str) {
        if (this.status < 10) throw Error('Error')
        fs.writeFileSync(`${this.dir}${this.answerFileName}`, str)
    }

    async unWaitAnswer() {
        if (this.watcher) {
            this.watcher.unwatch(`${this.dir}${this.answerFileName}`);
            await this.watcher.close();
        }
    }
}

module.exports = SDPFileForOffer;

