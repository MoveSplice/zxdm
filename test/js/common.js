
$(function() {
    var pieOpts = {
        credits: {
            enabled: false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: null
    }

    var dataSource = [];
    for (let pool of globals.pools) {
        dataSource.push({
            name: pool.name,
            y: pool.p
        });
    }
    var series = [{
        name: "百分比",
        colorByPoint: true,
        data: dataSource
    }];

    $('.pool-panel-percentage-pie-chart-inner').highcharts($.extend({}, pieOpts, { series: series }));
})
                                