// Combat logic ported from creatureFight.js
const bodyParts = [
  "slash it through its eyes",
  "chop off a leg",
  "stick the knife into its head",
  "smack the thing with your lid",
  "jam the blade in its mouth",
  "dig the knife into its abdomen"
];

export function calculateFightOutcome(firstStrike) {
  const hitChance = firstStrike ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 3);
  const damage = Math.floor(Math.random() * 5 + 1);

  if (hitChance !== 0) {
    // Player hits the creature
    const bodyPartIndex = Math.floor(Math.random() * 6);
    return {
      playerHit: true,
      creatureDamage: damage,
      playerDamage: 0,
      message: `You ${bodyParts[bodyPartIndex]} and do ${damage} damage.`,
      speed: 40
    };
  } else {
    // Creature hits the player
    const creatureDamage = 5;
    if (firstStrike) {
      return {
        playerHit: false,
        creatureDamage: 0,
        playerDamage: creatureDamage,
        message: `You go for a stab, but it pierces its foaming fangs through your hand and does ${creatureDamage} damage. The wound is incredibly painful and you are beginning to feel a tingling sensation up the length of your arm. Will you continue to fight or run away?`,
        speed: 50
      };
    } else {
      return {
        playerHit: false,
        creatureDamage: 0,
        playerDamage: creatureDamage,
        message: `You go to strike, but from its abdomen it sprays a noxious fluid into your eyes and does ${creatureDamage} damage. Your vision now has trails and you've lost your sense of balance.`,
        speed: 50
      };
    }
  }
}

export function calculateRunOutcome() {
  const success = Math.floor(Math.random() * 3);

  if (success === 0) {
    // Successful escape
    return {
      success: true,
      playerDamage: 0,
      message: "The creature gets briefly distracted from slipping in a soapy puddle and you use the opportunity to run and hide behind the couch. It becomes quiet and after a few minutes you look around. You cannot find the creature anywhere. A week later you have still not seen it, however, you begin finding what looks like moist cotton balls around the house. You've made a terrible mistake.",
      speed: 50
    };
  } else {
    // Failed escape - creature catches you
    return {
      success: false,
      playerDamage: 10, // Instant death
      message: "You turn to run away, but the creature leaps after you. It lands on your leg and begins stabbing into it furiously. Each time injecting more venom. You fall to your back. Your vision begins to darken. It crawls up onto your belly and pierces into it with a stinger from its abdomen. It's injecting something, but not venom. You are completely paralyzed, but you see it placing what looks like an egg sack into your gut. You lie there watching it work until everything finally turns black.",
      speed: 50
    };
  }
}

export function getVictoryMessage() {
  return {
    message: "The creature lets out a piercing shriek and scurries back towards the drain. You quickly slam the pot lid down on its head and hack off the massive abdomen with the tiny blade. Out of the still pulsing body oozes a putrid mess of goo and small white sacks.",
    speed: 50
  };
}

export function getDeathMessage() {
  return {
    message: "You try to strike it in the mouth, but it sinks its fangs into your forearm and injects a healthy dose of venom. You fall to the ground reeling in pain. You are severely hallucinating now. You think you see another creature on the counter. Your vision turns dark and the last thing you sense is the feeling of prickly insect legs on your chest, then your neck, then face.",
    speed: 50
  };
}
