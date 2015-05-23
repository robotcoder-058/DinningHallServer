/**
 * Created by chenyi on 14-5-25.
 */
$(function () {

//昨日消费金额图
    var train,train_options;
    var train_data = getData.data.resample;



    train =  [{
        label: "全校消费金额变化",
        data: train_data
    }];

    train_options = {
        xaxis: {
            min: getData.data.min,
            max: getData.data.max,
            mode: "time",
            tickSize: null,
            monthNames: null,
            tickLength: 0
        },
        yaxis: {

        },
        series: {
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4.5,
                fill: true,
                fillColor: "#ffffff",
                lineWidth: 2.75
            }
        },
       grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            show: true
        },

        tooltip: true,
        tooltipOpts: {
            content: '%s: %y'
        },
        colors: App.chartColors
    };

    var train_holder =  $('#train');

    if (train_holder.length) {
        $.plot(train_holder, train, train_options)
    };


});