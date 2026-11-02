// Amalia's words, from her brand pack, logo system, launch post and her
// website doc, edited for a friendly tone with no new facts or claims. Her
// essay and its quote are signed with her name, so they stay word for word.
//
// DRAFT marks stand-in lines that still need Amalia's own words before launch.
// They render as normal.
const DRAFT = <T,>(text: T) => text;

export const copy = {
  essence: 'Every pace counts.',
  essenceBody:
    'One idea sits behind everything we do: no pace is too slow, no goal is too small, and there’s no wrong kind of body or brain.',
  heroLine: 'Soles with Goals is a running community where every way of moving counts.',
  // Her intake description, with the community's name.
  introLine:
    'Soles with Goals brings young Pakistani girls with and without intellectual disabilities into one community to enjoy running regardless of their level.',
  startLine: 'The start line belongs to every woman.',
  vision:
    'A world where every woman, whether her disability is visible, invisible or not there at all, can look at a start line and think: that’s mine.',
  mission:
    'We’re building a running community where women and girls walk, wheel and run at their own pace, toward goals they choose for themselves',
  missionSop:
    ', and where every step helps athletes with intellectual disabilities through Special Olympics Pakistan',
  origin:
    'Soles with Goals was started by a New York runner who knows that not every challenge shows on the outside. She runs for the neurodivergent community, and she wanted a race where nobody has to explain themselves to belong.',
  // Her "Who we are" paragraph (website doc), reworded to match the rest. The
  // Special Olympics Pakistan line is an affiliation and a statistic, so it waits
  // for SOP's written OK like every other SOP claim.
  whoWeAre: [
    { text: 'The Starting Line was founded by Amalia Jaffer, a high school varsity runner living in New York. She’s of Pakistani descent and visits her relatives in Karachi every year.' },
    { text: 'Running has changed her life, teaching her discipline, resilience and perseverance through hard moments on and off the track, and it inspired her to start a running community of her own. She first planned to base it in New York, until she realized New York already had plenty of running clubs anyone could join, while Karachi had almost none for girls.' },
    { text: 'Through her work with Special Olympics Pakistan, she learned from its directors that the number of female athletes had dropped sharply after Covid-19.', sop: true },
    { text: 'As a proud feminist, Amalia wanted to understand what was keeping girls off the track and find a solution. Months of research led to the launch of The Starting Line.' },
  ],
  name: [
    { word: 'Soles', text: 'the feet that carry us, and the souls behind them.' },
    { word: 'Goals', text: 'the finish line each woman picks for herself, and the fundraising goal we chase together.' },
  ],
  positioning:
    'For every woman and girl who’s been told, or has told herself, that running isn’t for her: Soles with Goals is a running community where every way of moving counts.',
  positioningUnlike:
    'Unlike a traditional race club, we’re designed with disabled and neurodivergent women from day one, not adapted for them later',
  positioningSop: ', and every step raises money for Special Olympics Pakistan',

  pillars: [
    { title: 'Every pace counts', text: 'Walk, wheel or run. There’s no last place, and the finish line stays loud until the very last finisher crosses it.', tone: 'rasp' },
    { title: 'Seen & unseen', text: 'Visible and invisible disabilities are equally welcome. You never have to prove or explain anything.', tone: 'navy' },
    { title: 'Your goal, your way', text: 'You set the finish: the first mile, the whole 5K, beating your last time, or simply showing up.', tone: 'aqua' },
    { title: 'Steps that give back', text: 'From Central Park to Pakistan, every registration and every mile raises money for Special Olympics Pakistan athletes.', tone: 'outline', sop: true },
  ],

  ring: {
    title: 'One ring that’s a track, a wheel, a medal and a goal, all at once.',
    parts: [
      { lead: 'The solid arc is what you can see:', text: 'visible disabilities and visible effort.', tone: 'cream' },
      { lead: 'The dotted arc is what you can’t:', text: 'invisible disabilities, neurodivergence and the quiet battles. They look different, but they’re just as much a part of the circle.', tone: 'aqua' },
      { lead: 'The raspberry dot is her,', text: 'standing right where the start line and the finish line meet.', tone: 'rasp' },
    ],
    close: 'Together they close the loop, because nobody completes the circle alone.',
  },

  values: [
    { title: 'Belonging', text: 'Every girl on the track is an athlete. She isn’t a case, a charity or an exception. She’s a valued teammate.' },
    { title: 'Access, not ability', text: 'If a girl can’t take part, the problem is the design, not the girl. We change the pace, the words and the plan, never the invitation.' },
    { title: 'Women first', text: 'Led by women, taught by women and decided by women. Families can trust it, and girls can own it.' },
    { title: 'Beyond the sport', text: 'Running is where it all starts. Confidence, leadership and the courage to build something of your own are where it leads.' },
    { title: 'Honesty', text: 'We share what we know, what we’re still learning and what hasn’t worked. We’re a new community with no track record, so we earn trust by never pretending otherwise.' },
    { title: 'Persistence', text: 'Showing up is the whole sport. We measure ourselves by who comes back.' },
    { title: 'Nothing about us without us', text: 'Decisions about girls with disabilities are made with them in the room.' },
  ],

  fiveK: {
    eyebrow: 'Inaugural 5K · Central Park, NYC',
    title: ['Walk it.', 'Wheel it.', 'Run it.'],
    launch: 'The Soles with Goals 5K is for women and girls with visible disabilities, invisible disabilities, or none at all.',
    goalTitle: 'You set the finish.',
    goalText: 'The first mile, the whole 5K, beating your last time, or simply showing up.',
  },

  programme: {
    teaserTitle: 'Running is the Starting Line, not the finish.',
    teaser:
      'Every week, girls in Karachi, Pakistan run together with female coaches. Each session ends with a twenty-minute module, taught in English and Urdu.',
    title: 'We start with the barriers, not the program.',
    vision:
      'We picture a Pakistan where girls of every ability can start running and take in everything it teaches: resilience, strength, leadership and the nerve to start something new.',
    mission:
      'The Starting Line brings young Pakistani girls with and without intellectual disabilities together as one community, where everyone can enjoy running at their own level. Through hands-on modules, we show how running can change your life, building the discipline, perseverance and confidence it takes to lead and to start a business. Running is a girl’s starting line, and everything she learns here is meant to carry her through life.',
    principles: [
      {
        title: 'We start with the barriers, not the program',
        parts: [
          { text: 'Before we built anything, we looked into why female athletes at Special Olympics Pakistan take part less, and what stops women in Pakistan from running.', sop: true },
          { text: 'The biggest barriers are what women can wear, where they’re allowed to go and who they can be with, often decided by what their families and communities say. The Starting Line is built around those answers, not around a typical New York running club.' },
        ],
      },
      { title: 'Unified means one team', parts: [{ text: 'Young women with intellectual disabilities aren’t put in a separate group with separate coaching. Everyone runs the same route, joins the same modules and is on the same roster, with support whenever it’s needed.' }] },
      { title: 'Women lead everything', parts: [{ text: 'Our coaches, teachers and organizers are all women. That’s how families say yes, and how girls feel safe enough to keep coming back.' }] },
      { title: 'Running is the Starting Line, not the finish', parts: [{ text: 'Five modules run alongside training.' }], modulesLink: true },
      { title: 'Free, always', parts: [{ text: 'The Starting Line is open to everyone, and that includes money. There are no fees, ever.' }] },
      { title: 'Built to outlast us', parts: [{ text: 'Everything we make, from modules and session plans to downloadable resources, is designed so local coaches and partner organizations can pick it up and run with it.' }] },
      {
        title: 'Rooted in Pakistan',
        sop: true,
        parts: [{ text: 'We partner with organizations already working in Pakistan, like Special Olympics Pakistan. The Starting Line has a formal partnership with Special Olympics Pakistan and runs alongside them, and we’d love to welcome more partners in the future.' }],
      },
    ],
    sessionsTitle: 'Every week, all our athletes meet and train together.',
    sessions: ['A dynamic warm-up', 'A short run or movement exercise', 'A cool-down', 'A 20 to 30 minute module'],
    sessionsText:
      'Modules go beyond running, covering leadership, health and wellness, entrepreneurship and speaking up for women and girls. Each one is engaging, visual and hands-on, and taught in both English and Urdu.',
    // The rest of her "How we work" paragraph.
    howWeWork: [
      'Specific modules include how sports drive leadership, the science of movement and how it helps you focus, female leaders in the business world, and successful female athletes.',
      'Module slides are downloadable, and lessons will be recorded, so any participant can catch up from home when she needs to.',
      'It’s free, there are no tryouts, and any girl who shows up is part of the team.',
    ],
    whoFor: 'The Starting Line is for young Pakistani women aged 12 to 25 who’ve never had a place to run.',
    whoForMore:
      'Girls with intellectual disabilities, who are so often left out of sport, take part as full members of the same team. The program is designed with families’ concerns in mind: it asks for family consent, and it’s modest, free and led by women.',
  },

  impact: {
    title: 'Running is free, and the knowledge that keeps you running should be free too.',
    modulesIntro:
      'Every session ends with twenty minutes of learning. Our five modules are taught by women in English and Urdu, and any coach with the slides can lead them.',
    modules: [
      { title: 'How running helps you focus and get things done', text: null as string | null },
      { title: 'How to fuel your body', text: null as string | null },
      { title: 'Female leadership', text: null as string | null },
      { title: 'Starting a business', text: null as string | null },
      { title: 'Storytelling', text: null as string | null },
    ],
    resourcesTitle: 'Free to download in English and Urdu, for any coach or girl who wants them.',
    resources: [
      { title: 'Energy and iron: a one-page guide for female runners', file: null as string | null, status: null as string | null },
      { title: 'Build your plate: local foods for before and after a run', file: null as string | null, status: 'Coming with Module 2' },
      { title: 'Your first four weeks: a beginner’s running plan', file: null as string | null, status: 'Coming soon' },
    ],
    coachTitle: 'Any coach or organization can run these without us.',
    coachText: 'Every module comes with a downloadable lesson plan, so any coach or organization can lead it on their own.',
  },

  stories: {
    title: 'The first story is still being written.',
    intro:
      'Soon this page will share stories from the girls who run with us, in their own words and with their and their families’ permission. Until then, here’s why we run.',
    whoTitle: DRAFT('Kept off the track by rules nobody wrote down.'),
    who: [
      'Girls in Pakistan are kept off the track by unwritten rules about where they can go, what they can wear and who they can be with. Girls with intellectual disabilities face all of that and more.',
      'We don’t think any of this is about ability. It’s about access, and access is something we can build.',
    ],
    comingTitle: 'Coming soon',
    comingText: 'Each story will have her name, a photo and a line in her own words.',
    // Real stories only, each with the athlete's and her family's written OK.
    entries: [] as { name: string; line: string; photo: string | null }[],
    consent:
      'Every story here is shared with the athlete’s permission and her family’s, in her own words, and we never publish anything she hasn’t read first.',
  },

  involved: {
    title: 'Any girl who shows up is part of the team.',
    sub: DRAFT('Come run with us, coach with us or partner with us.'),
    formNote:
      'Our sign-up forms are Google Forms in Amalia’s account. If you’re under 18, a parent or guardian needs to fill in or sign the consent part. Please leave out health details and anyone else’s personal details.',
    roles: [
      { id: 'run', title: 'Run with us', text: 'Walk, wheel or run, at your own pace.' as string | null, form: 'run' },
      { id: 'families', title: 'Families', text: null as string | null, form: 'families' },
      { id: 'volunteer', title: 'Volunteer', text: null as string | null, form: 'volunteer' },
      { id: 'coach', title: 'Coach with us', text: 'All our coaches, teachers and organizers are women.' as string | null, form: 'coach' },
      { id: 'partner', title: 'Partner', text: null as string | null, form: 'partner' },
    ],
  },

  fundraising: {
    title: DRAFT('Free, always. Your gift helps keep it that way.'),
    updates: DRAFT('Get our updates'),
  },

  essay: {
    opening: 'I found running by quitting it.',
    paragraphs: [
      'I had already failed at every sport involving a ball: my volleyball serves died at the net, free throws escaped the hoop, and my feet could never find the soccer ball. By fifth grade, running was the only choice left.',
      'In middle school, track wasn’t that serious. My friends and I would do “workouts” consisting of single laps around the Icahn Stadium track, munch on Nerd Clusters during our meets, and watch Gossip Girl instead of stretching.',
      'In eighth grade I joined varsity. Running stopped being a leftover. My coach pushed us to “win the moment” in every practice, race, and meet. I loved being part of the team, but I also felt the pressure to perform.',
      'Then, school caught up with me. One week, I was battling a history paper on Aztec agriculture, a math test on trigonometry, and a biology lab on the digestive system. Track felt like the one variable I could remove. Fewer practices meant more hours to study. More hours meant higher productivity and better grades.',
    ],
    beats: ['So I quit.', 'I expected relief.', 'Instead, I felt strangely lost.'],
    middle: [
      'Without practice, my afternoons stretched out empty, but somehow I wasn’t getting more done. I was grouchy at lunch. My time management fell apart, and my schoolwork seemed to expand into every empty hour I had created. Ironically, the math test I had supposedly spared extra time to prepare for became the worst result I had ever gotten.',
      'The strangest part was how much my body missed running even before my mind did.',
      'I missed putting on my running shoes and knowing exactly where I needed to be. I missed being tired for a reason, the earned exhaustion of a hard workout finished alongside teammates who’d struggled through it with me. Most of all, I missed feeling like myself. I had always thought of running as something I did. During that week away from the team, I realized it had become part of who I was.',
    ],
    end: [
      'To rejoin, I had to convince my coach that I was committed. She asked me to take a few days to really think about it, but each passing day only made me want to run even more. Coming back felt like coming back to life. The daily maintenance runs I had once found boring were moments I now longed for. Even in the coldest January when the Reservoir was grey and the trees went bare, I relished the feeling of frosty air on my cheeks. Hard workouts, which I had once dreaded, became something I wanted to conquer. With running back in my life, I felt complete.',
      'I don’t run to become a professional athlete. I run for Saturday long runs on the treadmill: headphones blasting my favorite songs, reflecting on my most recent tests and my accomplishments of the week, until I stare at the clock and realize I’ve been running the whole time. I love the rush after finishing a mile repeats workout I didn’t think I could complete. And I love the teammates who run beside me, turning difficult miles into endless memories.',
      'I used to think that giving up running would give me more time to become the person I wanted to be. Instead, I learned that running was already helping me become that person. It gives me discipline and resilience, but also something that can’t be measured on a report card: joy.',
      'Now, when school feels like too much, I put on my running shoes; not to escape my responsibilities, but to come back to them with a clearer mind, more energy, and a better sense of myself.',
    ],
    closing: ['Running doesn’t take me away from my life.', 'It helps me live it.'],
    quote: 'Running doesn’t take me away from my life. It helps me live it.',
    byline: 'Amalia Jaffer, founder of The Starting Line',
  },
};
