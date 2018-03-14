$(document).ready(function() {
    $("#chart-filterMinGoals").change(function() {
        let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), $("#chart-filterMinGoals").val())
        createBarChart('total goals', getTeamNames(data), getTeamGoals(data))
    })
    $("#chart-selectTeam").change(function() {
        let data = getEvolGoalsPerTeam()
        data = getTeam(data, $("#chart-selectTeam").val())
        createLineChart('number of goals', 'number on matches', getDate(data), getGoals(data), getMatches(data))
    })
})