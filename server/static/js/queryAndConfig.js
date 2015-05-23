/**
 * Created by chenyi on 14-5-25.
 */
var getData;

$(function () {
    var result;
    var queryPath;
    var flag;

    var dateString = $('#content-header').children('h1').text();
    alert(dateString);


    switch (dateString) {
        case "昨日数据":
            queryPath = '/lastdaydata';
            flag = 'd';
            break;
        case "上星期数据":
            queryPath = '/lastweekdata';
            flag = 'w';
            break;
        case "上月数据":
            queryPath = '/lastmonthdata';
            flag = 'm';
            break;
        case "上年数据":
            queryPath = '/lastyeardata';
            flag = 'y';
            break;
    }


    $.ajax({
        type: "get",
        async: false,
        url: queryPath,
//        dataType: "json",
        cache: false,

        success: function (msg) {
            result = msg
        },
        error: function (err) {
            alert(err);
        }
    });

    alert(result.sum);
    getData = serverData(result, flag);

    alert(getData.data.trainmean);
    return getData

});

function serverData(result, flag) {

    this.data = result;
    return this
}