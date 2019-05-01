class PokerHand{
  constructor(hand) {
    this.hand = hand;

  }
  getRank() {
    var hand = this.hand;
    var rank = '';
    var flush = checkFlush(hand);
    hand = sanitizeHand(hand);
    var high = hand[hand.length-1];
    //Implement poker hand ranking
    if (straight(hand)){
        if (hand[0] === '10' && flush){
          return "Royal Flush";
        } else {
          rank = "Straight";
          if (flush){
            rank += " Flush";
          }
          return rank;
        }
    }
    if (flush){
      return "Flush";
    } else {
      return groups(hand);
    }
    if (rank === false){
      return highCard(high) + ' High';
    }
  }
}
// After checking for a flush, we don't need the suits anymore,
// so change the string into an array of integers, and then sort them
function sanitizeHand(hand){
  hand = hand.replace(/[a-z]/g, '');
  hand = hand.replace(/j/gi, '11');
  hand = hand.replace(/q/gi, '12');
  hand = hand.replace(/k/gi, '13');
  hand = hand.replace(/a/gi, '14');
  hand = hand.split(' ');
  hand = hand.sort(compareNumbers);
  return hand;
}
function compareNumbers(a, b) {
  return a - b;
}

// turn integers back into appropriate strings to determine high card
function highCard(card){
  switch(card){
    case '14':
    return 'Ace'; break;
    case '13':
    return 'King'; break;
    case '12':
    return 'Queen'; break;
    case '11':
    return 'Jack'; break;
    default:
    return card.toString();
  }
}

// Iterate through sorted array. Bail as soon as the next value isn't
// one card higher than the previous.
function straight(hand){
  for (var i = 0; i < hand.length-1; i++) {
    if (parseInt(hand[i+1]) !== (parseInt(hand[i])+1)){
      return false;
    }
  } return true;
}

// find groups of card values
function groups(hand){
  var groups = '',
  val = hand.shift(),
  count = 1,
  next;

  while (hand.length){
    next = hand.shift();
    if (next == val){
      count++;
    } else {
      if (count > 1){
        groups += count;
        count = 1;
      }
    }
    if (!hand.length && count > 1){
      groups += count;
    }
    val = next;
  }
  switch (groups){
    case '23':
    case '32':
    return 'Full House';
    break;
    case '22':
    return 'Two Pair';
    break;
    case '4':
    return 'Four of a Kind';
    break;
    case '3':
    return 'Three of a Kind';
    break;
    case '2':
    return 'One Pair';
    break;
    default:
    return false;
  }
}

// check to see if there are 5 cards with the same suit
function checkFlush(hand){
  var suit = hand.slice(-1),
  count = 0;

  for (var i = 0; i < hand.length; i++) {
    if (hand[i] === suit){
      count++;
    }
  }

  if (count === 5){
    return true;
  } return false;
}

module.exports = PokerHand;
