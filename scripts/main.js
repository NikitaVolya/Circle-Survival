

document.addEventListener('DOMContentLoaded', () => {


    document.getElementById('playBtn').addEventListener('click', e => {
        window.location.href = 'game.html';
    });

    document.getElementById('upgradesGalleryBtn').addEventListener('click', e => {
        window.location.href = 'upgradesGallery.html';
    });

    const recordScoreText = document.getElementById('playerHighscore');
    let record = localStorage.getItem('record');

    if (record)
        recordScoreText.innerHTML = record;

});