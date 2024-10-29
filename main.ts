# MIT License
#
# This file is part of the repository:
# https://github.com/Vegz78/microbit_test_receiver
#
# Please feel free to use, fork and develop, but I appreciate proper attribution
# to the developer, and - if possible - linking back to this original repository:
# https://github.com/Vegz78/microbit_test_receiver
# 
# Copyright (c) 2024 Vegz78
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

radio.onReceivedNumber(function (receivedNumber) {
    signalStrength = ((receivedNumber/10)|0) - 1
    for (let indeks = 0; indeks <= signalStrength; indeks++) {
        led.plot(indeks % 5, (indeks/5)|0)
    }
    basic.pause(PAUSE_TIME)
    InitializeScreen()
})
function InitializeScreen () {
    basic.clearScreen()
    led.plot(4, 4)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "OK") {
        basic.showIcon(IconNames.Yes)
    } else {
        InitializeScreen()
    }
})
let lastButtonPressTime = 0
let signalStrength = 0
let PAUSE_TIME = 0
radio.setGroup(99)
let DEBOUNCE_TIME = 500
PAUSE_TIME = 200
InitializeScreen()
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        // Debouncer copied from @joshkeys19 on the MakeCode Forum:
        // https://forum.makecode.com/t/microbit-ignoring-radio-message-when-in-while-loop/5100/6
        if (input.runningTime() > lastButtonPressTime + DEBOUNCE_TIME) {
            radio.sendNumber(randint(1, 10))
            basic.pause(PAUSE_TIME)
            radio.sendNumber(0)
            lastButtonPressTime = input.runningTime()
        }
    }
})
