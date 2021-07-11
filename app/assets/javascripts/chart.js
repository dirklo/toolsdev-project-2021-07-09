document.addEventListener('DOMContentLoaded', function () {

    const buildChart = function () {
        fetch('/temperature_entries')
        .then((res) => res.json())
        .then((json) => {
            const data = json.map(entry => entry.tempf)
            const startDate = json[0].date

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
                    data: data,
                    pointStart: Date.parse(startDate),
                    pointInterval: 3600 * 1000 // one hour
                }]
            });
        })
    }
    buildChart()
    
});

