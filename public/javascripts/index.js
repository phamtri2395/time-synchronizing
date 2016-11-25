$(document).ready(function() {
  $('#getTime').click(function() {
    var host = 'http://' + window.location.hostname + ':' + $('#port').attr('value');
    var path = '/now/';
    var utc = parseInt($('#utc').val()) || 0;

    if (utc === 0) {
      utc = '+00';
    }
    if (utc > -10 && utc < 0) {
      utc = Math.abs(utc);
      utc = '-0' + utc.toString();
    }
    if (utc > 0 && utc < 10) {
      utc = '0' + utc.toString();
    }
    if (parseInt(utc) > 0) {
      utc = '+' + utc;
    }

    var url = host + path + utc;
    $.get(url, function(data) {
      $('#currentTime').text('Current time on UTC ' + utc + ' is: ' + data.time);
    });
  });
});
