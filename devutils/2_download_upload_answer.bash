#!/bin/bash

scp answerer:node2node-webrtc/data/answer.txt ./tmp/
scp ./tmp/answer.txt offerer:node2node-webrtc/data/

