async function getDefaultAthletes() {
	try {
		return await window.go.main.App.ServeDefaultAthletes()
	} catch (err) {
		console.log(err)
	}
}

async function getDefaultReferees() {
	try {
		return await window.go.main.App.ServeDefaultReferees()
	} catch (err) {
		console.log(err)
	}
}

async function getAthleteTotalScore(athlete) {
	try {
		return await window.go.main.App.GetAthleteTotalScore(athlete)
	} catch (err) {
		console.log(err)
	}
}

function increaseAthleteScoreBy(athlete, referee, increment) {
	window.go.main.App.IncreaseAthleteScoreBy(athlete, referee, increment)
}