/************
 * Pig Game *
 ************/
var scores, roundScore, activePlayer, gamePlaying;

init();
var lastDice;

document.querySelector('.btn--roll').addEventListener('click', function(){
        if (gamePlaying){
            //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png';
        
        //3. Update the round score If the called number was not a 1
        if (dice === 6 && lastDice === 6){
            // Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }else {
            // Next player
            nextPlayer();
        }

        lastDice = dice;
    }
    
});

document.querySelector('.btn--hold').addEventListener('click', function(){
        if (gamePlaying){

            // Add Current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null, or " " are corced to false
        // Anything else is corced to true
        if (input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name--' +activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' +activePlayer).classList.add('winner');
            document.querySelector('.player--' +activePlayer).classList.remove('active');
            gamePlaying = false;
        }else{
            // Next Player
            nextPlayer();
        }
            
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '1';

    //document.querySelector('.player--0').classList.remove('player--active');
    //document.querySelector('.player--1').classList.add('player--active');

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('winner');
    document.querySelector('.player--1').classList.remove('winner');
    document.querySelector('.player--0').classList.remove('active');
    document.querySelector('.player--1').classList.remove('active');
    document.querySelector('.player--0').classList.add('active');
    
}