//= require ELO

var num_items = 10;
var items = [];
var pairs = [];
var currentItem = 0;
var currentPair = 0;

$('#num_items').numeric({ decimal: false, negative: false });

// How many people do you need to rate?
function selectNumItems () {
	console.log ('selectNumItems');
	num_items = parseInt(document.getElementById('num_items').value, 10);
	for (var i=0; i < num_items; ++i) {
		items[i] = new ELO();
	}
	$('.number_holder').hide();
	showNamingDisplay();
}

function showNamingDisplay () {
	console.log ('showNamingDisplay');
	if (currentItem < items.length) {
		$('.input_holder').show();
		$('#item_name').val('Item #' + (currentItem+1));
	} else {
		$('.input_holder').hide();
		createPairs();
	}
}

// Name them.
function nameItem () {
	items[currentItem].id = document.getElementById('item_name').value;
	currentItem++;
	showNamingDisplay();
}

// Prompt one at a time
function compare () {
	if ( currentPair < pairs.length ) {
		$('.display_holder').show();
		var p =  pairs[currentPair];
		$('.left').text ( p.left.id );
		$('.right').text ( p.right.id );
	} else {
		$('.display_holder').hide();
		sortList();
		displayResult();
	}
}

// Create pair mapping: Move this to a class
function createPairs() {
	for (var i = 0; i < items.length - 1; ++i ) {
		for (var j = (i + 1); j < items.length; ++j ) {
			pairs.push( { "left": items[i], "right": items[j] });
		}
	}
	shuffle ( pairs );
	compare();
}

// Randomize List
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
    	current = Math.floor(Math.random() * (top + 1));
    	tmp = array[current];
    	array[current] = array[top];
    	array[top] = tmp;
    }
    return array;
}


// Calculate
function calculate ( result ) {
	var p = pairs[currentPair];
	p.left.play( p.right, result );
	currentPair++;
	compare();
}


function sortList () {
	items.sort(function(a, b) { return a.rating - b.rating; });
}


function displayResult () {
	$('.result_holder').show();
	var i = items.length; while (i--) {
		$('.result').append('<div>' + items[i].id + ' - ' + items[i].rating + '</div>');
	}
}

