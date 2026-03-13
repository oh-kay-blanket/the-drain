// Branching story tree for The Drain
// Each node: { text, speed, choices?, next?, combat?, ending? }
// choices: [{ text, next }] — player picks a numbered option
// next: "nodeId" — linear node, Enter to continue
// combat: { hitChance, hitNext, missNext, hitText, missText } — RNG moment
// ending: { type, title } — terminal node (ominous|bittersweet|gross|sci-fi|happy)

export const storyTree = {
  // ─── OPENING ───────────────────────────────────────────────
  start: {
    text: "It's 11:47 PM on a Tuesday. You're standing at the kitchen sink of your third-floor apartment — the one with the window that doesn't lock and the radiator that clangs like someone's trapped inside it. You've been meaning to do these dishes for three days. The water is grey and lukewarm. Something about this apartment has never felt right. The previous tenant left in the middle of the night and didn't take her security deposit. The super just shrugged when you asked about it.",
    speed: 22,
    next: "start_2"
  },

  start_2: {
    text: "You pull the drain plug and watch the cloudy water drop. It stops. The water sits still, a greasy film catching the fluorescent light. Something dark shifts below the surface. You lean closer. A faint clicking sound rises from the pipes — rhythmic, deliberate, like a fingernail tapping on the inside of a wall.",
    speed: 22,
    choices: [
      { text: "Reach into the drain", next: "reach_in" },
      { text: "Grab the plunger", next: "plunger" }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // PATH A: REACH IN
  // ═══════════════════════════════════════════════════════════
  reach_in: {
    text: "You plunge your hand into the murky water. Your fingers wrap around something. It's not a utensil. It feels like a pipe cleaner — bristly, segmented, and warm. It curls around your finger.",
    speed: 22,
    choices: [
      { text: "Pull it out", next: "pull_it" },
      { text: "Yank your hand back", next: "yank_back" }
    ]
  },

  pull_it: {
    text: "You pull hard. A long, bristled appendage rises from the water, coiling around your wrist. The water churns. Something much larger is being dragged upward with it. The drain groans and cracks.",
    speed: 25,
    next: "creature_emerges"
  },

  yank_back: {
    text: "You rip your hand free. Three thin scratches run across your palm, already beading with blood. The water begins to bubble violently. The drain cover pops off and skitters across the counter. Something is coming up.",
    speed: 25,
    next: "creature_emerges"
  },

  creature_emerges: {
    text: "Though it squeezes through the small drain, it swells up to a greater size after escaping the bottleneck. Its head looks like a sea urchin with dollops of sturgeon caviar for eyes. An abdomen that looks like a rotten durian fruit along with eight legs all come up out of the drain. There is a creature, the size and shape of an opened umbrella, crawling onto your counter. It turns towards you, opens up three sharp black fangs and makes a foaming hiss.",
    speed: 35,
    choices: [
      { text: "Grab a knife from the counter", next: "grab_knife" },
      { text: "Back away slowly", next: "back_away" },
      { text: "Try to talk to it", next: "talk_creature" }
    ]
  },

  // ─── BRANCH A1: GRAB KNIFE ────────────────────────────────
  grab_knife: {
    text: "You snatch a paring knife from the counter and the lid from the pot to protect yourself. The creature crouches low, its legs tensing. It's preparing to leap.",
    speed: 30,
    choices: [
      { text: "Strike first", next: "strike_first" },
      { text: "Wait for it to move", next: "wait_for_it" }
    ]
  },

  strike_first: {
    text: "You lunge forward with the blade.",
    speed: 25,
    combat: {
      hitChance: 0.7,
      hitText: "You jab the blade into a cluster of eyes. It shrieks and recoils. A slick, oil-like substance drips from the wound. It staggers, legs folding unevenly. You've wounded it badly.",
      missText: "You go for a stab, but it pierces its foaming fangs through your hand. The wound is incredibly painful and you begin to feel a tingling sensation up the length of your arm. A venom is working through you.",
      hitNext: "creature_wounded",
      missNext: "player_venomed"
    }
  },

  creature_wounded: {
    text: "The creature drags itself across the counter, leaving a trail of black ooze. It's heading back toward the drain, but it's too swollen now to fit. It presses itself against the drain opening, legs scrabbling.",
    speed: 30,
    choices: [
      { text: "Finish it off", next: "finish_creature" },
      { text: "Let it retreat", next: "let_retreat" }
    ]
  },

  finish_creature: {
    text: "You slam the pot lid down on its body and hack into the abdomen with the paring knife. It splits open. Out of the still-pulsing body oozes a putrid mess of goo and small white sacks. Eggs. Dozens of them, each the size of a marble, translucent and faintly pulsing.",
    speed: 30,
    choices: [
      { text: "Destroy all the eggs", next: "destroy_eggs" },
      { text: "Keep one to examine", next: "keep_egg" }
    ]
  },

  destroy_eggs: {
    text: "You sweep every last egg into a garbage bag, tie it shut, and throw it in the dumpster outside. You pour bleach down the drain and scrub the counter until your hands are raw. It's over. It has to be over. Two weeks later, you're moving the refrigerator to clean behind it and find a single egg sack wedged against the wall. It's empty. Something small and bristly scurries into a crack in the baseboard before you can react.",
    speed: 30,
    ending: { type: "ominous", title: "CLEAN ENOUGH" }
  },

  keep_egg: {
    text: "You can't help yourself. You place a single egg in a mason jar with a damp paper towel and set it on your desk. Over the following days, you watch it grow. It hatches into something no bigger than a quarter — translucent, delicate, almost beautiful in its alien geometry. It taps against the glass when you come near. You start feeding it scraps of raw meat. Within a month it's the size of a fist and makes a soft clicking sound when it sees you. It knows your name. You're sure of it.",
    speed: 30,
    ending: { type: "bittersweet", title: "ADOPTION" }
  },

  let_retreat: {
    text: "You step back and lower the knife. The creature stops struggling against the drain. It turns slowly and looks at you with those dark, clustered eyes. For a long moment, neither of you moves. Then it does something unexpected — it folds its legs beneath itself and goes still. It dies there on your counter, quietly, like a spider curling inward. You wrap it in newspaper and throw it away. That night, sitting alone in the kitchen, you notice the faucet dripping. Each drop sounds exactly like that clicking.",
    speed: 30,
    ending: { type: "bittersweet", title: "FIRST CONTACT" }
  },

  player_venomed: {
    text: "Your vision is doubling. The venom is fast. The creature watches you from the counter, patient now, knowing it has won. Your legs buckle.",
    speed: 30,
    choices: [
      { text: "Fight through the pain and strike again", next: "venom_fight" },
      { text: "Try to run", next: "venom_run" }
    ]
  },

  venom_fight: {
    text: "You swing wildly with what remains of your coordination.",
    speed: 25,
    combat: {
      hitChance: 0.35,
      hitText: "The blade catches it across the abdomen and it splits open, spilling its contents across the counter. You collapse into the mess. When you wake up on the kitchen floor hours later, you're alive but your hand has changed. The skin around the bite has hardened into something chitinous. You scratch at it. Bristles emerge. Over the following weeks, they spread.",
      missText: "You miss completely. The creature leaps onto your chest. You feel a sharp, cold sting in your sternum as it drives a proboscis through your shirt and into the flesh beneath. It's not feeding — it's depositing something. Your vision goes dark.",
      hitNext: "ending_inheritance",
      missNext: "ending_consumed"
    }
  },

  ending_inheritance: {
    text: "",
    speed: 0,
    ending: { type: "gross", title: "INHERITANCE" }
  },

  ending_consumed: {
    text: "",
    speed: 0,
    ending: { type: "gross", title: "CONSUMED" }
  },

  venom_run: {
    text: "You stumble toward the kitchen door. Your legs are going numb. You make it three steps before your knees give out. The creature doesn't chase you. It doesn't need to. The venom finishes its work. The last thing you feel is the patter of small, bristled legs climbing onto your back.",
    speed: 30,
    ending: { type: "gross", title: "CONSUMED" }
  },

  wait_for_it: {
    text: "The creature launches itself at you. You deflect it with the pot lid and send it crashing into the drying rack. Glasses shatter. It recovers instantly and crouches again.",
    speed: 28,
    next: "wait_trap"
  },

  wait_trap: {
    text: "You notice something: it keeps glancing toward the window above the sink. The kitchen light is reflecting off the glass. The creature seems drawn to it, or afraid of it. You have an idea.",
    speed: 28,
    choices: [
      { text: "Lure it under the light and trap it", next: "trap_light" },
      { text: "Open the window and try to chase it out", next: "open_window" }
    ]
  },

  trap_light: {
    text: "You flip on every light in the kitchen. The creature freezes, overwhelmed. Its legs splay outward and it goes rigid, like a spider playing dead. You grab the stockpot and slam it down over the creature. It doesn't move. You tape the edges down and sit on the floor, breathing hard. You can hear it tapping inside. Gently. Rhythmically. Almost like it's trying to communicate.",
    speed: 30,
    choices: [
      { text: "Tap back", next: "tap_back" },
      { text: "Call animal control", next: "animal_control" }
    ]
  },

  tap_back: {
    text: "You tap the pot twice. It taps twice back. You tap three times. Three taps return. Over the next hour, sitting on the kitchen floor beside the stockpot, you develop a rudimentary language. It taps when it's cold. It taps differently when it's afraid. By morning, you've lifted the pot an inch and slid a piece of raw chicken underneath. It takes the food gently. You name it. You don't tell anyone.",
    speed: 30,
    ending: { type: "happy", title: "PET" }
  },

  animal_control: {
    text: "They arrive in hazmat suits. They take the pot and everything in it. A man in a black jacket who doesn't look like animal control asks you very specific questions: how big was it, did it vocalize, did it lay anything. He gives you a card with no name, just a phone number. 'Call us if you see another one,' he says. That night you find a second drain cover on the bathroom floor, pushed aside from below. You call the number. No one answers. The line just clicks.",
    speed: 30,
    ending: { type: "ominous", title: "THE SCOUT" }
  },

  open_window: {
    text: "You reach past the creature and shove the window open. Cool night air rushes in. The creature's legs quiver. It turns toward the opening and goes very still, as if tasting the air. Then, without warning, it scrambles up the wall and out the window into the darkness. You hear it skitter across the roof and then — silence. You stand at the open window for a long time, listening to the crickets. It's gone. You feel, strangely, like you've done something kind.",
    speed: 30,
    ending: { type: "happy", title: "FREEDOM" }
  },

  // ─── BRANCH A2: BACK AWAY ─────────────────────────────────
  back_away: {
    text: "You take two careful steps backward. The creature watches you but doesn't follow. It seems more interested in exploring the counter, tapping at dishes and nudging a sponge with one bristled leg. It almost looks... confused.",
    speed: 28,
    choices: [
      { text: "Leave the kitchen entirely", next: "leave_kitchen" },
      { text: "Offer it some food", next: "offer_food" }
    ]
  },

  leave_kitchen: {
    text: "You back into the hallway and close the kitchen door. You sit with your back against it, heart pounding, trying to figure out what to do. After twenty minutes of silence, you hear the TV turn on in the living room. That's impossible — the living room is past the kitchen. You open the door. The kitchen is empty. The creature is gone. But the drain is still broken open. You find your roommate in the living room eating cereal. 'Hey,' she says, not looking up. 'Did you fix the drain?' You stare at her. Under her chair, you notice wet footprints that aren't human. They've been here before. She knows.",
    speed: 30,
    ending: { type: "ominous", title: "ROOMMATES" }
  },

  offer_food: {
    text: "You slowly open the fridge and pull out a package of raw ground beef. You set a small lump on the counter near the creature. It freezes. Then one leg reaches forward and touches the meat. It pulls the lump toward itself and seems to absorb it through its underside. It makes a sound — not a hiss this time. Something softer. A purr, almost.",
    speed: 30,
    choices: [
      { text: "Give it more", next: "feed_more" },
      { text: "Try to touch it", next: "touch_creature" }
    ]
  },

  feed_more: {
    text: "You empty the ground beef onto the counter. Then the leftover chicken from Tuesday. Then the deli ham. It eats everything, growing visibly as it feeds. Its bristles soften. Its eyes, those clusters of dark spheres, seem to relax. When there's nothing left, it settles onto the counter and tucks its legs beneath itself. It looks like a spiny loaf of bread. It's asleep. You stand over it, watching it breathe — if that's what it's doing. You get a blanket from the couch and drape it over the creature. You eat cereal for dinner. It curls into the fabric and clicks softly in its sleep.",
    speed: 30,
    ending: { type: "happy", title: "PET" }
  },

  touch_creature: {
    text: "You extend a single finger toward it. The creature goes rigid. Every eye swivels toward your hand. You hold still. After ten long seconds, it reaches one leg forward and rests it on the tip of your finger. The bristles are softer than you expected — like a damp pipe cleaner, not sharp. It holds on gently. Then another leg touches your thumb. Then another. It's climbing onto your hand. It settles in your palm, heavier than it looks, and warm. It touches your shoe with one leg, gently, almost reverently. As if checking that you're real.",
    speed: 32,
    ending: { type: "bittersweet", title: "FIRST CONTACT" }
  },

  // ─── BRANCH A3: TALK TO CREATURE ──────────────────────────
  talk_creature: {
    text: "\"Hey,\" you say, your voice cracking. \"Hey, it's okay.\" The creature stops hissing. Its legs lower slightly. Those clustered eyes fix on your mouth as you speak, tracking the movement of your lips.",
    speed: 28,
    choices: [
      { text: "Keep talking softly", next: "talk_soft" },
      { text: "Ask it what it wants", next: "ask_wants" }
    ]
  },

  talk_soft: {
    text: "You talk about anything — the weather, what you had for lunch, a show you've been watching. Your voice seems to calm it. Its bristles flatten. It settles lower on the counter. After five minutes of rambling, it makes a sound back at you. Not a hiss. A series of clicks, almost melodic. Like it's trying to mimic speech.",
    speed: 28,
    choices: [
      { text: "Open the window and gesture outside", next: "window_gesture" },
      { text: "Try to mimic its clicks back", next: "mimic_clicks" }
    ]
  },

  window_gesture: {
    text: "You move to the window slowly and push it open. You point outside and then gesture to the creature. It watches, those dozens of eyes tracking your hand. It clicks once. Twice. Then it moves — not toward the window, but toward the drain. It pauses at the edge, looks back at you, and makes that soft clicking sound one more time. Then it squeezes back down, folding itself impossibly small. The last thing you see is a single leg, raised toward you, before it disappears. You close the window. You fix the drain. You never see it again, but some nights you hear clicking in the walls. Friendly clicking.",
    speed: 30,
    ending: { type: "bittersweet", title: "SANCTUARY" }
  },

  mimic_clicks: {
    text: "You click your tongue against the roof of your mouth. The creature goes absolutely still. Then it clicks back — the same pattern but faster. You repeat it. It repeats yours. Back and forth, faster each time. Then it stops and does something new: it spreads its legs wide and its abdomen splits open — not violently, but like a flower blooming. Inside, there's a cavity, and inside that cavity, there's a pale blue light. Not bioluminescence. Something else. Something geometric. Patterns. Data. You're looking at a signal.",
    speed: 32,
    next: "signal_reveal"
  },

  signal_reveal: {
    text: "The patterns in the light shift and you realize with a sickening lurch that you're looking at a map. Your neighborhood. Your building. The pipes beneath it. And in those pipes, more lights. Hundreds of them. They're not creatures. They're nodes. This thing is a terminal — a biological antenna connected to something vast, something that lives in the infrastructure beneath your feet. It came up because it was curious. They're all curious. About you.",
    speed: 35,
    ending: { type: "sci-fi", title: "BELOW" }
  },

  ask_wants: {
    text: "\"What do you want?\" you ask. The creature tilts its body. Its legs reposition. It moves to the edge of the counter and looks down at the floor, then back at you. It clicks twice and then does something strange — it extends one leg and taps the floor. Once. Twice. Then it taps the counter. It's pointing: down there, then up here.",
    speed: 28,
    choices: [
      { text: "Help it down from the counter", next: "help_down" },
      { text: "Block the drain so nothing else comes up", next: "block_drain" }
    ]
  },

  help_down: {
    text: "You hold your hand flat on the counter near the creature. It hesitates, then climbs on. It's surprisingly light for its size, like holding a bundle of warm pipe cleaners. You set it on the floor. It immediately scurries toward the front door and taps at the gap underneath. It wants out. You open the door. The night air is warm and smells like cut grass. The creature pauses in the doorway, looks up at you with all those dark eyes, clicks once — softly — and then scrambles into the garden and disappears into the storm drain at the end of your driveway. You watch the empty street for a long time. You hope it'll be okay out there.",
    speed: 30,
    ending: { type: "happy", title: "FREEDOM" }
  },

  block_drain: {
    text: "You grab the rubber drain stopper and jam it in hard while the creature watches from the far side of the counter. You tape over it. Caulk the edges. The creature clicks urgently — almost frantically. Then it goes quiet and climbs down from the counter. It moves to the kitchen floor and sits in the middle of the tile, legs folded. Waiting. In the morning, you find it in the same spot. But there are thirty more around it. Small ones, each no bigger than a bottle cap. They came up through the bathroom drain, the washing machine outlet, the basement floor drain. They came for the one you trapped up here. And they keep coming.",
    speed: 32,
    ending: { type: "sci-fi", title: "MIGRATION" }
  },

  // ═══════════════════════════════════════════════════════════
  // PATH B: PLUNGER
  // ═══════════════════════════════════════════════════════════
  plunger: {
    text: "You grab the plunger from beside the fridge and give the drain three hard pumps. The water surges and then drains with a satisfying gurgle. But as the water level drops, you see something caught in the drain grate — something dark and segmented, twitching.",
    speed: 22,
    choices: [
      { text: "Look closer at the drain", next: "look_drain" },
      { text: "Pour bleach down the drain", next: "pour_bleach" }
    ]
  },

  // ─── BRANCH B1: LOOK CLOSER ───────────────────────────────
  look_drain: {
    text: "You lean in close. The segmented thing is a leg — an insect leg the size of your index finger, covered in coarse bristles. It's reaching up through the grate, probing the air. As you watch, a second leg emerges. Then a third. They grip the edges of the drain and begin to pull.",
    speed: 25,
    choices: [
      { text: "Pour boiling water down the drain", next: "boiling_water" },
      { text: "Reach in and pull it out", next: "reach_in" }
    ]
  },

  boiling_water: {
    text: "You slam the kettle on and wait the longest three minutes of your life. The legs keep probing, pulling. By the time the water boils, a dark mass is visible beneath the grate. You pour the entire kettle in one go. The water hits it and it SCREAMS — a sound like tearing metal. The legs retract violently. Steam rises from the drain. Then silence.",
    speed: 28,
    choices: [
      { text: "Keep pouring — boil more water", next: "keep_pouring" },
      { text: "Stop and listen", next: "stop_listen" }
    ]
  },

  keep_pouring: {
    text: "You boil kettle after kettle, pouring each one down the drain. The screaming stops after the third. By the fifth, a thick, acrid smoke rises from the pipes and the drain makes a sound like a clogged vacuum. You pour bleach in for good measure. Then drain cleaner. Then more boiling water. You don't stop until the pipes are too hot to touch. You sit on the kitchen floor, exhausted. It's over. Weeks later, the plumber you call to fix the melted P-trap pulls out something he can't identify — a fused mass of chitin, calcium, and what looks disturbingly like tooth enamel. 'The hell were you pouring down here?' he asks. You don't answer.",
    speed: 32,
    ending: { type: "gross", title: "INHERITANCE" }
  },

  stop_listen: {
    text: "You set the kettle down and hold your breath. From deep in the pipes, you hear something. Not the creature — something else. A voice. Faint, distorted by the pipes, but unmistakably human. It's saying a single word, over and over: \"Help.\"",
    speed: 30,
    choices: [
      { text: "Call back down the drain — \"Who's there?\"", next: "respond_drain" },
      { text: "Call a plumber immediately", next: "call_plumber" }
    ]
  },

  respond_drain: {
    text: "\"Who's there?\" you call into the drain. Silence. Then the voice again, clearer now: \"Help me. I'm stuck.\" It doesn't sound like it's coming from the pipes anymore. It sounds like it's coming from the drain itself — like something is mimicking human speech from very close. You lean in closer.",
    speed: 28,
    choices: [
      { text: "Reach in toward the voice", next: "reach_toward_voice" },
      { text: "Seal the drain and every other opening", next: "seal_everything" }
    ]
  },

  reach_toward_voice: {
    text: "Your hand goes into the drain and something grabs it. Not painfully — gently. Like a child's hand but with too many fingers. It pulls, not hard, just insistently. You brace yourself against the counter and pull back. Out of the drain comes not a creature but something that looks like a small, wet person — no bigger than a cat, grey-skinned, with enormous dark eyes and limbs that bend in too many places. It shivers in the kitchen light. It looks up at you and says, in that broken pipe-voice: \"Cold.\" You wrap it in a dish towel. It clutches the fabric and closes its eyes. You have no idea what to do next, but you know you can't put it back.",
    speed: 32,
    ending: { type: "bittersweet", title: "SANCTUARY" }
  },

  seal_everything: {
    text: "You tape the drain shut. Then the bathroom drain. The washing machine outlet. The floor drain in the basement. You caulk every pipe joint you can find. You work through the night, sealing your home from below. In the morning, the voice has stopped. But the tape over the kitchen drain is bulging upward, pushed by something underneath. You press your hand against it and feel a rhythmic pulse — like a heartbeat, but massive. Whatever is down there isn't one creature. It's something much, much larger. And your house is sitting on top of it.",
    speed: 32,
    ending: { type: "sci-fi", title: "BELOW" }
  },

  call_plumber: {
    text: "The plumber arrives within the hour — an older man with a thick mustache and a toolbox older than you. He listens to your story with a straight face. He's heard it before, he says. Fourth call this month from this neighborhood. He doesn't go near the drain. Instead, he pulls out a phone and makes a call. \"Yeah, it's another one,\" he says. \"Kitchen this time.\" He turns to you: \"They'll send someone. Don't use the water.\" He leaves. Nobody comes. The next morning, every drain in the house is bone dry. No water. No sound. Just a faint, chemical smell, like formaldehyde. You move out within the week. The listing agent tells you the house sells immediately. The new owners never complain about the drains.",
    speed: 32,
    ending: { type: "ominous", title: "THE SCOUT" }
  },

  // ─── BRANCH B2: POUR BLEACH ────────────────────────────────
  pour_bleach: {
    text: "You grab the bottle of bleach from under the sink and pour half of it directly down the drain. The twitching thing in the grate convulses and retreats. The bleach bubbles and hisses. Then the drain erupts. A geyser of grey water and bleach foam shoots upward, and with it comes the creature — burnt, furious, and very much alive. It's smaller than you expected, about the size of a dinner plate, but covered in chemical burns. Its bristles are smoking. It hits the counter and immediately lunges at you.",
    speed: 28,
    choices: [
      { text: "Fight it with what you have", next: "fight_burnt" },
      { text: "Run", next: "run_burnt" }
    ]
  },

  fight_burnt: {
    text: "You grab a cast iron skillet from the stove and swing.",
    speed: 22,
    combat: {
      hitChance: 0.6,
      hitText: "The skillet connects with a sickening crunch. The creature splatters against the backsplash. It's dead — truly dead this time. You stand there panting, holding the skillet, bleach and creature residue dripping down the tile. Your hands won't stop shaking. You scrub the kitchen for six hours straight. The burn marks never fully come out of the counter. Neither does the smell. But it's done. You check the drain every night before bed. Force of habit. It's always empty. You almost wish it weren't.",
      missText: "You miss. The skillet hits the counter and the impact rattles up your arm. The creature lands on your chest and sinks its fangs in before you can react. The bleach burns on its body sting your skin where it grips you. The venom is instant — not pain, but cold. A cold that starts in your chest and radiates outward. Your last coherent thought is that the bleach didn't even slow it down.",
      hitNext: "ending_freedom_fight",
      missNext: "ending_consumed_bleach"
    }
  },

  ending_freedom_fight: {
    text: "",
    speed: 0,
    ending: { type: "bittersweet", title: "FIRST CONTACT" }
  },

  ending_consumed_bleach: {
    text: "",
    speed: 0,
    ending: { type: "gross", title: "CONSUMED" }
  },

  run_burnt: {
    text: "You turn and bolt for the front door. Behind you, you hear the creature hit the floor and skitter after you. You make it outside and slam the door. You stand on the porch in your socks, breathing hard, watching the gap under the door. Nothing comes through. You call your landlord from the sidewalk. You never go back inside alone. The exterminator finds nothing. The plumber finds nothing. But you notice, weeks later in your new apartment, that the water pressure has been dropping. And sometimes, late at night, you hear clicking in the pipes. You've moved. But you haven't escaped.",
    speed: 32,
    ending: { type: "ominous", title: "ROOMMATES" }
  },
};
