$('input[type=text]').numeric({ decimal: false, negative: false });
$('input[type=text]').focus(function () {
	$(this).val('');
	$(this).next().html('');
});

var result_1 = 0,
	result_2 = 0,
	rating_1 = 0,
	rating_2 = 0,
	K_1 = 0,
	K_2 = 0,
	diff_1 = 0,
	diff_2 = 0,
	win_expectancy_1 = 0
	win_expectancy_2 = 0
	new_rating_1 = 0,
	new_rating_2 = 0;

function calculate() {

	var winner = document.getElementsByName('winner');
	for (var i = 0; i < winner.length; ++i ){
		if (winner[i].checked) {
			result_1 = (winner[i].value == "black") ? 0 : (winner[i].value == "white") ? 1 : 0.5;
			break;
		}
	}

	rating_1 = parseInt(document.getElementById('player_1_rating').value, 10);
	rating_2 = parseInt(document.getElementById('player_2_rating').value, 10);

	if ( isNaN(rating_1) || rating_1 === undefined ) rating_1 = 1200;
	if ( isNaN(rating_2) || rating_2 === undefined ) rating_2 = 1200;

	document.getElementById('player_1_rating').value = String(rating_1);
	document.getElementById('player_2_rating').value = String(rating_2);

	K_1 = (rating_1 < 2100) ? 32: (rating_1 < 2400) ? 24 : 16;
	K_2 = (rating_2 < 2100) ? 32: (rating_2 < 2400) ? 24 : 16;

	//result_1 = 1; // 1 = win, 0.5 = draw, 0 = loss
	result_2 = (result_1 === 1) ? 0 : (result_1 === 0) ? 1 : 0.5;

	diff_1 = ((rating_2 - rating_1) / 400);
	diff_2 = ((rating_1 - rating_2) / 400);

	win_expectancy_1 = 1 / ( Math.pow( 10, diff_1 ) + 1 );
	win_expectancy_2 = 1 / ( Math.pow( 10, diff_2 ) + 1 );

	new_rating_1 = Math.max( 100, Math.round(rating_1 + K_1 * (result_1 - win_expectancy_1)));
	new_rating_2 = Math.max( 100, Math.round(rating_2 + K_2 * (result_2 - win_expectancy_2)));

	document.getElementById('player_1_new_rating').innerHTML = String(new_rating_1);
	document.getElementById('player_2_new_rating').innerHTML = String(new_rating_2);
	$('.output').show();
}


