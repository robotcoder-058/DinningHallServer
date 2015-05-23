/**
 *
 * Created by chenxiaoqiang on 14-7-30.
 */

var getData;
var numOfObjects = 20;
$(function() {
    var result;
    var selectQuery = {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        selectedObjects: [],
        selectOptions: []
    };
    $('#result-container').hide();

    $('#dpStart').datepicker().on('changeDate', function (e) {
        $('#dpEnd').datepicker('setStartDate', e.date);
    });

    $('#dpEnd').datepicker().on('changeDate', function (e) {
        $('#dpStart').datepicker('setEndDate', e.date)
    });

    $('#tp-start').timepicker({showMeridian: false});
    $('#tp-end').timepicker({showMeridian: false});

    $('input:checkbox, input:radio').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        inheritClass: true
    });

    $('#dpStart').datepicker().on('changeDate', function (e) {
        selectQuery.startDate = e.date.valueOf();
    });

    $('#dpEnd').datepicker().on('changeDate', function (e) {
        selectQuery.endDate = e.date.valueOf();
    });

    $('#tp-start').timepicker().on('changeTime.timepicker', function (e) {
        selectQuery.startTime = e.time.value;
    });

    $('#tp-end').timepicker().on('changeTime.timepicker', function (e) {
        selectQuery.endTime = e.time.value;
    });

    $('#objects input').on('ifChecked', function (event) {
        if (!(in_array(selectQuery.selectedObjects, this.value))) {
            selectQuery.selectedObjects.push(this.value)
        }
    });
    $('#options input').on('ifChecked', function (event) {
        if (!(in_array(selectQuery.selectOptions, this.value))) {
            selectQuery.selectOptions.push(this.value);
            alert(selectQuery.selectOptions.length)
        }
    });
    $('#options input').on('ifChanged', function (event) {
        if ((in_array(selectQuery.selectedObjects, this.value))) {
            selectQuery.selectedObjects = delectEml(selectQuery.selectedObjects, this.value);
        }
    });
    $('#options input').on('ifChanged', function (event) {
        if ((in_array(selectQuery.selectOptions, this.value))) {
            selectQuery.selectOptions = delectEml(selectQuery.selectOptions, this.value);
            alert(selectQuery.selectOptions.length)
        }
    });

    $('#content-container').append('<div class="progress progress-striped active" id="progress">' +
        '<div class="progress-bar progress-bar-primary" id="wait-bar" role="progressbar" ' +
        'aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' +
        '<span class="sr-only">31% Complete</span>' +
        '</div></div>');
    $('#progress').hide();

    $('#submit').click(function(){
        if($('#tp-end').timepicker().value < $('#tp-start').timepicker.value) {
            alert('终止时间必须大于起始时间')
        }
        for(i=0; i<selectQuery.selectOptions; i++){
            alert(selectQuery.selectOptions[i])
        }

        $('#submit').hide();
        $('#progress').show();

        var sendData = $.toJSON(selectQuery);
        $.ajax({
            type: "get",
            async: false,
            url: "selectdatedata",
            cache: false,
            dataType: 'json',
            data: 'json=' + sendData,
            success: function (msg) {
            result = msg;
            $("#progress").hide();
            $("#submit").show();
            resultPlot(result)
        },
        error: function (err) {
            console.log(err);

        }
        });

    });

    function resultPlot(result) {
        $('#result-container').show();


        try{
            if(in_array(selectQuery.selectOptions, 'sum')) {
                trainsum(result);
            } else {
                $('#sumarea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }

        try {
            if(in_array(selectQuery.selectOptions, 'timessum')) {
                timessum(result);
            } else {
                $('#timesarea').hide()
            }
        } catch (e){
            console.log(e.toString())
        }

        try {
            if(in_array(selectQuery.selectOptions, 'trainmean')) {
                trainmean(result);
            } else {
                $('#trainmeanarea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }

        try {
            if (in_array(selectQuery.selectOptions, 'allsumchange')) {
                allchangePlot(result['allsumchange'], '#allsumchange', '总体金额变化');
            } else {
                $('#allsumchangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }

        try {
            if (in_array(selectQuery.selectOptions, 'alltimeschange')) {
                allchangePlot(result.alltimeschange, '#alltimeschange', '总体次数变化');
            } else {
                $('#alltimeschangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }

        try {
            if (in_array(selectQuery.selectOptions, 'allmeanchange')) {
                allchangePlot(result.allmeanchange, '#allmeanchange', '总体每餐平均变化');
            } else {
                $('#allmeanchangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'meanchange')) {
                changePlot(result.meanchange, '#meanchange');
            } else {
                $('#meanchangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'sumchange')) {
                changePlot(result.sumchange, '#sumchange');
            } else {
                $('#sumchangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'timeschange')) {
                changePlot(result.timeschange, '#timeschange');
            } else {
                $('#timeschangearea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'groupbysum')) {
                groupbysum(result);
                $(window).resize(App.debounce(groupbysum, 325));
            } else {
                $('#groupbysumarea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'groupbytimes')) {
                groupbytimes(result);
                $(window).resize(App.debounce(groupbytimes, 325));
            } else {
                $('#groupbytimesarea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }
        try {
            if (in_array(selectQuery.selectOptions, 'groupbymean')) {
                groupbymean(result);
                $(window).resize(App.debounce(groupbymean, 325));
            } else {
                $('#groupbymeanarea').hide()
            }
        } catch (e) {
            console.log(e.toString())
        }

    }

    getData = serverData(result);

    return getData
})

function serverData(result) {
    this.data = result;
    return this
}
function trainsum(result) {
    $('#sum').text(result.sum.toString())
}
function timessum(result) {
    $('#times').text(result.timessum.toString())
}
function trainmean(result) {
    $('#trainmean').text(result.trainmean.toString())
}
function groupbysum(result) {
	$('#groupbysum').empty();
    var i = result.groupbysum.length;
    var bardata = [];
    for(j=0 ;j<i ;j++) {
        for(x in result.groupbysum[j]){
            var temp = {
                y: x,
                总额: result.groupbysum[j][x]

            };
            bardata.push(temp)
        }
    }

	Morris.Bar({
		element: 'groupbysum',
        data: bardata,
		xkey: 'y',
		ykeys: ['总额'],
		labels: ['总额'],
		barColors: App.chartColors,
        xLabelAngle: 35,
        hideHover: 'auto'

	});
}
function groupbytimes(result) {
	$('#groupbytimes').empty();
    var i = result.groupbytimes.length;
    bardata = [];
    for(j=0 ;j<i ;j++) {
        for(x in result.groupbytimes[j]){
            var temp = {
                y: x,
                总次: result.groupbytimes[j][x]

            };
            bardata.push(temp)
        }
    }

	Morris.Bar({
		element: 'groupbytimes',
        data: bardata,
		xkey: 'y',
		ykeys: ['总次'],
		labels: ['总次'],
		barColors: App.chartColors,
        xLabelAngle: 35,
        hideHover: 'auto'

	});
}
function groupbymean(result) {
	$('#groupbymean').empty();
    var i = result.groupbymean.length;
    bardata = [];
    for(j=0 ;j<i ;j++) {
        for(x in result.groupbymean[j]){
            var temp = {
                y: x,
                平均: result.groupbymean[j][x]

            };
            bardata.push(temp)
        }
    }

	Morris.Bar({
		element: 'groupbymean',
        data: bardata,
		xkey: 'y',
		ykeys: ['平均'],
		labels: ['平均'],
		barColors: App.chartColors,
        xLabelAngle: 35,
        hideHover: 'auto'

	});
}
function allchangePlot(data, holder, label) {

    var train_options;
    var train;
    var train_data = data;



    train =  [{
        label: label,
        data: train_data
    }];



    train_options = {
        xaxis: {
//            min: data.min,
//            max: data.max,
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

    var train_holder =  $(holder);

    if (train_holder.length) {
        $.plot(train_holder, train, train_options)
    };
}


function changePlot(data,holder) {

    var train_options;
    var train = [];
    var train_data = data;

    for(var i in data) {
        temp = {
            label: i,
            data: data[i]
        }
        train.push(temp)
    }


    train_options = {
        xaxis: {
            min: data.min,
            max: data.max,
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

    var train_holder =  $(holder);

    if (train_holder.length) {
        $.plot(train_holder, train, train_options)
    };
}
function in_array(array, elm) {
    for (i = 0; i < array.length; i++) {
        if (elm == array[i]) {
            return true
        }
    }
    return false
}

function delectEml(array, elm) {
    var temp = [];
    for (i = 0; i < array.length; i++) {
        if (elm != array[i]) {
            temp.push(array[i])
        }
    }
    return temp;
}