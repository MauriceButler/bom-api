var request = require('request'),
    wrapCallback = require('request-callback-wrapper');

var IDCodes = {
    tas: 'IDT60801',
    vic: 'IDV60801',
    nsw: 'IDN60801',
    qld: 'IDQ60801',
    sa: 'IDS60801',
    wa: 'IDW60801',
    nt: 'IDD60801',
    act: 'IDN60903'
};

function getBomDataBySiteNumberState(siteNumber, stateName, callback) {
    var url = 'http://www.bom.gov.au/fwo/' + IDCodes[stateName] + '/' + IDCodes[stateName] + '.' + siteNumber + '.json';

    request({url:url, json: true}, wrapCallback(function(error, data) {
        if(error || !data || !data.observations || !data.observations.data){
            return callback('Incorrect state and siteNumber combination: ' + error);
        }

        var observationData = data.observations.data;
        var bomInfoArray = [];

        for (var i = 0; i < observationData.length; i++) {

            var bomInfo = {
                air_temp: observationData[i].air_temp,
                apparent_t: observationData[i].apparent_t,
                rel_hum: observationData[i].rel_hum,
                local_date_time_full: observationData[i].local_date_time_full,
                utc_date_time_full: observationData[i].aifstime_utc
            };
            bomInfoArray.push(bomInfo);
        }
        callback(null, bomInfoArray);
    }));
}
module.exports = getBomDataBySiteNumberState;
