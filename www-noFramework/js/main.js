const initFilterNbGoals = 1500
let currentChart
let data

$(document).ready(function() {
    data = Papa.parse(footballData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    })["data"];

    let filteredData = filterNbGoals(sortByGoals(getGoalsPerTeam()), initFilterNbGoals)
    createBarChart('total goals', getTeamNames(filteredData), getTeamGoals(filteredData))
    
})

function getGoalsPerTeam() {
    let goalsPerTeam = []
    data.forEach(row => {
        let homeTeamName = row.home_team
        let awayTeamName = row.away_team
        if(!containesTeam(goalsPerTeam, homeTeamName)) {
            goalsPerTeam.push(addNewTeam(homeTeamName))
        }
        if(!containesTeam(goalsPerTeam, awayTeamName)) {
            goalsPerTeam.push(addNewTeam(awayTeamName))         
        }

        addGoals(goalsPerTeam, homeTeamName, row.home_score)
        addGoals(goalsPerTeam, awayTeamName, row.away_score)
    })
    return goalsPerTeam
}

function createBarChart(dataLabel, labels, data) {
    if(currentChart) 
        currentChart.destroy()
    let ctx = $('#myChart')
    let myChart = currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: dataLabel,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    })
}

function sortByGoals(data) {
    return data.sort(function(a,b) {
        if (a.goals < b.goals)
            return 1
        if (a.goals > b.goals)
            return -1
        return 0
    })
}

function filterNbGoals(data, nbGoals) {
    return data.filter(function(team) {
        return team.goals > nbGoals
    })
}

function getTeamNames(teams) {
    let names = []
    teams.forEach(team => {
        names.push(team.name)
    })
    return names
}

function getTeamGoals(teams) {
    let goals = []
    teams.forEach(team => {
        goals.push(team.goals)
    })
    return goals
}

function containesTeam(teams, name) {
    let team = $.grep(teams, function(team) {
        return team.name == name
    })
    return team.length > 0
}

function addNewTeam(name) {
    return {name: name, goals: 0}
}

function addGoals(teams, name, goals) {
    let team = ($.grep(teams, function(team) {
        return team.name == name
    }))[0]
    team.goals += goals
}