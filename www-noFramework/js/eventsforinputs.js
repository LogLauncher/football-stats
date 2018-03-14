$(document).ready(function() {
    let nbGoalsMin = 0
    $("#chart-filterMinGoals").change(function() {
        nbGoalsMin = $("#chart-filterMinGoals").val()
        let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
        createBarChart('total goals', getTeamNames(data), getTeamGoals(data))
    })
    $("#chart-selectTeamNb").change(function() {
        let selectedTeam = $("#chart-selectTeamNb").val()        
        if (selectedTeam == 0) {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), nbGoalsMin)
            createBarChart('total goals', getTeamNames(data), getTeamGoals(data))
        } else {
            let data = filterNbGoals(sortByGoals(getGoalsPerTeam()))
            let team = getTeam(data, selectedTeam)
            createBarChart('total goals', [team.name], [team.goals])
        }
    })

    
    $("#chart-selectTeamEvo").change(function() {
        let data = getEvolGoalsPerTeam()
        data = getTeam(data, $("#chart-selectTeamEvo").val())
        createLineChart('number of goals', 'number on matches', getDate(data), getGoals(data), getMatches(data))
    })
})