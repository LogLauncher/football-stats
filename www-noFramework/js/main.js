$(document).ready(function() {
    let data = Papa.parse(footballData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    })["data"];

    console.log("CSV data after papaparse", data);
    
    
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

        addScore(goalsPerTeam, homeTeamName, row.home_score)
        addScore(goalsPerTeam, awayTeamName, row.away_score)
    })

    let ctx = $('#myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: getTeamNames(goalsPerTeam),
            datasets: [{
                label: 'total goals',
                data: getTeamScores(goalsPerTeam)
            }]
        }
    })
})

function getTeamNames(teams) {
    let names = []
    teams.forEach(team => {
        names.push(team.name)
    })
    return names
}

function getTeamScores(teams) {
    let scores = []
    teams.forEach(team => {
        scores.push(team.score)
    })
    return scores
}

function containesTeam(teams, name) {
    let team = $.grep(teams, function(team) {
        return team.name == name
    })
    return team.length > 0
}

function addNewTeam(name) {
    return {name: name, score: 0}
}

function addScore(teams, name, score) {
    let team = ($.grep(teams, function(team) {
        return team.name == name
    }))[0]
    team.score += score
}