document.addEventListener('DOMContentLoaded', function () {

    const fetch_temperature_entries = function(data) {
        fetch('/temperature_entries')
        .then((res) => res.json())
        .then((json) => buildCharts(json))
    }

    const buildCharts = function(data) {
        const historicalEntries = data.filter(data => data.historical)
        const forecastEntries = data.filter(data => !data.historical)

        
        // Historical datapoints
        const historicalDataF = historicalEntries.map(entry => entry.tempf)
        const historicalDataC = historicalEntries.map(entry => entry.tempc)
        const recordLows = historicalEntries.map(entry => entry.record_lowf)
        const recordHighs = historicalEntries.map(entry => entry.record_highf)
        const recordsZipped = historicalEntries.map(entry => {
            return {low: entry.record_lowf, high: entry.record_highf}
        })
        const historicalStartDate = historicalEntries[0].date
        // Forecast datapoints
        const forecastStartDate = forecastEntries[0].date
        const forecastDataF = forecastEntries.map(entry => entry.tempf)
        const forecastDataC = forecastEntries.map(entry => entry.tempc)

        let chartOne = new Highcharts.stockChart({
            chart: {
                renderTo: 'chart_one',
                type: 'line'
            },
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'Austin HQ Temperature'
            },
            subtitle: {
                text: 'Previous Month at 1:00 Hour Intervals'
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
        });

        // let chartTwo = new Highcharts.chart({
        //     chart: {
        //         renderTo: 'chart_two',
        //         type: 'line',
        //     },
        //     rangeSelector: {
        //         selected: 1
        //     },
        //     tooltip: {
        //         shared: true
        //     },
        //     title: {
        //         text: 'Austin HQ Record Highs and Lows'
        //     },
        //     subtitle: {
        // 		text: 'Previous Month at 3:00 Hour Intervals'
        // 	},
        //     xAxis: {
        //         type: 'datetime'
        //     },
        //     series: [{
        //         name: 'Record Low',
        //         data: recordLows,
        //         pointStart: Date.parse(historicalStartDate),
        //         pointInterval: 3600 * 1000, // one hour
        //     },
        //     {
        //         name: 'Record High',
        //         data: recordHighs,
        //         pointStart: Date.parse(historicalStartDate),
        //         pointInterval: 3600 * 1000, // one hour
        //     }]
        // });

        // Highcharts.chart('chart_two', {

        //     rangeSelector: {
        //         selected: 4
        //     },
    
        //     plotOptions: {
        //         series: {
        //             showInNavigator: true
        //         }
        //     },
    
        //     tooltip: {
        //         pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} USD</b><br/>',
        //         valueDecimals: 2
        //     },
    
        //     series: [{
        //         name: 'Record Low',
        //         data: recordLows,
        //         pointStart: Date.parse(historicalStartDate),
        //         pointInterval: 3600 * 1000, // one hour
        //     },
        //     {
        //         name: 'Record High',
        //         data: recordHighs,
        //         pointStart: Date.parse(historicalStartDate),
        //         pointInterval: 3600 * 1000, // one hour
        //     }]
        // });
    }
    fetch_temperature_entries()
    
});

