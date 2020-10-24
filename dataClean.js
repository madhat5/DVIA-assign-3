// console.log('sim sim salabim')

let fs = require('fs');
let cheerio = require('cheerio');

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

let data = [];

// assign + read 
let content = fs.readFileSync('data/scrapeData.txt');

let $ = cheerio.load(content);
// console.log($)

// el query selector
// let queryEl = $("#playoffs_series > tbody > tr");
let queryEl = $("tr").each(() => {
    $(this).val($(this).attr("data-row"));
    // $(this).val( $(this).attr("data-stat") );
});
// console.log(queryEl);


// print to console/terminal
queryEl.each((i, el) => {
    // console.log(i);
    // console.log($(el).children('th').children('a').text()) // season yr
    // console.log($(el).children('td:nth-child(3)').text()) // series
    // console.log($(el).children('td:nth-child(4)').text()) // date
    // console.log($(el).children('td:nth-child(6)').text()) // Team A
    // console.log($(el).children('td:nth-child(7)').text()) // Team A wins
    // console.log($(el).children('td:nth-child(9)').text()) // Team B
    // console.log($(el).children('td:nth-child(10)').text()) // Team B wins
    // console.log($(el).children('td:nth-child(12)').text()) // Favorite
    // console.log($(el).children('td:nth-child(13)').text()) // Underdog

    // ====================================
    // console.log($(el).children('td').attr('data-stat')) // series
    // if ( $(el).children('td').attr('data-stat') == 'series' ) {
    //     // do this
    //     console.log('found it')
    // } else {
    //     // do that
    //     console.log('blow me')
    // }
    // ====================================

    /*
    clean:
    - favorite/underdog booleans
    - date/dateRange
    - name remove (4) w/ regex
    - remove empty items
    */

    // boolean check
    let teamAUrl = $(el).children('td:nth-child(6)').children('a').attr('href')
    let teamBUrl = $(el).children('td:nth-child(9)').children('a').attr('href')
    // console.log(teamAUrl) // Team A
    // console.log(teamBUrl) // Team B
    let favUrl = $(el).children('td:nth-child(12)').children('a').attr('href');
    let underdogUrl = $(el).children('td:nth-child(13)').children('a').attr('href');
    // console.log(favUrl);
    // console.log(underdogUrl);

    let boolCheck = function(teamUrl, favUnder) {
        return (teamUrl == favUnder)
    }
    // boolCheck(teamAUrl, favUrl),

    data.push({
        id: i,
        yr: $(el).children('th').children('a').text(),
        series: $(el).children('td:nth-child(3)').text(),
        date: $(el).children('td:nth-child(4)').text(),
        // dateRange: ['startDate new Date()', 'endDate new Date()'],
        teams: {
            a: {
                name: $(el).children('td:nth-child(6)').text(),
                wins: $(el).children('td:nth-child(7)').text(),
                favorite: boolCheck(teamAUrl, favUrl),
                underdog: boolCheck(teamAUrl, underdogUrl),
            },
            b: {
                name: $(el).children('td:nth-child(9)').text(),
                wins: $(el).children('td:nth-child(10)').text(),
                favorite: boolCheck(teamBUrl, favUrl),
                underdog: boolCheck(teamBUrl, underdogUrl),
            }
        }
    });
});
// console.log(data)

// fs.writeFileSync('data/zone8-location_data.json', JSON.stringify(data), data);
function writeFile(fsName, fsData) {
    fs.writeFileSync('data/' + fsName + '.json', JSON.stringify(fsData));
    console.log('*** *** *** *** ***');
    console.log('writeFile complete for', fsName);
};
writeFile('nbaSeriesData', data);