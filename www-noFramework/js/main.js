$(document).ready(function() {
    let data = Papa.parse(footballData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    })["data"];
    
    console.log("Data", Object.keys(data[0]))
    let labels = Object.keys(data[0]);
    let teams = []
    let scores = []
    data.forEach(row => {
        if(teams.indexOf(row.home_team) == -1) {
            teams.push(row.home_team);
            scores.push(0);
        }
        if(teams.indexOf(row.away_team) == -1) {
            teams.push(row.away_team);
            scores.push(0);            
        }
        let index = teams.indexOf(row.home_team);
        scores[index] += row.home_score;
        index = teams.indexOf(row.away_team);
        scores[index] += row.away_score;
    })  

    console.log(teams);
    console.log(scores);

    let ctx = $('#myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [{
                label: 'total goals',
                data: scores
            }]
        }
    })
})