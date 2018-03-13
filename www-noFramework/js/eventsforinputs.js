$(document).ready(function() {    
    $("#chart-filter").change(function() {
        let data = filterNbGoals(sortByGoals(getGoalsPerTeam()), $("#chart-filter").val())
        createBarChart('total goals', getTeamNames(data), getTeamGoals(data))
    })
})