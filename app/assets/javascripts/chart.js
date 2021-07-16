document.addEventListener('DOMContentLoaded', function () {

    refresh_entries()

    setInterval(function() {
        refresh_entries()
    }, 1000 * 30)

    const buildCharts = function(chartOneOptions, chartTwoOptions) {
        let chartOne = new Highcharts.stockChart(chartOneOptions);
        let chartTwo = new Highcharts.stockChart(chartTwoOptions);
    }

    function refresh_entries() {
        fetch('/temperature_entries')
        .then((res) => res.json())
        .then((data) => {
            console.log('refreshing data')
            
            const historicalEntries = data.filter(data => data.historical)
            const forecastEntries = data.filter(data => !data.historical)

            
            // Historical datapoints
            const historicalDataF = historicalEntries.map(entry => entry.tempf)
            const historicalDataC = historicalEntries.map(entry => entry.tempc)
            const threeHourIntervals = historicalEntries.filter(entry => entry.date.hour % 3 === 0)

            const recordLows = historicalEntries.map(entry => entry.record_lowf)
            const recordHighs = historicalEntries.map(entry => entry.record_highf)
            const recordsZipped = historicalEntries.map(entry => {
                return {low: entry.record_lowf, high: entry.record_highf}
            })

            const historicalStartDate = new Date(historicalEntries[0].date)
            // Forecast datapoints
            const forecastStartDate = new Date(forecastEntries[0].date)
            const forecastDataF = forecastEntries.map(entry => entry.tempf)
            const forecastDataC = forecastEntries.map(entry => entry.tempc)

            const optionsOne = {
                chart: {
                    renderTo: 'chart_one',
                    type: 'line',
                    width: '1000'
                },
                rangeSelector: {
                    selected: 1,
                    buttons: [{
                        type: 'day',
                        count: 1,
                        text: 'cd',
                        title: 'View Current Day'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '1w',
                        title: 'View 1 Week'
                    }, {
                        type: 'all',
                        text: 'All',
                        title: 'View all'
                    }]
                },
                title: {
                    text: 'Austin HQ Temperature'
                },
                subtitle: {
                    text: 'Previous Month at 1-Hour Intervals'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Temperature(C/F)'
                    },
                },
                series: [{
                    name: 'Historical Temperature(F)',
                    data: historicalDataF,
                    pointStart: Date.parse(historicalStartDate),
                    pointInterval: 3600 * 1000 // one hour
                },
                {
                    name: 'Forecasted Temperature(F)',
                    data: forecastDataF,
                    pointStart: Date.parse(forecastStartDate),
                    pointInterval: 3600 * 1000  // one hour
                },
                {
                    name: 'Historical Temperature(C)',
                    data: historicalDataC,
                    pointStart: Date.parse(historicalStartDate),
                    pointInterval: 3600 * 1000 // one hour
                },
                {
                    name: 'Forecasted Temperature(C)',
                    data: forecastDataC,
                    pointStart: Date.parse(forecastStartDate),
                    pointInterval: 3600 * 1000  // one hour
                }]
            }

            const optionsTwo = {
                chart: {
                    renderTo: chart_two,
                    type: 'arearange',
                    width: '1000'
                },
            
                legend: {
                    enabled: false
                },
            
                title: {
                    text: 'Record Highs and Lows'
                },
    
                subtitle: {
                    text: '1 Month, 3-hour Intervals'
                },
            
                tooltip: {
                    shared: true
                },
            
                xAxis: {
                    type: 'datetime'
                },
            
                yAxis: {
                    title: {
                        text: 'Temperature(F)'
                    }
                },
            
                series: [{
                    name: 'Record Highs and Lows',
                    data: recordsZipped,
                    pointStart: Date.parse(historicalStartDate),
                    pointInterval: 3600 * 1000  // one hour
                }]
            }
            buildCharts(optionsOne, optionsTwo)
        });
    }
});

