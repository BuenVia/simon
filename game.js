const buttonColours = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let started = false
let level = 0

$(document).keypress(function () {
    if(!started) {
        $('#level-title').text(`Level ${level}`)
        nextSequence()
        started = true
    } else {
        checkAnswer(userClickedPattern.length - 1)
    }
})

$('.btn').click(function () {
    let userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    } else {
        console.log('Wrong');
        playSound('wrong')
        $(document.body).addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 200)
        $('#level-title').text('Game Over, Press Any Key to Restart')
        startOver()
    }
}

function nextSequence() {
    userClickedPattern = []
    level++
    $('#level-title').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

function playSound(name) {
    $('#' + name).fadeOut(100).fadeIn(100)
    let sound = new Audio('sounds/' + name + '.mp3')
    sound.play()
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed')
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed')
    }, 100)
}

