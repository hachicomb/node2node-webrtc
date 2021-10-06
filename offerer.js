'use strict';

const RTCPeerConnection = require('wrtc').RTCPeerConnection;
const RTCPeerConnectionUtils = require('./libs/RTCPeerConnectionUtils')
const DataChannelEventListenerForOffer = require('./libs/DataChannelEventListenerForOffer')
const SDPFileForOffer = require('./libs/SDPFileForOffer')

const rtcPeerConnection = new RTCPeerConnection({})
const dataChannelEventListenr = new DataChannelEventListenerForOffer("channel", rtcPeerConnection)
const sdpFile = new SDPFileForOffer();

(async () => {
    console.log("This is OFFERER.")
    
    dataChannelEventListenr.listen();
    
    await sdpFile.setUp();
    
    const candidates =  [];
    const waitAllCandidates = 
        RTCPeerConnectionUtils.createPromiseWaitAllCandidates(rtcPeerConnection, candidates);


    const offer = await rtcPeerConnection.createOffer();

    await rtcPeerConnection.setLocalDescription(offer);

    await waitAllCandidates;

    sdpFile.writeOffer(JSON.stringify(candidates));
    
    const answer = await sdpFile.waitAnswer();
    
    rtcPeerConnection.setRemoteDescription(answer[0]);
})();

/*
const waiter = require('./libs/waiter')
const TIMEOUT = 100000;

    This is the memo for using timeout.

    const answer = await Promise.race([waiter(TIMEOUT), sdpFile.waitAnswer()]);
    
    if (answer != 0) {
        rtcPeerConnection.setRemoteDescription(answer[answer.length - 1]);
    } else {
        await sdpFile.unWaitAnswer();
        rtcPeerConnection.close();
    }
*/
