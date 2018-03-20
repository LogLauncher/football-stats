$(document).ready(function() {
    let nbGoalsMin = 0
    $("#chart-filterMinGoals").change(function() {
        nbGoalsMin = $("#chart-filterMinGoals").val()
        let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
        createGoalsPerTeamChart('total goals', getTeamNames(data), getTeamGoals(data))
    })
    $("#chart-selectGoals").change(function() {
        let selectedTeam = $("#chart-selectGoals").val()        
        if (selectedTeam == 0) {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
            createGoalsPerTeamChart('total goals', getTeamNames(data), getTeamGoals(data))
        } else {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()))
            let team = getTeam(data, selectedTeam)
            createGoalsPerTeamChart('total goals', [team.name], [team.goals])
        }
    })


    $("#chart-selectEvo").change(function() {
        let data = getEvolGoalsPerTeam()
        data = getTeam(data, $("#chart-selectEvo").val())
        createEvolGoalsPerTeamChart('number of goals', 'number on matches', getDate(data), getGoals(data), getMatches(data))
    })

    $("#chart-selectType").change(function() {
        let data = getTypeTournamentPerTeam()
        data = getTeam(data, $("#chart-selectType").val())
        let keysInOrder = sortByTournamentCount(data.tournaments)
        createTypeTournamentPerTeamChart('number of tournaments', keysInOrder, getTournamentTypeCount(data, keysInOrder))
    })

    $("#chart-selectCountries").change(function() {
        let data = getCountriesPlayedIn()
        data = getTeam(data, $("#chart-selectCountries").val())
        let keysInOrder = sortByCountryCount(data.countries)
        createCountriesPlayedInChart('countries played in', keysInOrder, getCountryCount(data, keysInOrder))
    })
})