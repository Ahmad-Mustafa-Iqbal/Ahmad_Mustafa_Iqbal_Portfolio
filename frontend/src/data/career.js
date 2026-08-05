/* ================================================
   Data: Career Timeline
   Add career milestones, education, experience
   Listed in reverse chronological order (latest first)
   ================================================ */

const career = [
  {
    id: 5,
    type: 'experience',
    title: 'AI/ML Intern',
    organization: 'ITSimplera Solutions',
    location: 'Remote',
    period: 'Summer 2026 (2 Months)',
    description:
      'Worked as an AI/ML Intern, gaining hands-on industry experience in building and deploying machine learning solutions.',
    highlights: [
      '2 Months Internship',
      'AI & Machine Learning Projects',
      'Industry Experience',
    ],
  },
  {
    id: 4,
    type: 'education',
    title: 'BS Computer Science',
    organization: 'COMSATS University Islamabad',
    location: 'Islamabad Campus',
    period: 'Spring 2024 — Present',
    description:
      'Pursuing Bachelor\'s in Computer Science with a specialization in Artificial Intelligence and Machine Learning. Maintaining a strong CGPA after 5 semesters.',
    highlights: [
      'CGPA: 3.87 / 4.00',
      'Specialization: AI & Machine Learning',
      '5 Semesters Completed',
    ],
  },
  {
    id: 3,
    type: 'achievement',
    title: 'NTS NAT — COMSATS Entry Test',
    organization: 'National Testing Service (NTS)',
    location: 'Pakistan',
    period: '2023',
    description:
      'Secured an exceptional score in the COMSATS University entrance examination, earning admission into the BS Computer Science program.',
    highlights: [
      'Score: 94 / 100',
      'Top Percentile',
    ],
  },
  {
    id: 2,
    type: 'education',
    title: 'Intermediate (HSSC)',
    organization: 'FSc Pre-Medical (BISE Multan)',
    location: 'Multan, Pakistan',
    period: '2022 — 2023',
    description:
      'Completed FSc Pre-Medical with solid academic results under BISE Multan. Despite a medical sciences background, my passion for technology and problem-solving led me to pursue Computer Science.',
    highlights: [
      'Marks: 967 / 1100',
      'FSc Pre-Medical',
      'BISE Multan Board',
    ],
  },
  {
    id: 1,
    type: 'education',
    title: 'Matriculation (SSC)',
    organization: 'Science Group (BISE Multan)',
    location: 'Multan, Pakistan',
    period: '2020 — 2021',
    description:
      'Completed Matriculation under BISE Multan in Science group with outstanding academic performance, scoring near-perfect marks.',
    highlights: [
      'Marks: 1091 / 1100',
      'Grade: A+',
      'BISE Multan Board',
    ],
  },
];

export default career;
