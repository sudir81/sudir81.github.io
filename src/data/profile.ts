// All personal content lives here. Edit text freely; components just render it.
export const profile = {
  name: 'Sudheer Papineni',
  initials: 'SP',
  title: 'Web & Mobile Applications Developer',
  location: 'Texas, USA',
  intro: 'I build web and mobile apps with React and React Native.',
  site: 'https://sudir81.github.io',
  email: 'papinenisudheerkumar@gmail.com',
  github: 'https://github.com/sudir81',
  linkedin: 'https://www.linkedin.com/in/papinenisudheerkumar',
  resume: '/resume.pdf' as string | null,
  bio: [
    "I'm Sudheer, a freelance web and mobile developer based in Texas who turns ideas into fast, polished products.",
    "I build React front-ends, React Native apps for iOS and Android, and GraphQL-powered experiences, and I back them with reliable Playwright end-to-end tests.",
    "My GitHub is a living portfolio: Uber- and Spotify-style mobile clones, a kids' e-commerce shop, a car showroom and Apollo GraphQL experiments. I learn by building, and I bring that hands-on curiosity to every client project: clear communication, clean TypeScript and software that is a pleasure to use.",
  ],
  offer: [
    'End-to-end delivery: from idea and UI to a deployed app',
    'One React codebase approach for web and mobile',
    'Typed, tested and maintainable code you can hand over',
    'Clear, regular communication and honest estimates',
  ],
  services: [
    { title: 'Web Apps', body: 'Responsive, fast React and TypeScript applications, from landing pages to full e-commerce-style products.', icon: 'web' },
    { title: 'Mobile Apps', body: 'Cross-platform iOS and Android apps with React Native, sharing code with the web where it makes sense.', icon: 'mobile' },
    { title: 'UI Modernization', body: 'Migrating legacy front-ends (for example AngularJS to React) to a modern, maintainable stack.', icon: 'refresh' },
    { title: 'E2E Test Automation', body: 'Playwright test suites that catch regressions before your users do.', icon: 'check' },
  ],
};
