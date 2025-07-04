

document.addEventListener('DOMContentLoaded', () => {


    document.getElementById('playBtn').addEventListener('click', e => {
        window.location.href = 'game.html';
    });

    const recordScoreText = document.getElementById('playerHighscore');
    let record = localStorage.getItem('record');

    if (record)
        recordScoreText.innerHTML = record;

});