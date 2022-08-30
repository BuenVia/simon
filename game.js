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
    // } else {
    //     checkAnswer(userClickedPattern.length - 1)
    }
})

$('.btn').click(function () {
    let userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    if (gamePattern.length === userClickedPattern.length) {
        checkAnswer(userClickedPattern)
    }
})

// To check if logic is working here
function nextSequence() {
    userClickedPattern = []
    level++
    $('#level-title').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log(gamePattern);
    playSound(gamePattern)
    animatePress(gamePattern)
    }


// To check if logic is working here
function checkAnswer(currentLevel) {
    if (currentLevel.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence()
        }, 1000)
    } else {
        playSound('wrong')
        $(document.body).addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 200)
        $('#level-title').text('Game Over, Press Any Key to Restart')
        startOver()
    }
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

