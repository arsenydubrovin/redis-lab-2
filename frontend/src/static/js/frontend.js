function createSelectOptions(selectId, options) {
	const select = document.getElementById(selectId)

	for (const [i, name] of Object.entries(options)) {
		const option = document.createElement("option")
		option.value = i
		option.textContent = name
		select.appendChild(option)
	}
}

async function updateScoreTable() {
	let scoreTable = {}

	await Promise.all(defaultAthletes.map(async function (athlete) {
		score = await getAthleteTotalScore(athlete)
		scoreTable[athlete] = score
	}))
	scoreTable = sortByValues(scoreTable)

	const resultTable = document.getElementById("result-table")

	Array.from(resultTable.children).forEach(child => {
		if (!child.classList.contains("table-header")) {
			resultTable.removeChild(child)
		}
	})

	Object.entries(scoreTable).forEach(([athlete, score]) => {
		resultTable.innerHTML += `<div class="name-cell cell">${athlete}</div>`
		resultTable.innerHTML += `<div class="cell" >${score}</div >`
	})
}

