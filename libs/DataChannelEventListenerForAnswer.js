'use strict';

const dateFormat = require('dateformat');

class DataChannelEventListenerForAnswer {
    constructor(rtcPeerConnection) {
        this.rtcPeerConnection = rtcPeerConnection;
        this.dataChannel = null;
        this.ondatachannel = e =>  {
            this.dataChannel = e.channel;
            this.dataChannel.addEventListener("message", this.onmessage)
    
            setInterval(() => {
                const now = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss l");
                this.dataChannel.send("This is ANSWERER at " + now);
            }, 1000);
        };
    
        this.onmessage = e => {
            const now = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss l");
            console.log(`[${now}] ` + e.data)
        };
    }

    listen() {
        this.rtcPeerConnection.addEventListener("datachannel", this.ondatachannel)
    }

    term() {
        this.rtcPeerConnection.removeEventListener("datachannel", this.ondatachannel)
    }
}

module.exports = DataChannelEventListenerForAnswer;
