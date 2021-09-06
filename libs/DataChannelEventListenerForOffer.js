'use strict';

const dateFormat = require('dateformat');

class DataChannelEventListenerForOffer {
    constructor(name, rtcPeerConnection) {
        this.rtcPeerConnection = rtcPeerConnection;
        this.dataChannel = rtcPeerConnection.createDataChannel(name)

        this.onmessage = e => {
            const now = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss l");
            console.log(`[${now}] ` + e.data)
        };
     
        this.onopen = e => {
             setInterval(() => {
                const now = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss l");
                 this.dataChannel.send("This is OFFERER! at " + now);
             }, 1000);
        };
    
    }

    
    listen() {
        this.dataChannel.addEventListener("message", this.onmessage)
        this.dataChannel.addEventListener("open", this.onopen)
    }

    term() {
        this.dataChannel.removeEventListener("message", this.onmessage)
        this.dataChannel.removeEventListener("open", this.onopen)
    }
}

module.exports = DataChannelEventListenerForOffer;
