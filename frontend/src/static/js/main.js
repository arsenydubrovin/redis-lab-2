let defaultAthletes
let defaultReferees

window.onload = async function () {
	defaultAthletes = await getDefaultAthletes()
	defaultReferees = await getDefaultReferees()

	createSelectOptions("athlete-select", defaultAthletes)
	createSelectOptions("referee-select", defaultReferees)

	updateScoreTable()
}


document.getElementById("add").onclick = () => {
	const scoreInput = document.getElementById("score-input")

	if (!isValidNumber(scoreInput.value)) {
		return
	}

	const athlete = getSelectedText(document.getElementById("athlete-select"))
	const referee = getSelectedText(document.getElementById("referee-select"))

	increaseAthleteScoreBy(athlete, referee, scoreInput.value)
	updateScoreTable()

	scoreInput.value = "0"
	scoreInput.focus()
}

