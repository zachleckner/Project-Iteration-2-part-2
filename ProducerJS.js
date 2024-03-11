function createSelect(playList, song, selectedValue) {
    let select = document.createElement('select');
    playList.map(value => {
        let option = document.createElement('option');
        option.text = value;
        option.value = value;
        option.selected = (value === song);
        select.add(option);
    });
    select.addEventListener('change', function () {
        selectedValue(this.value);
    });
    return select;
}

function addSong(djName, slotIndex, selectedValue) {
    timeSlots[djName][slotIndex].songs.push(selectedValue);
    closePopup();
    openPopup(djName, slotIndex);
}

function removeSong(djName, slotIndex, songIndex) {
    timeSlots[djName][slotIndex].songs.splice(songIndex, 1);
    closePopup();
    openPopup(djName, slotIndex);
}

function closePopup() {
    let popup = document.querySelector('.popup');
    popup.style.display = 'none';
}

function openPopup(djName, slotIndex) {
    let popup = document.querySelector('.popup');
    popup.style.display = 'block';
    let ul = document.getElementById('songList');
    ul.innerHTML = ''; 
    let currentSongs = timeSlots[djName][slotIndex].songs;
    currentSongs.forEach((song, songIndex) => {
        let li = document.createElement('li');
        let select = createSelect(playList, song, (selectedValue) => {
            currentSongs[songIndex] = selectedValue;
        });
        li.appendChild(select);
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            removeSong(djName, slotIndex, songIndex);
        });
        li.appendChild(removeButton);
        ul.appendChild(li);
    });

    let li = document.createElement('li');
    let select = createSelect(playList, 'notSelectedValue', (selectedValue) => {
        addSong(djName, slotIndex, selectedValue);
    });
    li.appendChild(select);
    ul.appendChild(li);

    let closeButton = document.querySelector('.popup .closeButton');
    closeButton.addEventListener('click', closePopup);
}

function timeSlot(slots, djName) {
    let column = document.getElementById("djColumn");
    column.innerHTML = slots.map((slot, index) => {
        return `<row class="rSlot">date: ${slot.date} start: ${slot.start} end: ${slot.end} <button onclick="openPopup('${djName}', ${index})">Edit</button></row>`;
    }).join('');
}

function selectDJ(selectedTimeSlot) {
    document.querySelectorAll("li").forEach(li => li.style.border = "1px solid black");
    selectedTimeSlot.style.border = "1px solid green";
    let selectedDJ = selectedTimeSlot.textContent;
    let slots = timeSlots[selectedDJ];
    timeSlot(slots, selectedDJ);
}

let djList = ["DJ1", "DJ2", "DJ3"];
playList = ["Unselected", "song1", "song2", "song3"];

let timeSlots = {
    "DJ1": [
        { date: "2/10/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
        { date: "2/11/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
        { date: "2/11/2024", start: "3:00pm", end: "4:00pm", songs: ["song1", "song2"] },
    ],
    "DJ2": [
        { date: "2/13/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
        { date: "2/14/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
    ],
    "DJ3": [
        { date: "2/12/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
    ]
};

let ul = document.getElementById("djList");
ul.innerHTML = djList.map(dj => `<li>${dj}</li>`).join('');
document.querySelectorAll("#djList li").forEach(li => {
    li.addEventListener("click", function () {
        selectDJ(this);
    });
});





