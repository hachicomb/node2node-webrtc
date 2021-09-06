'use strict';

class RTCPeerConnectionUtils {
    static checkStatus(rtcPeerConnection) {
        if (rtcPeerConnection.iceConnectionState === 'connected'
        || rtcPeerConnection.iceConnectionState === 'completed') {
            return true;
        } else {
            return false;
        }
    }

    static createPromiseWaitAllCandidates(rtcPeerConnection, candidateList) {
        const waitingForFetchAllCandidate = new Promise(resolve => {
        function onIceCandidate(e) {
            if (e.candidate == null) {
                rtcPeerConnection.removeEventListener('icecandidate', onIceCandidate);
                resolve();
            }
            candidateList.push(e.target.localDescription);
            
        }
        rtcPeerConnection.addEventListener('icecandidate', onIceCandidate);
        });
        return waitingForFetchAllCandidate;
    }

    static showConsoleLog() {
        console.log("Saved it in './data/offer.txt' about the cadidate.");
        console.log("Please transport offer.txt to the ANSWERER.");
        console.log("Then, Please  place './data/answer.txt' that it will be created by ANSWERER.");
    }
}

module.exports = RTCPeerConnectionUtils;
