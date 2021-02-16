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

const data = {};

$.ajax({
  url: 'http://127.0.0.1:5001/api/v1/places_search',
  method: 'POST',
  dataType: 'json',
  contentType: 'application/json',
  data: JSON.stringify(data),
  success: function (result) {
    $.each(result, (i, place) => {
      $('section.places').append(`
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">${place.description}</div>
      </article>`);
    });
  }
});

$('button#filterButton').click(function () {
    $('article').remove();
    const place = { amenities: Object.keys(amenityDict) };
    console.log(Object.keys(amenityDict).length);
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(place),
      contentType: 'application/json',
      dataType: 'json',
      success: function (places) {
        $.each(places, function (iterator, place) {
          $('section.places').append(`<ARTICLE><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guest</div><div class="number_rooms">${place.number_rooms} Bedroom</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></ARTICLE>`);
        });
      }
    });
  });
});
