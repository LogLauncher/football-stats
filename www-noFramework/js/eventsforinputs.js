$(document).ready(function() {
    let nbGoalsMin = 1000
    $("#chart-filterMinGoals").change(function() {
        nbGoalsMin = $("#chart-filterMinGoals").val()
        let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
        createGoalsPerTeamChart('# Goals', getTeamNames(data), getTeamGoals(data))
    })
    $("#chart-selectGoals").change(function() {
        let selectedTeam = $("#chart-selectGoals").val()        
        if (selectedTeam == 0) {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
            createGoalsPerTeamChart('# Goals', getTeamNames(data), getTeamGoals(data))
        } else {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()))
            let team = getTeam(data, selectedTeam)
            createGoalsPerTeamChart('# Goals', [team.name], [team.goals])
        }
    })


    $("#chart-selectEvo").change(function() {
        setEvolChart($("#chart-selectEvo").val())
    })

    $("#chart-selectType").change(function() {
        setTypeChart($("#chart-selectType").val())
    })

    $("#chart-selectCountries").change(function() {
        setCountriesChart($("#chart-selectCountries").val())
    })

    $('#chart-nbGoalsPerTeam').click(function(evt) {
        let activeElement = nbGoalsPerTeamChart.getElementAtEvent(evt)
        if (activeElement.length > 0) {
            let team = activeElement[0]._model.label

            $("#chart-selectEvo").val(team)
            $("#chart-selectType").val(team)
            $("#chart-selectCountries").val(team)

            setEvolChart(team)
            setTypeChart(team)
            setCountriesChart(team)
        }
    })
})

function setEvolChart(team) {
    let data = getEvolGoalsPerTeam()
    data = getTeam(data, team)
    createEvolGoalsPerTeamChart('# Goals', '# Matches', getDate(data), getGoals(data), getMatches(data))
}
function setTypeChart(team) {
    let data = getTypeTournamentPerTeam()
    data = getTeam(data, team)
    let keysInOrder = sortByTournamentCount(data.tournaments)
    createTypeTournamentPerTeamChart('# Tournaments', keysInOrder, getTournamentTypeCount(data, keysInOrder))
}
function setCountriesChart(team) {
    let data = getCountriesPlayedIn()
    data = getTeam(data, team)
    let keysInOrder = sortByCountryCount(data.countries)
    createCountriesPlayedInChart('# Countries', keysInOrder, getCountryCount(data, keysInOrder))
}