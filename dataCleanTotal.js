// console.log('sim sim salabim')

let fs = require('fs');
let cheerio = require('cheerio');

let dataModel = {
    id: 1,
    yr: 2018,
    series: 'string',
    date: 'Apr 28 - May 10, 2019',
    dateRange: ['startDate new Date()', 'endDate new Date()'],
    teams: {
        a: {
            name: 'String',
            wins: 4,
            favorite: true,
            underdog: false,
            colors: ['#000000', '#ffffff']
        },
        b: {
            name: 'String',
            wins: 0,
            favorite: false,
            underdog: true,
            colors: ['#000000', '#ffffff']
        },
    }
}

let data = [];

// base data
let seriesDataClean = function (fileName) {
    // assign + read 
    let content = fs.readFileSync('data/' + fileName + '.txt');

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

        let boolCheck = function (teamUrl, favUnder) {
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
                    name: $(el).children('td:nth-child(6)').text().split(' (')[0],
                    wins: parseInt($(el).children('td:nth-child(7)').text()),
                    favorite: boolCheck(teamAUrl, favUrl),
                    underdog: boolCheck(teamAUrl, underdogUrl),
                },
                b: {
                    name: $(el).children('td:nth-child(9)').text().split(' (')[0],
                    wins: parseInt($(el).children('td:nth-child(10)').text()),
                    favorite: boolCheck(teamBUrl, favUrl),
                    underdog: boolCheck(teamBUrl, underdogUrl),
                }
            }
        });
    });
}
seriesDataClean('nbaSeriesData');

// team colors
let colorDataClean = function (fileName) {
    // console.log(data)

    // assign + read 
    let content = fs.readFileSync('data/' + fileName + '.txt');

    let $ = cheerio.load(content);
    // console.log($)

    // el query selector
    let queryEl = $(".team-button");
    // console.log(queryEl.html());

    data.forEach((dataEl, i) => {
        // print to console/terminal
        queryEl.each((i, el) => {
            // console.log(i);
            // console.log($(el).text()); // team name
            // console.log($(el).css('background-color')); // colorOne
            // console.log(($(el).css('border-bottom')).substring(($(el).css('border-bottom').indexOf('#') + 1))); // colorTwo
            // console.log(($(el).css('border-bottom')).split("#").pop()) // colorTwo

            let teamName = $(el).text();
            let colorOne = $(el).css('background-color');
            let colorTwo = ($(el).css('border-bottom')).split("#").pop()

            let colorsArr = []
            // console.log(dataEl.teams.a.name)
            if (teamName == dataEl.teams.a.name) {
                // console.log('a: ' + teamName)

                colorsArr.push(colorOne, ('#' + colorTwo));
                dataEl.teams.a.colors = colorsArr

            } else if (teamName == dataEl.teams.b.name) {
                // console.log('b: ' + teamName)

                // dataEl.teams.b.colors.push(colorOne, colorTwo)
                colorsArr.push(colorOne, ('#' + colorTwo));
                dataEl.teams.b.colors = colorsArr
            }
        });
    })
}
colorDataClean('nbaColorsData');

// remove empty items
let removeEmpty = function () {
    // console.log(data)

    // remove
    let i = data.length
    while (i--) {
        if (
            data[i].series == ""
            || data[i].teams.a.hasOwnProperty("colors") == false 
            || data[i].teams.b.hasOwnProperty("colors") == false
        ) {
            data.splice(i, 1);
        }
    }

    // re numbner id
    data.forEach((el, i) => {
        el.id = i;
    })
}
removeEmpty()

// console.log(data)
// fs.writeFileSync('data/zone8-location_data.json', JSON.stringify(data), data);
function writeFile(fsName, fsData) {
    fs.writeFileSync('data/' + fsName + '.json', JSON.stringify(fsData));
    console.log('*** *** *** *** ***');
    console.log('writeFile complete for', fsName);
};
writeFile('nbaData', data);