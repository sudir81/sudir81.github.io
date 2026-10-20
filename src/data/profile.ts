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
    "I'm Sudheer, a full-stack and front-end developer based in Texas with 15+ years of experience building enterprise-grade SaaS applications across finance and investments, payments, pharma and healthcare.",
    "My core stack is React, TypeScript, Next.js, Node.js and GraphQL. I design scalable SPAs and micro-frontends, build reusable component libraries and design systems, and care about accessible, responsive, high-performance interfaces. On the API side I work with Node.js/Express, GraphQL (including PostGraphile on PostgreSQL), REST, and some Java Spring Boot.",
    "I turn complex business workflows into intuitive, low-code style interfaces, migrate large JavaScript codebases to TypeScript, and back everything with automated tests (Playwright, Cypress, Jest, React Testing Library) and CI/CD on Azure or AWS. I work in Agile teams, mentor peers, use AI tools such as GitHub Copilot to move faster, and keep learning by building: my GitHub is full of React Native and React side projects.",
  ],
  facts: [
    { label: 'Experience', value: '15+ years' },
    { label: 'Domains', value: 'Finance, Payments, Pharma, Healthcare' },
    { label: 'Education', value: "Master's in Computer Applications (MCA), Osmania University, 2006" },
  ],
  offer: [
    'Scalable React, TypeScript and Next.js applications',
    'Micro-frontends, design systems and reusable component libraries',
    'GraphQL and REST API design with Node.js back ends',
    'Accessible (WCAG), responsive, performance-focused UIs',
    'Test automation and CI/CD you can hand over and maintain',
    'Clear communication, mentoring and honest estimates',
  ],
  services: [
    { title: 'Web Apps', body: 'Responsive, fast React and TypeScript applications, from landing pages to full e-commerce-style products.', icon: 'web' },
    { title: 'Mobile Apps', body: 'Cross-platform iOS and Android apps with React Native, sharing code with the web where it makes sense.', icon: 'mobile' },
    { title: 'UI Modernization', body: 'Migrating legacy front-ends (for example AngularJS to React) to a modern, maintainable stack.', icon: 'refresh' },
    { title: 'E2E Test Automation', body: 'Playwright test suites that catch regressions before your users do.', icon: 'check' },
  ],
};
