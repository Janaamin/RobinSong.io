// Only show on allowed pages
const excluded = ["privacy.html", "contact.html", "impact.html"];
const path = window.location.pathname;
const isExcluded = excluded.some(page => path.endsWith(page));

console.log('Current path:', path);
console.log('Is excluded:', isExcluded);

if (!isExcluded) {
  console.log('Loading fun fact bubble...');
  fetch('fun-fact-bubble.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      const bubble = document.querySelector('.fun-fact-bubble');
      if (bubble) {
        bubble.style.display = 'flex';
        console.log('Fun fact bubble loaded and displayed');
      } else {
        console.log('Fun fact bubble element not found');
      }
      // Fun facts logic
      const funFacts = [
        "Welcome to Robin — your AI birding companion!",
        "The American Robin is one of the first birds to sing at dawn.",
        "Turn every walk into a birdwatching adventure with Robin!",
        "Robins are known for their bright orange-red chests.",
        "Discover birds through sound with Robin!",
        "Robin: Where AI meets nature!",
        "Birds have hollow bones to help them fly.",
        "Blue Jays can mimic the calls of hawks.",
        "Welcome to Robin — your AI birding companion!",
        "Robins can recognize individual human faces!",
        "Birds can see colors that humans can't perceive.",
        "Hummingbirds can fly backwards and even upside down!",
        "Owls can rotate their heads 270 degrees.",
        "Birds have excellent memories for food locations.",
        "Penguins can jump up to 6 feet out of water.",
        "Bald Eagles can see fish from 2 miles away.",
        "Woodpeckers have shock-absorbing skulls.",
        "Welcome to Robin — your AI birding companion!",
        "Some birds can sleep while flying!",
        "Parrots can live up to 80 years!",
        "Learn about birds while you explore with Robin! ",
        "Birds can hear sounds that are too high for humans.",
        "Birds can sleep with one eye open.",
        "Some birds can fly at altitudes of 30,000 feet!",
        "Birds have been around longer than humans.",
        "Birds can see in slow motion compared to humans.",
        "Welcome to Robin — your AI birding companion!",
        "Birds have excellent problem-solving abilities.",
        "Birds can taste with their beaks.",
        "The most intelligent bird is the African Grey Parrot.",
        "Birds can see in the dark better than humans.",
        "Birds can see in 360 degrees around their heads.",
        "Some birds can fly for days without stopping.",
        "Birds have been symbols in every human culture.",
        "Welcome to Robin — your AI birding companion!",
        "Birds can learn and remember complex tasks.",
        "Birds have excellent hearing and can locate sounds precisely.",
        "Some birds can fly through hurricanes.",
        "Birds can see in slow motion.",
        "Some birds can fly at the speed of sound.",
        "Turn every walk into a birdwatching adventure.",
        "Welcome to Robin — your AI birding companion!"
      ];
      let factIdx = 0;
      const funFactText = document.querySelector('.fun-fact-text');
      function rotateFunFact() {
        if (!funFactText) return;
        funFactText.style.opacity = 0;
        setTimeout(() => {
          factIdx = (factIdx + 1) % funFacts.length;
          funFactText.textContent = funFacts[factIdx];
          funFactText.style.opacity = 1;
        }, 1200);
      }
      setInterval(rotateFunFact, 6000);
    })
    .catch(error => {
      console.error('Error loading fun fact bubble:', error);
    });
} else {
  console.log('Fun fact bubble excluded for this page');
} 