const initFilterNbGoals = 1500
let nbGoalsPerTeamChart, evolGoalsPerTeamChart
let nbGoalsPerTeamID, evolGoalsPerTeamID
let data

$(document).ready(function() {
    data = Papa.parse(footballData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    })["data"];

    let teams = getTeamNames(sortByTeam(getGoalsPerTeam()))
    teams.forEach(team => {
        $('#chart-selectTeamEvo').append('<option value="'+team+'">'+team+'</option>')
        $('#chart-selectTeamNb').append('<option value="'+team+'">'+team+'</option>')
    });

    nbGoalsPerTeamID = "#chart-nbGoalsPerTeam"
    evolGoalsPerTeamID = "#chart-EvolutionGoalsPerTeam"

    let filteredData = filterNbGoals(sortByGoals(getGoalsPerTeam()), initFilterNbGoals)
    createBarChart('total goals', getTeamNames(filteredData), getTeamGoals(filteredData))
})

function destroyChart(chart) {
    if(chart) chart.destroy()
}

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
function getEvolGoalsPerTeam() {
    let evolGoalsPerTeam = []
    data.forEach(row => {
        let homeTeamName = row.home_team
        let awayTeamName = row.away_team
        if(!containesTeam(evolGoalsPerTeam, homeTeamName)) {
            evolGoalsPerTeam.push(addNewTeam(homeTeamName))
        }
        if(!containesTeam(evolGoalsPerTeam, awayTeamName)) {
            evolGoalsPerTeam.push(addNewTeam(awayTeamName))         
        }

        addEvolGoals(evolGoalsPerTeam, homeTeamName, row.date, row.home_score)
        addEvolGoals(evolGoalsPerTeam, awayTeamName, row.date, row.away_score)
    })
    return evolGoalsPerTeam
}

function createBarChart(dataLabel, labels, data) {
    destroyChart(nbGoalsPerTeamChart);
    let ctx = $(nbGoalsPerTeamID)
    nbGoalsPerTeamChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: dataLabel,
                data: data,
                backgroundColor: 'rgba(38, 166, 91, 0.2)',
                borderColor: 'rgba(38, 166, 91, 1)',
                borderWidth: 1
            }]
        }
    })
}

function createLineChart(dataLabel1, dataLabel2, labels, data1, data2) {
    destroyChart(evolGoalsPerTeamChart)
    let ctx = $(evolGoalsPerTeamID)
    evolGoalsPerTeamChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: dataLabel1,
                fill: false,
                data: data1,
                backgroundColor: 'rgba(38, 166, 91, 0.2)',
                borderColor: 'rgba(38, 166, 91, 1)',
                borderWidth: 1
            },
            {
                label: dataLabel2,
                fill: false,
                data: data2,
                backgroundColor: 'rgba(248, 148, 6, 0.2)',
                borderColor: 'rgba(248, 148, 6, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
    })
}

function sortByTeam(data, order = "asc") {
    return data.sort(function(a,b) {
        switch (order) {
            case "asc":
                if (a.name < b.name)
                    return -1
                if (a.name > b.name)
                    return 1
                return 0
                break;
            case "desc":
                if (a.name < b.name)
                    return 1
                if (a.name > b.name)
                    return -1
                return 0
                break;
            default:
                return null
                break;
        }  
    })
}

function sortByGoals(data, order = "asc") {
    return data.sort(function(a,b) {
        switch (order) {
            case "asc":
                if (a.goals < b.goals)
                    return 1
                if (a.goals > b.goals)
                    return -1
                return 0
                break;
            case "desc":
                if (a.goals < b.goals)
                    return -1
                if (a.goals > b.goals)
                    return 1
                return 0
                break;
            default:
                return null
                break;
        }        
    })
}

function filterNbGoals(data, nbGoals = 0) {
    return data.filter(function(team) {
        return team.goals > nbGoals
    })
}

function getTeam(teams, name) {
    let team = $.grep(teams, function(team) {
        return team.name == name
    })[0]
    return team
}

function getTeamNames(teams) {
    let names = []
    teams.forEach(team => {
        names.push(team.name)
    })
    return names
}

function getDate(team) {
    return Object.keys(team.dates)
}

function getGoals(team) {
    let goals = []
    let dates = team.dates
    for (const key in dates) {
        if (dates.hasOwnProperty(key)) {
            const element = dates[key];
            goals.push(element.goals)
        }
    }
    return goals
}

function getMatches(team) {
    let matches = []
    let dates = team.dates
    for (const key in dates) {
        if (dates.hasOwnProperty(key)) {
            const element = dates[key];
            matches.push(element.matches)
        }
    }
    return matches
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
    return {name: name}
}

function addGoals(teams, name, goals) {
    let team = ($.grep(teams, function(team) {
        return team.name == name
    }))[0]
    if(team.goals == null)
        team.goals = goals
    else
        team.goals += goals
}

function addEvolGoals(teams, name, date, goals) {
    let team = ($.grep(teams, function(team) {
        return team.name == name
    }))[0]
    let dates = date.split('.')
    let year = +dates[2]

    if (team.dates == null)
        team.dates = {}

    if(team.dates[year] == null)
        team.dates[year] = {goals: goals, matches: 1}
    else {
        team.dates[year].goals += goals
        team.dates[year].matches += 1
    }

}