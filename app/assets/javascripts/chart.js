

document.addEventListener('DOMContentLoaded', function () {

    const historicalSuccess = (data) => {
        const historicalDataF = json.map(entry => entry.tempf)
            const historicalDataC = json.map(entry => entry.tempc)
            const recordLows = json.map(entry => entry.record_lowf)
            const recordHighs = json.map(entry => entry.record_highf)
            const recordsZipped = json.map(entry => {
                return {low: entry.record_lowf, high: entry.record_highf}
            })
            console.log(recordsZipped)
            
            const historicalStartDate = json[0].date
    } 

    const buildCharts = function () {
        fetch('/historical_entries')
        .then((res) => res.json())
        .then((json) => {
            const historicalDataF = json.map(entry => entry.tempf)
            const historicalDataC = json.map(entry => entry.tempc)
            const recordLows = json.map(entry => entry.record_lowf)
            const recordHighs = json.map(entry => entry.record_highf)
            const recordsZipped = json.map(entry => {
                return {low: entry.record_lowf, high: entry.record_highf}
            })
            console.log(recordsZipped)
            
            const historicalStartDate = json[0].date

            fetch('/forecast_entries')
            .then((res) => res.json())
            .then((json) => {
                const forecastDataF = json.map(entry => entry.tempf)
                const forecastDataC = json.map(entry => entry.tempc)
                const forecastStartDate = json[0].date

                let chartOne= new Highcharts.stockChart({
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

                // let chartTwo = new Highcharts.stockChart({
                //     chart: {
                //         renderTo: 'chart_two',
                //         type: 'arearange',

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
                //         name: 'Record High/Low',
                //         data: recordsZipped,
                //         pointStart: Date.parse(historicalStartDate),
                //         pointInterval: 3600 * 1000, // one hour
                //         type: 'dumbbell'
                //     }]
                // });
            })
        })
    }
    buildCharts()

    Highcharts.getJSON(
        '/temperature_entries',
        success
    );
});

