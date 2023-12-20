function getSelectedText(select) {
	if (select.selectedIndex == -1)
		return null
	return select.options[select.selectedIndex].text
}

function sortByValues(scoreTable) {
	return Object.fromEntries(
		Object.entries(scoreTable).sort(([, a], [, b]) => b - a)
	)
}

function isValidNumber(input) {
	const number = parseInt(input, 10)

	return (
		Number.isInteger(number) &&
		number > 0 &&
		!Number.isNaN(number)
	)
}