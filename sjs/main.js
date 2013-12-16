//= require ELO

var white = new ELO();
var black = new ELO();

$('input[type=text]').numeric({ decimal: false, negative: false });
$('input[type=text]').focus(function () {
	$(this).val('');
	$(this).next().html('');
});


function calculate() {

	var winner = document.getElementsByName('winner');
	for (var i = 0; i < winner.length; ++i ){
		if (winner[i].checked) {
			result = (winner[i].value == "black") ? 0 : (winner[i].value == "white") ? 1 : 0.5;
			break;
		}
	}

	rating_1 = parseInt(document.getElementById('player_1_rating').value, 10);
	rating_2 = parseInt(document.getElementById('player_2_rating').value, 10);

	white.rating = rating_1;
	black.rating = rating_2;

	white.play(black, result);

	document.getElementById('player_1_new_rating').innerHTML = String(white.rating);
	document.getElementById('player_2_new_rating').innerHTML = String(black.rating);

	$('.output').show();
}

