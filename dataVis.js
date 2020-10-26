// console.log('sim sim salabim');
$.getJSON("./data/nbaData.json", jsonData => {
    // console.log(jsonData)

    let data = [],
        favorites = [],
        favoritesColors = [],
        underdogs = [],
        underdogsColors = [],
        favoriteWinners = [],
        favoriteWinnersColors = [],
        favoriteLosers = [],
        favoriteLosersColors = [],
        underdogWinners = [],
        underdogWinnersColors = [],
        underdogLosers = [],
        underdogLosersColors = [];

    jsonData.forEach((el, i) => {
        // console.log(el.teams.b.colors[0]);
        // switch?

        if (el.teams.a.favorite == true && el.teams.a.favorite != el.teams.b.favorite) {
            favorites.push(el.teams.a)
            // console.log(el.teams.a)
            favoritesColors.push(el.teams.a.colors[0])
            // console.log(el.teams.a.colors[0])

            if (el.teams.a.wins > el.teams.b.wins) {
                favoriteWinners.push(el.teams.a)
                // console.log(el.teams.a)
                favoriteWinnersColors.push(el.teams.a.colors[0])
                // console.log(el.teams.a.colors[0])
                underdogLosers.push(el.teams.b)
                // console.log(el.teams.b)
                underdogLosersColors.push(el.teams.b.colors[0])
                // console.log(el.teams.b.colors[0])
            } else {
                favoriteLosers.push(el.teams.a)
                // console.log(el.teams.a)
                favoriteLosersColors.push(el.teams.a.colors[0])
                // console.log(el.teams.a.colors[0])
                underdogWinners.push(el.teams.b)
                // console.log(el.teams.b)
                underdogWinnersColors.push(el.teams.b.colors[0])
                // console.log(el.teams.b.colors[0])
            }
        } else if (el.teams.b.favorite == true && el.teams.b.favorite != el.teams.a.favorite) {
            favorites.push(el.teams.b)
            // console.log(el.teams.b)

            if (el.teams.b.wins > el.teams.a.wins) {
                favoriteWinners.push(el.teams.b)
                // console.log(el.teams.b)
                favoriteWinnersColors.push(el.teams.b.colors[0])
                // console.log(el.teams.b.colors[0])
                underdogLosers.push(el.teams.a)
                // console.log(el.teams.a)
                underdogLosersColors.push(el.teams.a.colors[0])
                // console.log(el.teams.a.colors[0])
            } else {
                favoriteLosers.push(el.teams.b)
                // console.log(el.teams.b)
                favoriteLosersColors.push(el.teams.b.colors[0])
                // console.log(el.teams.b.colors[0])
                underdogWinners.push(el.teams.a)
                // console.log(el.teams.a)
                underdogWinnersColors.push(el.teams.a.colors[0])
                // console.log(el.teams.a.colors[0])
            }
        }

        if (el.teams.a.underdog == true && el.teams.a.underdog != el.teams.b.underdog) {
            underdogs.push(el.teams.a)
            underdogsColors.push(el.teams.a.colors[0])
        } else if (el.teams.b.underdog == true && el.teams.b.underdog != el.teams.a.underdog) {
            underdogs.push(el.teams.b)
            underdogsColors.push(el.teams.b.colors[0])
        }
    })
    // console.log(favorites)
    // console.log(favoriteLosers)

    const findDuplicates = (arr) => {
        let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
        // JS by default uses a crappy string compare.
        // (we use slice to clone the array so the
        // original array won't be modified)
        let results = [];
        for (let i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }
        return results;
    }
    // console.log(`The duplicates in ${favoritesColors} are ${findDuplicates(favoritesColors)}`);

    let uniqueFavoritesColors = [];
    let uniqueUnderdogsColors = [];
    let uniqueFavoriteWinnersColors = [];
    let uniqueFavoriteLosersColors = [];
    let uniqueUnderdogWinnersColors = [];
    let uniqueUnderdogLosersColors = [];

    // $.each(favoritesColors, (i, el) => {
    //     if ($.inArray(el, uniqueFavoritesColors) === -1) uniqueFavoritesColors.push(el);
    // });
    // console.log(uniqueFavoritesColors)

    let colorArrBuild = function(oldArr, newArr) {
        $.each(oldArr, (i, el) => {
            if ($.inArray(el, newArr) === -1) newArr.push(el);
        });
    }
    colorArrBuild(favoritesColors, uniqueFavoritesColors);
    console.log("uniqueFavoritesColors (" + uniqueFavoritesColors.length + "): " + uniqueFavoritesColors)
    colorArrBuild(underdogsColors, uniqueUnderdogsColors);
    console.log("uniqueUnderdogsColors (" + uniqueUnderdogsColors.length + "): " + uniqueUnderdogsColors)
    colorArrBuild(favoriteWinnersColors, uniqueFavoriteWinnersColors);
    console.log("uniqueFavoriteWinnersColors (" + uniqueFavoriteWinnersColors.length + "): " + uniqueFavoriteWinnersColors)
    colorArrBuild(favoriteLosersColors, uniqueFavoriteLosersColors);
    console.log("uniqueFavoriteLosersColors (" + uniqueFavoriteLosersColors.length + "): " + uniqueFavoriteLosersColors)
    colorArrBuild(underdogWinnersColors, uniqueUnderdogWinnersColors);
    console.log("uniqueUnderdogWinnersColors (" + uniqueUnderdogWinnersColors.length + "): " + uniqueUnderdogWinnersColors)
    colorArrBuild(underdogLosersColors, uniqueUnderdogLosersColors);
    console.log("uniqueUnderdogLosersColors (" + uniqueUnderdogLosersColors.length + "): " + uniqueUnderdogLosersColors)



    // data.push({
    //     favorites: favorites,
    //     underdogs: underdogs,
    //     favoriteWinners: favoriteWinners,
    //     favoriteLosers: favoriteLosers,
    //     underdogWinners: underdogWinners,
    //     underdogLosers: underdogLosers,
    //     favoritesColors: favoritesColors,
    //     underdogsColors: underdogsColors,
    //     favoriteWinnersColors: favoriteWinnersColors,
    //     favoriteLosersColors: favoriteLosersColors,
    //     underdogWinnersColors: underdogWinnersColors,
    //     underdogLosersColors: underdogLosersColors,
    // });
    // console.log(data);
    // console.log(data[0].favorites);

    // let workingData = data[0].favorites;

    // =================================================
    //    let svg = d3.select("#chart"),
    //         width = +svg.attr("width"),
    //         height = +svg.attr("height"),
    //         margin = 40;

    //     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //     let radius = Math.min(width, height) / 2 - margin

    //     // append the svg object to the div called 'my_dataviz'
    //     svg
    //         .append("svg")
    //         .attr("width", width)
    //         .attr("height", height)
    //         .append("g")
    //         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // =================================================

    // let width = 450
    // let width = 450
    // height = 450
    // margin = 40

    // // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    // let radius = Math.min(width, height) / 2 - margin

    // // append the svg object to the div called 'my_dataviz'
    // let svg = d3.select("#chart")
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .append("g")
    //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // // set the color scale
    // let color = d3.scaleOrdinal()
    //     .domain(data.favorites)
    //     .range(data.favoritesColors)

    // // Compute the position of each group on the pie:
    // let pie = d3.pie()
    //     .value((d) => {
    //         return d.name;
    //     })
    // let data_ready = pie(d3.entries(data.favorites))

    // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    // svg
    //     .selectAll('slices')
    //     .data(data_ready)
    //     .enter()
    //     .append('path')
    //     .attr('d', d3.arc()
    //         .innerRadius(0)
    //         .outerRadius(radius)
    //     )
    //     .attr('fill', (d) => {
    //         return (color(d.colors[0]))
    //     })
    //     // .attr("stroke", "black")
    //     // .style("stroke-width", "2px")
    //     .style("opacity", 0.7)
})