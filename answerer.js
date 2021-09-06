'use strict';

const RTCPeerConnection = require('wrtc').RTCPeerConnection;
const RTCPeerConnectionUtils = require('./libs/RTCPeerConnectionUtils')
const SDPFileForAnswer = require('./libs/SDPFileForAnswer')
const DataChannelEventListenerForAnswer = require('./libs/DataChannelEventListenerForAnswer')

const rtcPeerConnection = new RTCPeerConnection({})
const sdpFileForAnswer = new SDPFileForAnswer();
const dataChannelEventListener = new DataChannelEventListenerForAnswer(rtcPeerConnection);

(async () => {
    console.log("This is ANSWERER.")

    dataChannelEventListener.listen()

    await sdpFileForAnswer.setUp();
    
    const offer = await sdpFileForAnswer.waitOffer();

    await rtcPeerConnection.setRemoteDescription(offer[0]);

    const candidates =  [];
    const waitAllCandidates = 
        RTCPeerConnectionUtils.createPromiseWaitAllCandidates(rtcPeerConnection, candidates);

    const answer = await rtcPeerConnection.createAnswer();

    await rtcPeerConnection.setLocalDescription(answer);

    await waitAllCandidates;

    sdpFileForAnswer.writeAnswer(JSON.stringify(candidates));
})();
