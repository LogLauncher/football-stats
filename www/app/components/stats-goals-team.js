import Component from '@ember/component';
import PapaParse from 'papaparse';

export default Component.extend({
  model() {
    let csv_string = `date,home_team,away_team,home_score,away_score,tournament,city,country
    30.11.1872,Scotland,England,0,0,Friendly,Glasgow,Scotland
    08.03.1873,England,Scotland,4,2,Friendly,London,England
    07.03.1874,Scotland,England,2,1,Friendly,Glasgow,Scotland
    06.03.1875,England,Scotland,2,2,Friendly,London,England
    04.03.1876,Scotland,England,3,0,Friendly,Glasgow,Scotland`;
    let data = PapaParse.parse(csv_string, {header: true, dynamicTyping: true});
    return data;
  }
});
