const playerInfo = 'http://localhost:3000/';
fetch(playerInfo)
    .then(blob => {
        console.log(blob)
    })