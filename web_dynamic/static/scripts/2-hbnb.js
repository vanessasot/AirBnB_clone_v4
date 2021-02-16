$(document).ready(function () {
  const My_Amenities = [];
  $('div .amenities .popover ul li INPUT').click(function () {
    const The_Amenity = $(this).attr('data-name');

    $('div .amenities h4').css({
      width: '89%',
      height: '89%',
      overflow: 'hidder',
      padding-bottom: '14px'
    });

    if ($(this).is(':checked')) {
      My_Amenities.push(The_Amenity);
    } else {
      const a = My_Amenities.indexOf(The_Amenity);
      My_Amenities.splice(a, 1);
    }
    $('div.amenities h4').text(myAmenities.join(', '));
  });
});

const url = 'http://0.0.0.0:5001/api/v1/status/';
$.get(url, function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
