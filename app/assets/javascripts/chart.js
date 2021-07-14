document.addEventListener('DOMContentLoaded', function () {

    const buildCharts = function () {
        fetch('/historical_entries')
        .then((res) => res.json())
        .then((json) => {
            const historicalDataF = json.map(entry => entry.tempf)
            const historicalDataC = json.map(entry => entry.tempc)
            const recordLows = json.map(entry => entry.record_lowf)
            const recordHighs = json.map(entry => entry.record_highf)
            const historicalStartDate = json[0].date

            fetch('/forecast_entries')
            .then((res) => res.json())
            .then((json) => {
                const forecastDataF = json.map(entry => entry.tempf)
                const forecastDataC = json.map(entry => entry.tempc)
                const forecastStartDate = json[0].date

                let chartOne= new Highcharts.Chart({
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

                let chartTwo = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart_two',
                        type: 'line'
                    },
                    rangeSelector: {
                        selected: 1
                    },
            
                    title: {
                        text: 'Highs and Lows'
                    },
            
                    xAxis: {
                        type: 'datetime'
                    },
            
                    series: [{
                        name: 'Record Lows',
                        data: recordLows,
                        pointStart: Date.parse(historicalStartDate),
                        pointInterval: 3600 * 1000 // one hour
                    },
                    {
                        name: 'Record Highs',
                        data: recordHighs,
                        pointStart: Date.parse(historicalStartDate),
                        pointInterval: 3600 * 1000  // one hour
                    }]
                });
            })
        })
    }
    buildCharts()
});

