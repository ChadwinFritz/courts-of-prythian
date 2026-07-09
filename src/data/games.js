// src/data/games.js

export const sigils = [
  { id: 'night',   label: 'Night Court',   symbol: '✦' },
  { id: 'spring',  label: 'Spring Court',  symbol: '✿' },
  { id: 'summer',  label: 'Summer Court',  symbol: '☀' },
  { id: 'autumn',  label: 'Autumn Court',  symbol: '🍂' },
  { id: 'winter',  label: 'Winter Court',  symbol: '❄' },
  { id: 'dawn',    label: 'Dawn Court',    symbol: '🌅' },
  { id: 'day',     label: 'Day Court',     symbol: '🌤' },
  { id: 'siphon',  label: 'Illyrian Siphon', symbol: '⚔' },
]

export const characterClues = [
  {
    character: 'Lucien Vanserra',
    clues: [
      'I was born with one russet eye and earned the other in gold and metal.',
      "I've belonged to three courts and none of them.",
      "My mate won't speak to me — yet.",
    ],
  },
  {
    character: 'Feyre Archeron',
    clues: [
      'I taught myself everything: the bow, the hunt, and much later, my letters.',
      "I've been mortal, dead, and High Fae — in that order.",
    ],
  },
  {
    character: 'Rhysand',
    clues: [
      'They call me the most powerful High Lord in history.',
      'I let the world believe the worst story about me for fifty years to keep one city safe.',
    ],
  },
  {
    character: 'Nesta Archeron',
    clues: [
      'The Cauldron took what it wanted from my sisters.',
      'When they forced me under, I took something back.',
    ],
  },
  {
    character: 'Cassian',
    clues: [
      'Seven Siphons, two rebuilt wings, one promise made on a battlefield that I intend to keep forever.',
    ],
  },
  {
    character: 'Azriel',
    clues: [
      'My shadows learned to sing to me in the dark of my father\'s house.',
      'Now they whisper everyone\'s secrets — except my own, which I keep.',
    ],
  },
  {
    character: 'Amren',
    clues: [
      'I am older than this world and I have worn it like an ill-fitting coat.',
      'Bring me jewels and no one gets hurt.',
    ],
  },
  {
    character: 'Elain Archeron',
    clues: [
      'Everyone calls me the gentle one, the broken one.',
      "They forget which sister put a blade through the King of Hybern's neck.",
    ],
  },
  {
    character: 'Vassa',
    clues: [
      "By day I burn as a firebird over a death-lord's lake.",
      'By night I am a queen, and extremely loud about it.',
    ],
  },
  {
    character: 'Gwyn Berdara',
    clues: [
      'I survived Sangravah, found my voice again in a library, and cut the ribbon no one thought could be cut.',
      'My eyes are teal; my braid is copper; my future is a very interesting question.',
    ],
  },
]

export const wouldYouRather = [
  {
    a: 'Drink faerie wine at a Night Court party',
    b: 'Have a quiet tea with the Suriel',
    judgeA: 'Rhysand approves of your taste. Mind the wine — Feyre has stories.',
    judgeB: 'Excellent choice. Bring soup and leave with the secrets of the universe.',
  },
  {
    a: 'Train at dawn with Cassian',
    b: 'Read all day in the House of Wind library',
    judgeA: 'Cassian is delighted. Your legs will not be.',
    judgeB: 'The House just sent down cocoa. It has chosen you.',
  },
  {
    a: 'Attend Starfall in Velaris',
    b: 'Attend a masquerade at the Spring Court',
    judgeA: 'The correct answer. The sky itself performs.',
    judgeB: 'Bold. Historically, Spring masquerades run… long.',
  },
  {
    a: 'Hold Truth-Teller for one day',
    b: "Wear Feyre's crown for one day",
    judgeA: 'Azriel is watching you very closely now. Very.',
    judgeB: 'High Lady for a day — Rhysand insists you keep the wine perks.',
  },
  {
    a: 'Winnow anywhere instantly',
    b: 'Have Illyrian wings',
    judgeA: 'Practical. Amren approves of efficiency.',
    judgeB: 'Romantic. Cassian says welcome to the club, mind the doorframes.',
  },
  {
    a: 'Ask the Bone Carver one question',
    b: 'Look into the Ouroboros mirror',
    judgeA: 'Choose the question carefully — he answers in trades.',
    judgeB: 'Braver than most High Lords. Feyre respects it.',
  },
  {
    a: 'A bargain tattoo with Rhysand',
    b: 'A mating bond chosen freely',
    judgeA: "He'd make the tattoo pretty. He'd also gloat forever.",
    judgeB: 'The cabin, the soup, the choice — you understand the assignment.',
  },
  {
    a: 'Dinner with the Inner Circle',
    b: 'Solstice morning with the Archeron sisters',
    judgeA: 'Bring your appetite and your comebacks.',
    judgeB: 'Soft hearts unite — Elain is already baking.',
  },
  {
    a: 'Spar with Nesta',
    b: 'Go shopping with Mor',
    judgeA: 'You will lose. You will learn. She may respect you.',
    judgeB: 'You will be broke. You will be fabulous. Worth it.',
  },
  {
    a: "Guard the wall with Andras",
    b: "Cross it with Feyre's bow",
    judgeA: 'Loyal to the end — Tamlin remembers his sentries.',
    judgeB: 'Huntress energy. Careful what you shoot at.',
  },
  {
    a: 'Keep a secret for Azriel',
    b: 'Hear a secret from Amren',
    judgeA: 'His shadows will remember your discretion.',
    judgeB: "Congratulations, the secret is ten thousand years old and horrifying.",
  },
  {
    a: 'A cottage life with a garden',
    b: 'A palace life with politics',
    judgeA: 'Elain says the garden always wins.',
    judgeB: "Rhysand says the trick is making the politics fun.",
  },
  {
    a: 'Win the Blood Rite',
    b: 'Win the Court of Nightmares at cards',
    judgeA: 'Valkyrie. Obviously. Gwyn is cheering.',
    judgeB: 'Riskier than the Rite, honestly. Mor stopped playing centuries ago.',
  },
  {
    a: 'Befriend the House of Wind',
    b: 'Befriend Bryaxis',
    judgeA: 'Wise. Endless books, warm fires, moral support.',
    judgeB: 'It just wants windows and a friend. You monster-lover, you.',
  },
  {
    a: 'Reread Book 2 forever',
    b: "Read Elain's future book first",
    judgeA: 'Chapter 55 on a loop — the fandom salutes you.',
    judgeB: 'The Suriel says: patience. Also: it will be worth it.',
  },
]

export const surielsRiddles = [
  {
    riddle: 'I am the answer to her riddle — and the reason this website exists.',
    answer: 'Love',
    verdict: 'The Suriel nods. Love is always the answer.',
  },
  {
    riddle: "I sit in a ring on a cruel finger: a hero's eye, kept as a trophy.",
    answer: "Jurian's eye",
    verdict: "The Suriel is... grimly impressed.",
  },
  {
    riddle: 'Three stars align above my black summit once a year. The Rite ends where I begin.',
    answer: 'Ramiel',
    verdict: 'The Suriel inclines its hooded head.',
  },
  {
    riddle: 'She painted me inside her own drawer: the whole future in miniature.',
    answer: 'A night sky of stars',
    verdict: 'The Suriel is satisfied. Bring it soup next time.',
  },
  {
    riddle: 'My price for joining the war was windows.',
    answer: 'Bryaxis',
    verdict: 'The Suriel is grudgingly impressed.',
  },
  {
    riddle: 'I am the blade that had never been lent — until a seer needed saving.',
    answer: 'Truth-Teller',
    verdict: "The Suriel whispers: Azriel's most carefully kept secret.",
  },
  {
    riddle: 'I sighed when I took the gentlest one.',
    answer: 'The Cauldron',
    verdict: 'The Suriel approves of your lore.',
  },
  {
    riddle: 'Do not look at me. Do not acknowledge me. I am not really there.',
    answer: 'The Bogge',
    verdict: 'The Suriel says: do not look at the Bogge.',
  },
  {
    riddle: 'I am every color at once — the street where the artists refused to stop.',
    answer: 'The Rainbow',
    verdict: 'The Suriel knows its Velaris geography.',
  },
  {
    riddle: 'When she gave everything back, I am what she kept.',
    answer: 'A spark',
    verdict: 'The Suriel is... grudgingly impressed. A spark was always enough.',
  },
]
