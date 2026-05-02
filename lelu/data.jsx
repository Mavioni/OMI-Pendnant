// data.jsx — seed entries, prompts, moods.

const MOODS = [
  { id: 'radiant',  label: 'Radiant',  color: '#FBBF24', value: 5 },
  { id: 'steady',   label: 'Steady',   color: '#10B981', value: 4 },
  { id: 'cloudy',   label: 'Cloudy',   color: '#94A3B8', value: 3 },
  { id: 'heavy',    label: 'Heavy',    color: '#6366F1', value: 2 },
  { id: 'frayed',   label: 'Frayed',   color: '#EF4444', value: 1 },
];

const MOOD_BY_ID = Object.fromEntries(MOODS.map(m => [m.id, m]));

const PROMPTS_LIBRARY = [
  "What did today ask of you that you didn't expect?",
  "Name one thing you noticed this morning that you might have missed last week.",
  "Where did your attention keep returning?",
  "If today had a single sentence, what would it be?",
  "What's a small thing you're proud of from the last 24 hours?",
  "Who did you think about today, and why?",
  "What needs to be put down before tomorrow?",
];

// 30 days of seed entries — varied length, mood, themes.
const SEED_ENTRIES = [
  {
    id: 'e-2026-05-01',
    date: '2026-05-01',
    title: 'The patio in the rain',
    mood: 'steady',
    body: `Got the deck finished before the rain hit. Stood under the awning watching the gutters flood and felt that strange satisfaction of finishing a thing on time. Marco called about the quarterly numbers — said they're ahead of plan but he's nervous about Q3. I told him nervous is fine, panicked is not. He laughed.

Read 40 pages of the Didion before bed. Underlined: "we tell ourselves stories in order to live." Same as always.`,
    tags: ['work', 'reading', 'home'],
    annotations: [
      { idx: 1, text: '"Nervous is fine, panicked is not" — recurring management heuristic. You said this almost verbatim on Mar 14.' },
    ],
    aiSummary: 'A grounded day. Closed a project, comforted a colleague, returned to a familiar book.',
  },
  {
    id: 'e-2026-04-30',
    date: '2026-04-30',
    title: 'Coffee with Anna',
    mood: 'radiant',
    body: `Anna's back from Lisbon. We sat at the corner table at Verdant for two and a half hours and only realized the time when the waiter came over to flip chairs. She's thinking about leaving the firm. Said it like she'd been holding it in.

I told her about the diary thing. She rolled her eyes but I think she was secretly into it.`,
    tags: ['friends', 'verdant'],
    annotations: [
      { idx: 0, text: 'Anna mentioned for the 4th time this month. You see her more than you note in your calendar.' },
    ],
    aiSummary: 'Long, easy conversation with a close friend. Noted: career restlessness in your circle.',
  },
  {
    id: 'e-2026-04-29',
    date: '2026-04-29',
    title: 'Off day',
    mood: 'cloudy',
    body: `Slow start. Couldn't focus on the deck — kept rewriting the same slide. Walked to the river around 4 and that helped a little. Tomorrow I'll start with the hardest thing first.`,
    tags: ['work', 'walk'],
    aiSummary: 'Low-energy day; you self-prescribed a walk and a plan.',
  },
  {
    id: 'e-2026-04-28',
    date: '2026-04-28',
    title: '',
    mood: 'steady',
    body: `Long meeting day. Three back-to-back, then prep for the board. Ate at my desk twice — that has to stop. Kept thinking about that line from the documentary: "the work isn't the work, the rhythm is the work."`,
    tags: ['work'],
    aiSummary: 'Heavy workload, you flagged a habit you want to break.',
  },
  {
    id: 'e-2026-04-27',
    date: '2026-04-27',
    title: 'Sunday with no plan',
    mood: 'radiant',
    body: `No alarm. Made eggs. Read the Sunday paper cover to cover, which I haven't done in years. Called Mom — she's fine, the garden is "out of control in a good way." Spent the afternoon repotting the fiddle leaf and it sulked at me the entire time.`,
    tags: ['family', 'home', 'rest'],
    aiSummary: 'A restful Sunday; family check-in; small domestic care.',
  },
  {
    id: 'e-2026-04-26',
    date: '2026-04-26',
    title: 'Run, then nothing',
    mood: 'steady',
    body: `5k before sunrise. Then a long lazy day. Watched two films back-to-back, both mediocre. Don't know why I do this to myself.`,
    tags: ['exercise', 'rest'],
  },
  {
    id: 'e-2026-04-25',
    date: '2026-04-25',
    title: 'The argument with J',
    mood: 'frayed',
    body: `It started about the dishes and ended about something else entirely, the way these things do. We're fine. We're always fine. But I noticed I held a grievance for six hours longer than I needed to. Working on that.`,
    tags: ['relationships'],
    annotations: [
      { idx: 0, text: 'Pattern: arguments started over a small task, escalated to deeper themes. 3rd entry in 6 weeks with this shape.' },
    ],
    aiSummary: 'A flare-up with a partner. You named the pattern yourself.',
  },
  {
    id: 'e-2026-04-24',
    date: '2026-04-24',
    title: 'Ship day',
    mood: 'radiant',
    body: `We shipped. The thing we've been working on for ten weeks went out the door and the world did not end. Champagne at 5pm, home by 7. I felt that specific kind of empty that comes after finishing.`,
    tags: ['work', 'milestone'],
    aiSummary: 'Major release. Mood: accomplished, then the post-launch quiet.',
  },
  { id: 'e-2026-04-23', date: '2026-04-23', title: '', mood: 'steady', body: 'Final review. Found three bugs, fixed two. Slept badly thinking about the third.', tags: ['work'] },
  { id: 'e-2026-04-22', date: '2026-04-22', title: '', mood: 'heavy', body: "Dad's checkup went fine but it took the whole day to feel fine about it. Driving home in the dark felt longer than it was.", tags: ['family'] },
  { id: 'e-2026-04-21', date: '2026-04-21', title: 'Pages', mood: 'steady', body: 'Wrote 1,200 words on the side project. None of them are good but all of them are written.', tags: ['writing'] },
  { id: 'e-2026-04-20', date: '2026-04-20', title: '', mood: 'cloudy', body: 'Rain all day. Read. Slept early.', tags: ['rest'] },
  { id: 'e-2026-04-19', date: '2026-04-19', title: 'Birthday party', mood: 'radiant', body: 'Sam turned 40. The toast made me cry and I am not a crier at parties.', tags: ['friends'] },
  { id: 'e-2026-04-18', date: '2026-04-18', title: '', mood: 'steady', body: "Worked from the cafe on 6th. The barista now knows my order which I find both flattering and slightly alarming.", tags: ['work'] },
  { id: 'e-2026-04-17', date: '2026-04-17', title: '', mood: 'frayed', body: "Long argument with the contractor. He's not wrong but he's not right either.", tags: ['home'] },
  { id: 'e-2026-04-16', date: '2026-04-16', title: 'A clean morning', mood: 'radiant', body: 'Up at 6, gym, coffee, an hour of writing before anyone else was awake. The whole day rode that wave.', tags: ['exercise', 'writing'] },
  { id: 'e-2026-04-15', date: '2026-04-15', title: '', mood: 'steady', body: 'Taxes done. Twelve months of putting it off and it took ninety minutes.', tags: ['admin'] },
  { id: 'e-2026-04-14', date: '2026-04-14', title: '', mood: 'cloudy', body: 'Foggy head. Drank too much coffee to compensate. Mistake.', tags: [] },
  { id: 'e-2026-04-13', date: '2026-04-13', title: 'Hike', mood: 'radiant', body: 'Drove out to Cathedral and made it to the saddle by noon. Wind on the ridge could strip paint.', tags: ['outdoors'] },
  { id: 'e-2026-04-12', date: '2026-04-12', title: '', mood: 'steady', body: 'Quiet Saturday. Made stock from scratch. Smells like my grandmother\'s house.', tags: ['home'] },
  { id: 'e-2026-04-11', date: '2026-04-11', title: '', mood: 'heavy', body: 'News was rough. Closed the app at 9am and didn\'t open it again.', tags: [] },
  { id: 'e-2026-04-10', date: '2026-04-10', title: 'Demo', mood: 'steady', body: 'Demo went well. Two follow-ups already. Felt the impostor thing creep in around 4pm but went for a walk and shook it.', tags: ['work'] },
  { id: 'e-2026-04-09', date: '2026-04-09', title: '', mood: 'steady', body: 'Cleared inbox to zero. Will not last past Friday.', tags: ['admin'] },
  { id: 'e-2026-04-08', date: '2026-04-08', title: '', mood: 'cloudy', body: 'Insomnia. Read until 3am. Functional but fragile today.', tags: [] },
  { id: 'e-2026-04-07', date: '2026-04-07', title: '', mood: 'radiant', body: 'Dinner with the team. Real laughs. The new hire is going to be great.', tags: ['work', 'friends'] },
  { id: 'e-2026-04-06', date: '2026-04-06', title: '', mood: 'steady', body: 'Sunday. Long lunch. Two-hour nap I will not apologize for.', tags: ['rest'] },
  { id: 'e-2026-04-05', date: '2026-04-05', title: '', mood: 'steady', body: 'Saturday errands. Replaced the kitchen faucet without breaking anything, including myself.', tags: ['home'] },
  { id: 'e-2026-04-04', date: '2026-04-04', title: '', mood: 'frayed', body: 'Difficult call with M. Hung up feeling smaller. Going to think about whether that\'s on me or them.', tags: ['relationships'] },
  { id: 'e-2026-04-03', date: '2026-04-03', title: '', mood: 'steady', body: 'Closed the loop on three things that have been open for a month.', tags: ['work'] },
  { id: 'e-2026-04-02', date: '2026-04-02', title: '', mood: 'radiant', body: 'First warm evening of the year. Sat outside until the streetlights came on.', tags: ['home'] },
];

// Recurring themes detected by AI (mock).
const THEMES = [
  { id: 'work-rhythm',  label: 'Work rhythm',     count: 18, trend: 'steady',   color: '#3B82F6' },
  { id: 'rest',         label: 'Rest & recovery', count: 11, trend: 'rising',   color: '#10B981' },
  { id: 'relationships',label: 'Close circle',    count: 9,  trend: 'steady',   color: '#FBBF24' },
  { id: 'family',       label: 'Family',          count: 5,  trend: 'falling',  color: '#6366F1' },
  { id: 'writing',      label: 'Writing',         count: 4,  trend: 'rising',   color: '#94A3B8' },
];

window.MOODS = MOODS;
window.MOOD_BY_ID = MOOD_BY_ID;
window.PROMPTS_LIBRARY = PROMPTS_LIBRARY;
window.SEED_ENTRIES = SEED_ENTRIES;
window.THEMES = THEMES;
