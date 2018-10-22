const playerInfoSoure = 'https://ancient-brushlands-12436.herokuapp.com/';
const goal = document.querySelector('.goal');
const ul = document.querySelector('.list');
const startDate = 16;
const today = new Date();
const articleNumberGoal = today.getDate() - startDate + 1;
goal.textContent = articleNumberGoal;

fetch(playerInfoSoure)
    .then(blob => {
        return blob.json();
    })
    .then(data => {
        const result = data.map(data => {
            let li =
                `
            <li>
                <a href="${data.link}" class="name">${data.name}</a>
                <div class="process">
                    <div class="bar"></div>
                </div>
            </li>
            `
            return li;
        }).join('');
        ul.innerHTML = result;
        const name = [];
        const bars = Array.from(document.querySelectorAll('.bar'));
        const people = document.querySelector('.people');
        let peopleCount = 0;
        for (i = 0; i < bars.length; i++) {
            const percent = data[i].joinDays / 30;
            bars[i].style.width = `${percent * 100}%`;
            if (Number(data[i].joinDays) >= articleNumberGoal) {
                bars[i].classList.add('safe');
            } else {
                peopleCount += 1;
            }
        }
        people.textContent = peopleCount;
    });

