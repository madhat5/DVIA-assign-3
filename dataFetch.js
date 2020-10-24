// console.log('sim sim salabim')

let request = require('request');
let fs = require('fs');

let urlOne = "https://www.basketball-reference.com/playoffs/series.html";
let urlTwo = "https://teamcolorcodes.com/nba-team-color-codes/"

let dataModel = {
    id: 1,
    yr: 2018,
    series: 'string',
    date: 'Apr 28 - May 10, 2019',
    dateRange: ['startDate new Date()', 'endDate new Date()'],
    teams: [{
        name: 'String',
        wins: 4,
        favorite: true,
        underdog: false
    }, {
        name: 'String',
        wins: 0,
        favorite: false,
        underdog: true
    }, ]
}

let scrapePage = function (urlData, dataName) {
    request(urlData, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            // console.log(body)
            fs.writeFileSync('data/' + dataName +  'Data.txt', body);

            console.log('site visited |', urlData)
        } else {
            console.log("Request failed!")
        }
    });
}
scrapePage(urlOne, 'nbaSeries')
scrapePage(urlTwo, 'nbaColors')