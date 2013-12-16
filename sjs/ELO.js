(function(window) {
	"use strict";

	var ELO = function () {
		this.id = "";
		this.rating = 1200;
		this.games_played = 0;
		this.games_won = 0;
		this.games_lost = 0;
		this.games_drawn = 0;
		this.floor_rating = 150;
	}
	var p = ELO.prototype;

	p.play = function ( opponent, result, isReverseCalc ) {

		// Result:
		// White = 1
		// Black = 0
		// Draw = 0.5
		switch (result) {
			case 0:
				this.games_lost++;
				break;
			case 1:
				this.games_won++;
				break;
			case 0.5:
				this.games_drawn++;
				break;
			default:
				throw new Error('Invalid Result.');
				return;
		}

		this.games_played++;

		// Use USCF Floor Rating rules, assuming 1 event
		this.floor_rating = Math.min (150, 4 * this.games_won + 2 * this.games_drawn + 1 );

		// K definitions are based on USCF
		var K = (this.rating < 2100) ? 32: (this < 2400) ? 24 : 16;
		var diff = ((opponent.rating - this.rating) / 400);
		var win_expectancy = 1 / ( Math.pow( 10, diff ) + 1 );
		var new_rating = Math.max( 100, Math.round(this.rating + K * (result - win_expectancy)));
		new_rating = Math.max (this.floor_rating, new_rating);

		// Play the reverse game only once
		if ( isReverseCalc !== true ) opponent.play ( this, Math.abs(1 - result), true );

		this.rating = new_rating;
		return this.rating;
	}

	window.ELO = ELO;

})(window);
