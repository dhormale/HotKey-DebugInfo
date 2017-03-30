import { Injectable } from '@angular/core';

@Injectable()
export class HotKey {

    hotKeyList = [];
    possibleChars = {};
    keyCallbackPair = {};

    registerHotKey = (inputMatch, callback) => {
        if (null != inputMatch && inputMatch != '' && typeof callback === 'function') {

            this.keyCallbackPair[inputMatch] = callback;

            var hotKeyHit = {};
            var matches = inputMatch.split('+');
            for (var i = 0; i < matches.length; i++) {
                this.possibleChars[matches[i]] = true;
                hotKeyHit[matches[i]] = false;
            }
            this.hotKeyList.push(hotKeyHit);

            // If this is the first element to which the event has been bound,
            // bind a handler to document to catch all 'click' events.
            if (this.hotKeyList.length === 1) {
                document.addEventListener('keydown', this.keyDownHandler);
                document.addEventListener('keyup', this.keyUpHandler);
            }
        }
    }

    keyDownHandler = (event) => {
        if (null != this.possibleChars[event.keyCode]) {
            for (var i = 0; i < this.hotKeyList.length; i++) {
                if (null != this.hotKeyList[i][event.keyCode]) {
                    var hotKeyHit = this.hotKeyList[i];
                    hotKeyHit[event.keyCode] = true;

                    var totalKey = '';
                    var allDone = true;
                    for (var property in hotKeyHit) {
                        totalKey = totalKey.length === 0 ? property : totalKey + '+' + property;
                        if (hotKeyHit.hasOwnProperty(property) && hotKeyHit[property] === false) {
                            allDone = false;
                            break;
                        }
                    }

                    if (allDone) {
                        var callback = this.keyCallbackPair[totalKey];
                        if (null != callback && typeof callback === 'function') {
                            callback();
                        }
                    }
                }
            }
        }
    }

    // This function is executed every key up.
    keyUpHandler = (event) => {
        if (null != this.possibleChars[event.keyCode]) {
            for (var i = 0; i < this.hotKeyList.length; i++) {
                var hotKeyHit = this.hotKeyList[i];
                for (var property in hotKeyHit) {
                    if (hotKeyHit.hasOwnProperty(property)) {
                        hotKeyHit[property] = false;
                    }
                }
            }
        }
    }

}