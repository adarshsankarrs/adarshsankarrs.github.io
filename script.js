let table = ["", "", "", "", "", "", "", "", ""];
let play = true;
let nowPlaying = "X";
let prevCell;
const accepted = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clicked));

document.querySelector('.restart').addEventListener('click', function () {
	play = true;
	nowPlaying = "X";
	table = ["", "", "", "", "", "", "", "", ""];
	document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	document.querySelector(".winner").textContent = ""
});

function clicked(event) {
	cell = event.target
	const indx = parseInt(cell.getAttribute('index'))
	if (table[indx] !== "" || !play) return;
	if (prevCell && prevCell != cell) {
		prevCell.removeEventListener('dblclick', dblClicked)
	}
	prevCell = cell
	table[indx] = nowPlaying;
	cell.innerHTML = nowPlaying;
	cell.addEventListener('dblclick', dblClicked)
	check();
}

function dblClicked(event) {
	cell = event.target
	const indx = parseInt(cell.getAttribute('index'))
	if (!play) return;
	table[indx] = "";
	cell.innerHTML = "";
	nowPlaying = nowPlaying === "X" ? "O" : "X";
}

function message(msg) {
	document.querySelector('.winner').innerHTML = msg;
	play = false;
}

function check() {
	let won = false;
	for (let i = 0; i <= 7; i++) {
		const condition = accepted[i];
		let a = table[condition[0]];
		let b = table[condition[1]];
		let c = table[condition[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			won = true;
			break
		}
	}

	if (won) {
		message(`${nowPlaying} won`)
		return;
	}

	let draw = !table.includes("");
	if (draw) {
		message("Draw")
		return;
	}

	nowPlaying = nowPlaying === "X" ? "O" : "X";
}