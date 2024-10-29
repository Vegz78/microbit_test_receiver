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
