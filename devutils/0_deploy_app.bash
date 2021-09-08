#!/bin/bash

options="-avzc"
exclude="--exclude .git --exclude node_modules/ --exclude devutils"

rsync $options  $exclude ../ offerer:node2node-webrtc/
rsync $options  $exclude ../ answerer:node2node-webrtc/
