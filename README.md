# Overview


![""](./attachments/capture.gif)

# Install 

- Install nodejs and npm.
- Following is example in Ubuntu.

```bash
apt install -y nodejs
apt install -y nodejs
```

# Environment confirmed operation

- Ubuntu 20.04
- node v10.19.0 (npm 6.14.4)

# How to use

- Install `node_modules`.
- Following is example.

```bash
npm install
```

- Open two Terminals in the single device.
- Excute `node offerer.js` in Terminal 1.
- Excute `node answerer.js` in Terminal 2.
- It recommend that `node offerer.js` be excuted before excuting `node answerer.js`.
- Otherwise you need to delete `*.txt` files in `./data/` folder before launch.

## Terminal 1

```bash
node offerer.js
```


## Terminal 2
```bash
node answerer.js
```

# Flow

![""](./attachments/flow.png)

