document.addEventListener('DOMContentLoaded', function () {

    // Fetch data from database and build chart options objects
    async function buildChartOptions() {
        const data = await $.ajax({url: '/temperature_entries' })

            // Historical datapoints
            const historicalEntries = data.filter(data => data.historical)
            const historicalDataF = historicalEntries.map(entry => entry.tempf)
            const historicalDataC = historicalEntries.map(entry => entry.tempc)
            const historicalStartDate = new Date(historicalEntries[0].date)
            
            // Forecast datapoints
            const forecastEntries = data.filter(data => !data.historical)
            const forecastDataF = forecastEntries.map(entry => entry.tempf)
            const forecastDataC = forecastEntries.map(entry => entry.tempc)
            const forecastStartDate = new Date(forecastEntries[0].date)

            // Records datapoints
            const threeHourIntervals = historicalEntries.filter(entry => new Date(entry.date).getHours() % 3 === 0)

            const recordsZipped = threeHourIntervals.map(entry => {
                return {low: entry.record_lowf, high: entry.record_highf}
            })
            const recordsStartDate = new Date(threeHourIntervals[0].date)

            // Compile datapoints into options objects
            const optionsOne = {
                chart: {
                    renderTo: 'chart_one',
                    type: 'line',
                    width: 1000
                },
                rangeSelector: {
                    selected: 2,
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
                    width: 1000
                },

                rangeSelector: {
                    selected: 2,
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
                    pointStart: Date.parse(recordsStartDate),
                    pointInterval: 3600 * 1000 * 3  // three hours
                }]
            }
            return {optionsOne: optionsOne, optionsTwo: optionsTwo}
    }

    // Call to build option objects and apply to charts
    // On first build (initial boolean), create the chart objects
    // Otherwise, update the chart objects.  Always update screen width on build.
    const buildCharts = async function(initial) {
        const { optionsOne, optionsTwo } = await buildChartOptions() 
        if (initial) {
            chartOne = new Highcharts.stockChart(optionsOne);
            chartTwo = new Highcharts.stockChart(optionsTwo);
        } else {
            chartOne.update(OptionsOne)
            chartTwo.update(OptionsTwo)
        }
        setChartWidth()
    }

    // Rebuild option objects every 30 minutes
    setInterval(function() {
        buildCharts(false)
    }, 1000 * 60 * 30) // 30 minutes

    setChartWidth = function() {
        if (window.innerWidth < 1000) {
            chartOne.setSize(window.innerWidth, 500)
            chartTwo.setSize(window.innerWidth, 500)
        }
    }

    // Listen for screen resize and adjust chart width accordinly.
    window.addEventListener('resize', () => {
        setChartWidth()
    }, false)

    document.getElementById('chart_one_cd_button').addEventListener('click', () => {
        date = new Date
        chartOne.xAxis[0].setExtremes(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        );
    });

    document.getElementById('chart_two_cd_button').addEventListener('click', () => {
        date = new Date
        chartTwo.xAxis[0].setExtremes(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        );
    });

    // Initial build
    buildCharts(true)
});

