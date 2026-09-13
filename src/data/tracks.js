// All per-track content lives here. Single source of truth.

export const TRACKS = [
  {
    id: 'engineering',
    name: 'Engineering & Tech',
    short: 'ENG',
    code: '01',
    oneLiner: 'Pick a path. See what four years inside it actually feels like.',
    beats: [
      'Pick a path.',
      'See what four years inside it actually feels like.',
      'Before you pay for the wrong one.'
    ],
    final: 'Compass is the catalog your orientation week never gave you.',
    canvas: 'engineering',
    week: [
      {
        when: 'Monday, 9am',
        title: 'Algorithms lecture',
        body: 'Algorithms lecture, 400-seat hall. The TA draws a recursion tree and erases it before you have copied it down.'
      },
      {
        when: 'Wednesday, 2pm',
        title: 'Lab with a third-year',
        body: 'The bug is not in your code. It is in your assumptions. A third-year squints at your screen, points at one line, and says "that one."'
      },
      {
        when: 'Friday, 6pm',
        title: 'Build night',
        body: 'Your team ships a side project. Pizza arrives. Someone commits at midnight. Someone else leaves at 9. Both of you ship by Sunday.'
      }
    ],
    build: [
      'A working compiler for a tiny language, by week six of your second year.',
      'A side project with strangers you met at a hackathon, kept alive on weekends.',
      'A portfolio that reads as proof, not promise.'
    ],
    resources: [
      { name: 'ACM student chapter', body: 'Meet your first collaborator here.' },
      { name: 'The maker space', body: '3D printers, soldering irons, and someone at the front desk who knows where the parts are.' },
      { name: 'Hackathon calendar', body: 'Three per semester, all on campus, all free.' },
      { name: 'Office hours', body: 'The professor actually answers, if you actually go.' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Entrepreneurship',
    short: 'BIZ',
    code: '02',
    oneLiner: 'The pitch deck is not the product. Four years is one long customer interview.',
    beats: [
      'The pitch deck is not the product.',
      'Four years is one long customer interview.',
      'Find the people who would pay tomorrow.'
    ],
    final: 'Compass shows you the room before you walk in.',
    canvas: 'business',
    week: [
      {
        when: 'Monday, 8am',
        title: 'Case study cold open',
        body: 'Twenty pages dropped at 7am. Your team has until 3pm. The case is about a founder who almost fired herself.'
      },
      {
        when: 'Tuesday, 7pm',
        title: 'Pitch night',
        body: 'Three founders, ten minutes each, real questions from the floor. One of them is twenty years old.'
      },
      {
        when: 'Friday, 4pm',
        title: 'Coffee with an alum',
        body: 'The alum who sold her second company tells you what she wishes she had known. She does not tell you to network. She tells you to write.'
      }
    ],
    build: [
      'A real business model for a real customer, validated in a semester.',
      'A deck you have pitched to a room that was not grading you.',
      'A notebook of small favors that is actually worth more than a contact list.'
    ],
    resources: [
      { name: 'The entrepreneurship center', body: 'Free desk space, free coffee, no free advice.' },
      { name: 'The pitch competition', body: 'Your first investor simulation.' },
      { name: 'Alumni mentor list', body: 'Ask one good question, get one honest answer.' },
      { name: 'The writing circle', body: 'Your best business skill is the sentence you write at 11pm.' }
    ]
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    short: 'ART',
    code: '03',
    oneLiner: 'Talent is a practice, not a portfolio. The work is the long quiet hours.',
    beats: [
      'Talent is a practice, not a portfolio.',
      'The work is the long quiet hours.',
      'See the studio before you choose the studio.'
    ],
    final: 'Compass is the tour your admissions tour skipped.',
    canvas: 'arts',
    week: [
      {
        when: 'Tuesday, 10am',
        title: 'Studio critique',
        body: 'Twelve works on the wall, twelve different ways to be wrong. The professor points at yours and asks one question that takes the rest of the day to answer.'
      },
      {
        when: 'Thursday, midnight',
        title: 'Printmaking studio',
        body: 'The press is yours for two hours if no one is waiting. You lose track of time. You find your work changed.'
      },
      {
        when: 'Sunday, morning',
        title: 'Open figure drawing',
        body: 'Same model, same pose, different hand. You notice what you did not see last week.'
      }
    ],
    build: [
      'A body of work that does not fit on a single portfolio page.',
      'A critique vocabulary sharp enough to take apart your own work.',
      'A practice you can defend on the days you do not feel like defending anything.'
    ],
    resources: [
      { name: 'The studio coop', body: 'Cheap materials, late hours, no questions.' },
      { name: 'Visiting artist talks', body: 'Most are free, almost all are worth it.' },
      { name: 'The print lab', body: 'Analog skills sharpen digital work.' },
      { name: 'Senior thesis show', body: 'Your deadline, your audience, your opening night.' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Science',
    short: 'HEA',
    code: '04',
    oneLiner: 'Caring for people is a craft. Know the weight before you carry it.',
    beats: [
      'Caring for people is a craft.',
      'Labs, rounds, study, sleep. Repeat.',
      'Know the weight before you carry it.'
    ],
    final: 'Compass shows you the shift, not the brochure.',
    canvas: 'health',
    week: [
      {
        when: 'Monday, 7am',
        title: 'Anatomy lab',
        body: 'The donor on your table has been here longer than most of your professors. You learn to look at what cannot be unseen.'
      },
      {
        when: 'Thursday, noon',
        title: 'Hospital rounds',
        body: 'You stand where the team stands. The attending asks you to summarize in one sentence. You do. You learn later it was the right one.'
      },
      {
        when: 'Saturday, morning',
        title: 'Library basement study group',
        body: 'Someone brings flashcards. Someone brings coffee. Someone brings a friend who cried in last week\'s exam and needs to pass this one.'
      }
    ],
    build: [
      'A clinical instinct you can name, not just feel.',
      'A study system that survives contact with the syllabus.',
      'A clear-eyed sense of who you are at the end of a long week.'
    ],
    resources: [
      { name: 'The simulation center', body: 'Practice the worst day of your career on a mannequin before it happens for real.' },
      { name: 'Shadow program', body: 'Eight hours in a unit you think you want.' },
      { name: 'The wellness office', body: 'For the weeks when the work is the work.' },
      { name: 'Peer support network', body: 'The people who will study with you at 2am because they need it too.' }
    ]
  }
];

export const DEFAULT_TRACK = TRACKS[0];
