/* ═══════════════════════════════════════════════════════════════
   ExploraQuestions — site behaviour
   No dependencies, no build step.

   To change the sample questions, edit QUESTIONS below. Each theme
   needs at least one; the year cycles through them in order.
   ═══════════════════════════════════════════════════════════════ */

/* Themes in the order the year rotates through them.
   365 days ÷ 6 themes → the first five get 61 questions, Clarity gets 60. */
var THEMES = [
  { name: 'Gratitude',   cat: 'green'  },
  { name: 'Courage',     cat: 'orange' },
  { name: 'Possibility', cat: 'purple' },
  { name: 'Well-Being',  cat: 'sky'    },
  { name: 'Connection',  cat: 'coral'  },
  { name: 'Clarity',     cat: 'indigo' }
];

var QUESTIONS = {
  'Gratitude': [
    'How can you practice radical kindness today?',
    'What can you do to spark joy?',
    "What's one kind thing you can do for yourself today?",
    'Who made your day easier this week without being asked?',
    'What ordinary thing would you miss most?',
    'What went right that you almost failed to notice?',
    'What do you have now that you once hoped for?',
    'Which small comfort is worth protecting?',
    'What did today give you that yesterday did not?',
    'Who taught you something you still use?',
    'What are you glad you said no to?'
  ],
  'Courage': [
    'What change are you ready for?',
    'How can you be bold today?',
    'Which conversation have you been rehearsing instead of having?',
    'What are you tolerating that you could change this month?',
    'When did you last surprise yourself?',
    'What would you do differently if you trusted yourself more?',
    'Which fear has been quietly making your decisions?',
    'What is the smallest brave thing available to you today?',
    'Where are you playing it safer than you need to?',
    'What would you tell a friend in your exact position?',
    'What have you outgrown but not yet let go of?'
  ],
  'Possibility': [
    'What can you come up with by generating 10 new ideas today?',
    'What\u2019s a creative act you can take today?',
    'What could next year look like if nothing had to stay the same?',
    'Which door have you assumed was locked?',
    'What would you make if it did not have to be good?',
    'Where would you go with a free month and no plan?',
    'What skill would change your life if you actually learned it?',
    'Who would you become with more time and less fear?',
    'What is the most interesting problem you could work on?',
    'What did you want at ten that still sounds good?',
    'What would you start if you were not starting late?'
  ],
  'Well-Being': [
    'What helps you feel alive in your body?',
    'What can you let go of today?',
    'What is your body asking for that you keep postponing?',
    'Which habit is quietly costing you the most?',
    'When did you last feel properly unhurried?',
    'What would a slower version of this week involve?',
    'What do you do that leaves you better than it found you?',
    'Where does your energy go before noon?',
    'What would you need in order to sleep well tonight?',
    'Which boundary would make the next month easier?',
    'How do you know when you have had enough?'
  ],
  'Connection': [
    'How can you cause a positive ripple?',
    'Who have you drifted from, and does it matter?',
    'When did someone last make you feel understood?',
    'What do you find hard to ask people for?',
    'Which relationship deserves more of your attention?',
    'How do you show care when you cannot find the words?',
    'Who would you call at 2am, and do they know it?',
    'What do people misread about you?',
    'What conversation are you overdue for?',
    'Who are you at your easiest, and who are you with?'
  ],
  'Clarity': [
    'What does your inner compass point to?',
    'Which decision have you already made but not admitted?',
    'What are you actually optimising for right now?',
    'What would you drop if you could only keep three things?',
    'Which story about yourself is out of date?',
    'What do you keep saying yes to, and why?',
    'What is the real question underneath the one you keep asking?',
    'Where does your attention go when it wanders?',
    'What would change if you were honest about what you want?',
    'What is true today that was not true a year ago?'
  ]
};

/* Build the year: 365 entries of { day, theme, cat, q } */
var YEAR = (function () {
  var year = [];
  for (var i = 0; i < 365; i++) {
    var theme = THEMES[i % THEMES.length];
    var pool = QUESTIONS[theme.name];
    year.push({
      day: i + 1,
      theme: theme.name,
      cat: theme.cat,
      q: pool[Math.floor(i / THEMES.length) % pool.length]
    });
  }
  return year;
})();

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Nav: hairline once you scroll ─────────────────────────── */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 12); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Hero: the question card cycles through the six themes ──
   The card itself stays blue, the way it looks in the app; only the
   question and its theme label change. */
(function () {
  var card = document.getElementById('qcard');
  var text = document.getElementById('q-text');
  var day = document.getElementById('q-day');
  var cat = document.getElementById('q-cat');
  if (!card || !text || reduceMotion) return;

  /* One question per theme, so a full cycle shows the whole palette */
  var picks = [1, 2, 3, 4, 5, 6].map(function (d) { return YEAR[d - 1]; });
  var i = 0;

  setInterval(function () {
    i = (i + 1) % picks.length;
    var p = picks[i];
    text.classList.add('out');
    setTimeout(function () {
      text.textContent = p.q;
      day.textContent = 'Day ' + p.day + ' of 365';
      cat.textContent = p.theme;
      text.classList.remove('out');
    }, 400);
  }, 4600);
})();

/* ── Hero ribbon: the year as a 6-colour rule ──────────────── */
(function () {
  var order = ['green', 'orange', 'purple', 'sky', 'coral', 'indigo'];
  var colours = {
    green: '#15A94A', orange: '#E5801E', purple: '#B36FD8',
    sky: '#6FB6DD', coral: '#F4646B', indigo: '#3B45C4'
  };
  document.querySelectorAll('.ribbon').forEach(function (ribbon) {
    order.forEach(function (c) {
      var i = document.createElement('i');
      i.style.background = colours[c];
      ribbon.appendChild(i);
    });
  });
})();

/* ── Scroll reveals ────────────────────────────────────────── */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  items.forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i, 4) * 60) + 'ms';
    io.observe(el);
  });
})();
