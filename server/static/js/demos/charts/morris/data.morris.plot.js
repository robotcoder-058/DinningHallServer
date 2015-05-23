/**
 * Created by chenyi on 14-5-25.
 */
$(function() {
    if ((!$('#diningHallTrain')) && (!$('#diningHallTiems'))) {
        return false;
    }
    diningHallTrain();
    diningHallTimes();


    $("#sum").text(getData.data.sum.toString());
    $('#times').text(getData.data.timesum.toString());
    $('#mean').text(getData.data.trainmean.toString());


    $(window).resize (App.debounce (diningHallTrain, 325));
    $(window).resize (App.debounce (diningHallTimes, 325))
});

function diningHallTrain() {
	$('#diningHallTrain').empty();
    var i = getData.data.groupbysum.length;
    var bardata = [];
    for(j=0 ;j<i ;j++) {
        for(var x in getData.data.groupbysum[j]){
            var temp = {
                y: x,
                总额: getData.data.groupbysum[j][x]

            };
            bardata.push(temp)
        }
    }

	Morris.Bar({
		element: 'diningHallTrain',
        data: bardata,
		xkey: 'y',
		ykeys: ['总额'],
		labels: ['总额'],
		barColors: App.chartColors,
        xLabelAngle: 35,
        hideHover: 'auto'

	});
}

function diningHallTimes() {
    $('#diningHallTimes').empty ();
    var i = getData.data.groupbytimes.length;
    var bardata = [];
    for(j=0 ;j<i ;j++) {
        for(var x in getData.data.groupbytimes[j]){
            var temp = {
                y: x,
                总次: getData.data.groupbytimes[j][x]

            };
            bardata.push(temp)
        }
    }

	Morris.Bar({
		element: 'diningHallTimes',
        data: bardata,
		xkey: 'y',
		ykeys: ['总次'],
		labels: ['总次'],
		barColors: App.chartColors,
        xLabelAngle: 35,
        hideHover: 'auto'
	});
}