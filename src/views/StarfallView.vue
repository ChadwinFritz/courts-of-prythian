<!-- src/views/StarfallView.vue -->
<template>
  <!-- HERO -->
  <header class="sf-hero">
    <!-- Shooting stars -->
    <div class="shoot s1" aria-hidden="true" />
    <div class="shoot s2" aria-hidden="true" />
    <div class="shoot s3" aria-hidden="true" />

    <!-- Star field -->
    <svg
      class="sky"
      width="100%"
      height="100%"
      viewBox="0 0 900 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle class="st" cx="50"  cy="80"  r="1.4" opacity=".6" />
      <circle class="st" cx="180" cy="30"  r="1"   opacity=".5" />
      <circle class="st" cx="340" cy="60"  r="1.5" opacity=".7" />
      <circle class="st" cx="520" cy="40"  r="1.2" opacity=".6" />
      <circle class="st" cx="700" cy="90"  r="1"   opacity=".5" />
      <circle class="st" cx="830" cy="25"  r="1.6" opacity=".7" />
      <circle class="st" cx="100" cy="200" r="1.1" opacity=".4" />
      <circle class="st" cx="450" cy="150" r="1.3" opacity=".6" />
      <circle class="st" cx="750" cy="180" r="1"   opacity=".5" />
      <circle class="st" cx="260" cy="290" r="1.2" opacity=".4" />
      <circle class="st" cx="620" cy="260" r="1.4" opacity=".5" />
      <circle class="st" cx="870" cy="350" r="1"   opacity=".4" />
    </svg>

    <div class="sf-content">
      <span class="eyebrow">A Starfall in Her Honor</span>
      <h1>For <span class="name">Jodi-Lee Rudolph</span></h1>
      <p class="lead">
        From the Night Court, with the whole sky listening — and one very specific
        constellation, drawn just for you.
      </p>
    </div>
  </header>

  <main>
    <!-- Intro -->
    <section class="intro">
      <p>
        For the Jodi-Lee who walked with Feyre through the snow, went Under the Mountain
        and came back changed, found Velaris when it was still a secret, wept at the war,
        and climbed all ten thousand steps beside Nesta — this night is for you.
      </p>
    </section>

    <!-- Rhysand's Letter -->
    <section class="rhys-letter">
      <div class="seal" aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" fill="#12173a" stroke="#e8c877" stroke-width="1.5" />
          <path d="M26 8 L29.5 20.5 L42 24 L29.5 27.5 L26 40 L22.5 27.5 L10 24 L22.5 20.5 Z" fill="#e8c877" />
          <circle cx="26" cy="24" r="2" fill="#12173a" />
        </svg>
      </div>

      <div class="letter-from">A letter from the High Lord of the Night Court</div>
      <h2>To Jodi-Lee, the star who listened</h2>

      <p>Hello, darling.</p>
      <p>
        Yes — you. Don't look over your shoulder; I flew a rather long way for this, and
        I'd hate to waste the entrance.
      </p>
      <p>
        I'm told you've read our story. All of it. That you saw me at my very worst —
        the smirking villain Under the Mountain — and stayed long enough to learn what
        that mask was for. Do you know how rare that is? Most people believe the first
        story they're told about someone. You waited for the truth. Feyre says that's the
        surest sign of a generous heart. I say it's the surest sign of excellent taste,
        but we've agreed to disagree.
      </p>
      <p>
        So let me say what I came to say. Velaris was kept secret for five thousand years,
        hidden from every enemy, protected at any cost — and it was never truly complete
        until people like you dreamed their way into it. Every reader who loves this city
        becomes one of its citizens. Which means, Jodi-Lee, that you are one of mine now:
        under my protection, welcome at my table, and expected at Starfall every year from
        this night on. I'll have wine waiting. The good vintage — you've earned it.
      </p>
      <p>
        You are not too much. You have never been too little. To the stars who listen, and
        the dreamers who read until dawn — this night is yours.
      </p>

      <div class="letter-sig">
        Rhysand
        <small>High Lord of the Night Court · Defender of the Rainbow · Yours, prettily</small>
      </div>
    </section>

    <!-- Character Messages -->
    <section class="messages">
      <span class="eyebrow centered">From the Family</span>
      <h2 class="centered">The Inner Circle would like a word</h2>
      <p class="centered sub">They fought over who got to go first. Rhysand won, obviously.</p>

      <div class="mgrid">
        <div class="note gold">
          <div class="who">High Lady of the Night Court</div>
          <p>
            "Jodi-Lee — I was a girl with a bow who didn't believe she deserved beautiful
            things, so believe me when I tell you: you do. Thank you for walking every step
            of it with me, even the ones through the dark. Paint your sky whatever color
            you want. You're family now."
          </p>
          <div class="sign">— Feyre</div>
        </div>

        <div class="note">
          <div class="who">General of the Night Court's Armies</div>
          <p>
            "You stuck with us through a war, five books, and Nesta's training montages —
            that's Valkyrie-level endurance, sweetheart. There's a spot in the training
            ring and a seat at the dinner table with your name on it. First round of
            snowballs is aimed at Az."
          </p>
          <div class="sign">— Cassian</div>
        </div>

        <div class="note rose">
          <div class="who">Lady Death, Valkyrie</div>
          <p>
            "I don't do speeches. But you saw me at my worst and didn't look away, and I
            know exactly how much that costs. So: you are enough, Jodi-Lee. You always
            were. Take up your space. Cut the ribbon. And if anyone tells you otherwise,
            send them to me."
          </p>
          <div class="sign">— Nesta</div>
        </div>

        <div class="note">
          <div class="who">Shadowsinger &amp; Spymaster</div>
          <p>
            "My shadows told me about you long before this party was planned. They only
            gossip about people worth knowing. Thank you for reading quietly, loving
            loudly, and keeping our secrets. Truth-Teller stays with me — but the truth
            itself is yours: you are so very loved."
          </p>
          <div class="sign">— Azriel</div>
        </div>

        <div class="note gold">
          <div class="who">The Morrigan</div>
          <p>
            "Jodi-Lee! Finally, someone with real style joins the family. I have three
            centuries of party invitations to catch you up on and a red dress with your
            name on it. Remember what I learned the hard way: joy is a choice you're
            allowed to make every single day. Choose it shamelessly."
          </p>
          <div class="sign">— Mor</div>
        </div>

        <div class="note">
          <div class="who">Second in Command · Older Than This World</div>
          <p>
            "Girl. I have watched civilizations rise and fall and I do not hand out
            compliments, so listen closely because I will say this once: you have good
            taste in books and better taste in favorite characters is WRONG, it should
            be me — but Rhysand is an acceptable second. Now bring me jewels."
          </p>
          <div class="sign">— Amren</div>
        </div>

        <div class="note rose">
          <div class="who">The Seer</div>
          <p>
            "I looked, just a little — I hope you don't mind. Your garden of days ahead
            is full of good things, Jodi-Lee: growing things, blooming things, things
            worth the wait. Be patient with yourself the way you were patient with me.
            The quiet ones bloom the brightest."
          </p>
          <div class="sign">— Elain</div>
        </div>

        <div class="note teal">
          <div class="who">Emissary · Fox of Many Courts</div>
          <p>
            "You kept reading even through the chapters where everything went wrong for
            me, which is most of them, so clearly you have both loyalty and a sense of
            humor. Prythian's two rarest gifts. It's an honor, Jodi-Lee. Truly."
          </p>
          <div class="sign">— Lucien</div>
        </div>

        <div class="note teal">
          <div class="who">Valkyries of the House of Wind</div>
          <p>
            "The three of us swore an oath on Ramiel, and tonight we extend it to you:
            sisters don't let sisters believe they're anything less than legendary.
            Ribbon cut, oath sworn, cocoa poured. Welcome to the Valkyries, Jodi-Lee."
          </p>
          <div class="sign">— Gwyn &amp; Emerie</div>
        </div>

        <div class="note gold">
          <div class="who">The House of Wind</div>
          <p>
            <em>
              (A warm light flickers. A stack of your favorite books appears on the
              nearest table, next to a mug of hot chocolate — exactly how you like it —
              and a blanket that smells faintly of night-blooming jasmine.)
            </em>
          </p>
          <div class="sign">— The House (it likes you)</div>
        </div>

        <div class="note">
          <div class="who">The Smallest, Newest Star</div>
          <p>
            <em>
              (A happy shriek. A tiny pair of black wings flaps twice. Somewhere,
              Rhysand declares it the most eloquent tribute of the evening, and
              honestly — he's right.)
            </em>
          </p>
          <div class="sign">— Nyx</div>
        </div>

        <div class="note rose">
          <div class="who">Under the Mountain · Long Ago</div>
          <p>
            "There's a riddle whose answer is the reason you love these books, the reason
            this page exists, and the reason a whole court gathered for you tonight. You
            solved it ages ago, Jodi-Lee. You've always known the answer is love."
          </p>
          <div class="sign">— The Storyteller</div>
        </div>
      </div>
    </section>

    <!-- Personal Letter (gift-giver edits this) -->
    <section class="rhys-letter personal">
      <div class="letter-from">One more letter — from this side of the wall</div>
      <h2>From the one who built this for you</h2>
      <p>
        Jodi-Lee — every page of this was made because someone real loves you and knows
        exactly how much these books mean to you. The characters said their part; this
        space is for the person who asked the stars to gather for you.
      </p>
      <!-- Gift-giver: replace this paragraph with your own words -->
      <p>
        <em>
          [Gift-giver: replace this paragraph with your own words — open this file in
          any text editor, find this line, and write from the heart. Or delete this
          whole note and let the letter above say it all.]
        </em>
      </p>
      <div class="letter-sig">
        With love, from your side of the wall
        <small>The one who knows you'd choose the Night Court</small>
      </div>
    </section>

    <!-- Wall of Light -->
    <section class="messages">
      <span class="eyebrow centered">The Wall of Light</span>
      <h2 class="centered">From this side of the wall</h2>
      <p class="centered sub">Real voices, real love — messages from people who love you.</p>
      <p class="centered sub-sm">
        [Gift-giver: replace the names and messages below with real notes from friends &amp; family.]
      </p>

      <div class="mgrid">
        <div class="note wall-card" style="border-left-color: var(--burnished)">
          <div class="who">A Light From…</div>
          <p>
            "Write your friend or family member's message here — a memory, a wish, an
            inside joke, anything true."
          </p>
          <div class="sign">— Their name</div>
        </div>

        <div class="note wall-card" style="border-left-color: var(--amethyst)">
          <div class="who">A Light From…</div>
          <p>"Second message goes here."</p>
          <div class="sign">— Their name</div>
        </div>

        <div class="note wall-card" style="border-left-color: var(--mist)">
          <div class="who">A Light From…</div>
          <p>"Third message goes here."</p>
          <div class="sign">— Their name</div>
        </div>

        <div class="note wall-card" style="border-left-color: var(--amethyst)">
          <div class="who">A Light From…</div>
          <p>"Fourth message goes here."</p>
          <div class="sign">— Their name</div>
        </div>

        <div class="note wall-card" style="border-left-color: var(--burnished)">
          <div class="who">A Light From…</div>
          <p>"Fifth message goes here — add or delete cards freely."</p>
          <div class="sign">— Their name</div>
        </div>
      </div>
    </section>

    <!-- Closing -->
    <section class="closing">
      <span class="eyebrow">One Last Thing</span>
      <p>The stars are falling over Velaris, and every single one of them, tonight, falls for you.</p>
      <p class="big">
        To the stars who listen —<br />
        and to Jodi-Lee, who never stopped dreaming.
      </p>
    </section>
  </main>

  <footer class="sf-footer">
    Made with love, night-court magic, and a truly excessive amount of starlight ·
    For Jodi-Lee Rudolph
  </footer>
</template>

<script setup>
// Starfall shooting-star animation handled entirely via CSS keyframes below.
// Web Audio soundscape deferred — too complex for this implementation.
</script>

<style scoped>
/* ─── HERO ────────────────────────────────────────────────── */
.sf-hero {
  position: relative;
  padding: 6rem 1.5rem 5rem;
  text-align: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% -30%, #2c2a63 0%, #0d1020 65%);
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.st {
  fill: #fff;
}

@media (prefers-reduced-motion: no-preference) {
  .st {
    animation: twinkle 3.6s ease-in-out infinite;
  }

  .st:nth-child(3n) {
    animation-delay: 1.2s;
  }

  .st:nth-child(4n) {
    animation-delay: 2.3s;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.25; }
    50%       { opacity: 1; }
  }
}

/* Shooting stars */
.shoot {
  position: absolute;
  top: 8%;
  left: 0;
  width: 130px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(201, 148, 58, 0) 0%,
    var(--burnished) 60%,
    #fff 100%
  );
  opacity: 0;
  pointer-events: none;
}

.shoot.s2 { top: 22%; }
.shoot.s3 { top: 9%; }

@media (prefers-reduced-motion: no-preference) {
  .shoot {
    animation: shoot 6s ease-in infinite;
  }

  .shoot.s2 { animation-delay: 2.4s; }
  .shoot.s3 { animation-delay: 4.2s; }

  @keyframes shoot {
    0%, 72%   { transform: translate(-160px, 10vh) rotate(14deg); opacity: 0; }
    74%        { opacity: 1; }
    86%        { transform: translate(110vw, 32vh) rotate(14deg); opacity: 0.9; }
    88%, 100%  { opacity: 0; }
  }
}

.sf-content {
  position: relative;
  z-index: 1;
}

.sf-content h1 {
  font-size: clamp(2.4rem, 7.5vw, 4.5rem);
  line-height: 1.08;
  margin: 1rem 0 0.3rem;
  font-style: italic;
}

.name {
  display: block;
  color: var(--burnished);
  font-size: clamp(2.8rem, 8.5vw, 5.5rem);
  font-style: italic;
  font-weight: 600;
}

.lead {
  max-width: 36rem;
  margin: 1.6rem auto 0;
  color: var(--mist);
  font-style: italic;
  font-size: 1.12rem;
}

/* ─── MAIN ────────────────────────────────────────────────── */
main {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

/* ─── INTRO ───────────────────────────────────────────────── */
.intro {
  max-width: 42rem;
  margin: 0 auto;
  padding: 4rem 0 2.5rem;
  text-align: center;
}

.intro p {
  color: var(--mist);
  font-size: 1.1rem;
  font-style: italic;
}

/* ─── RHYSAND LETTER ──────────────────────────────────────── */
.rhys-letter {
  position: relative;
  margin: 2.5rem auto 4rem;
  max-width: 46rem;
  background: rgba(13, 16, 32, 0.9);
  border: 1px solid rgba(52, 56, 107, 0.8);
  padding: 3rem 2.4rem 2.6rem;
  box-shadow: 0 0 60px rgba(141, 116, 224, 0.18);
}

.rhys-letter::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(232, 200, 119, 0.35);
  pointer-events: none;
}

.seal {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
}

.letter-from {
  font-family: var(--font-display);
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--amethyst);
  text-align: center;
  margin-bottom: 1.4rem;
}

.rhys-letter h2 {
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  margin-bottom: 1.4rem;
}

.rhys-letter p {
  font-size: 1.1rem;
  color: var(--mist);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.letter-sig {
  text-align: right;
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 1.6rem;
  color: var(--burnished);
  margin-top: 1.6rem;
}

.letter-sig small {
  display: block;
  font-family: var(--font-display);
  font-style: normal;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--mist);
  margin-top: 0.3rem;
}

.personal {
  margin-top: 4rem;
  border-color: rgba(201, 148, 58, 0.4);
}

/* ─── MESSAGES ────────────────────────────────────────────── */
.messages {
  padding-top: 1rem;
}

.centered {
  display: block;
  text-align: center;
}

.messages h2 {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}

.sub {
  color: var(--mist);
  max-width: 36rem;
  margin: 0 auto 2rem;
}

.sub-sm {
  font-size: 0.85rem;
  color: var(--mist);
  opacity: 0.7;
  font-style: italic;
  max-width: 34rem;
  margin: 0 auto 2rem;
}

.mgrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.4rem;
  margin-top: 1.6rem;
}

/* Note cards */
.note {
  background: rgba(13, 16, 32, 0.8);
  border: 1px solid rgba(43, 47, 92, 0.8);
  border-left: 3px solid var(--amethyst);
  padding: 1.5rem 1.4rem;
}

.note.gold  { border-left-color: var(--burnished); }
.note.teal  { border-left-color: var(--mist); }
.note.rose  { border-left-color: var(--amethyst); }

.who {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--amethyst);
  margin-bottom: 0.6rem;
}

.note.gold .who { color: var(--burnished); }
.note.teal .who { color: var(--mist); }

.note p {
  font-size: 1rem;
  color: var(--mist);
  font-style: italic;
}

.sign {
  margin-top: 0.8rem;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  color: var(--moonwhite);
  font-style: italic;
  text-align: right;
}

/* Wall cards inherit .note — border-left-color set inline per card */
.wall-card {
  border-left-width: 3px;
}

/* ─── CLOSING ─────────────────────────────────────────────── */
.closing {
  text-align: center;
  padding: 5rem 1rem 2rem;
}

.closing p {
  color: var(--mist);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.closing .big {
  font-size: 1.4rem;
  color: var(--moonwhite);
  margin-top: 1.2rem;
  line-height: 1.6;
}

/* ─── FOOTER ──────────────────────────────────────────────── */
.sf-footer {
  background: rgba(6, 8, 14, 0.9);
  color: var(--mist);
  text-align: center;
  padding: 2rem 1.5rem;
  font-style: italic;
  font-size: 0.9rem;
}

/* ─── EYEBROW (global token reuse) ───────────────────────── */
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--amethyst);
  display: block;
  margin-bottom: 0.6rem;
}
</style>
