document.addEventListener('DOMContentLoaded', function () {

    const buildChart = function () {
        fetch('/historical_entries')
        .then((res) => res.json())
        .then((json) => {
            const historicalData = json.map(entry => entry.tempf)
            const historicalStartDate = json[0].date

            fetch('/forecast_entries')
            .then((res) => res.json())
            .then((json) => {
                const forecastData = json.map(entry => entry.tempf)
                const forecastStartDate = json[0].date

                Highcharts.stockChart('chart_one', {
                    rangeSelector: {
                        selected: 1
                    },
            
                    title: {
                        text: 'Austin Temperature'
                    },
            
                    xAxis: {
                        type: 'datetime'
                    },
            
                    series: [{
                        name: 'Temperature',
                        data: historicalData,
                        pointStart: Date.parse(historicalStartDate),
                        pointInterval: 3600 * 1000 // one hour
                    },
                    {
                        name: 'Forecasted Temperature',
                        data: forecastData,
                        pointStart: Date.parse(forecastStartDate),
                        pointInterval: 3600 * 1000  // one hour
                    }]
                });
            })
            fetch('/historical_highs_and_lows')
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                const highData = json.map(entry => entry.high)
                const lowData = json.map(entry => entry.low)
                // const historicalHighsAndLowsStartDate = json[0].date

                // Highcharts.stockChart('chart_two', {
                //     rangeSelector: {
                //         selected: 1
                //     },
            
                //     title: {
                //         text: 'Historical Highs and Lows'
                //     },
            
                //     xAxis: {
                //         type: 'datetime'
                //     },
            
                //     series: [{
                //         name: 'Low',
                //         data: lowData,
                //         pointStart: Date.parse(historicalHighsAndLowsStartDate),
                //         pointInterval: 3600 * 3000 // three hours
                //     },
                //     {
                //         name: 'High',
                //         data: highData,
                //         pointStart: Date.parse(historicalHighsAndLowsStartDate),
                //         pointInterval: 3600 * 3000 // three hours
                //     }]
                // });
            })
        })
    }
    buildChart()
});

