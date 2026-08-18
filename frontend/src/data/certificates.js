/* ================================================
   Data: Certificates & Awards
   ================================================ */

/* ── Images ── */
import laptopAward1 from '../assets/laptop-award-1.png';
import laptopAward2 from '../assets/laptop-award-2.png';
import laptopAward4 from '../assets/laptop-award-4.png';
import speedCodingCeremony from '../assets/speed-coding-ceremony.jpeg';
import speedCodingCertCloseup from '../assets/speed-coding-certificate-closeup.jpeg';
import speedCodingCert from '../assets/speed-coding-certificate.jpeg';

/* ── Merit Certificates (4 Semesters) ── */
export const meritCertificates = [
  {
    id: 'mc1',
    semester: 'Semester 1',
    title: 'Merit Certificate — Semester 1',
    issuer: 'COMSATS University Islamabad',
    date: 'Spring 2024',
    verifyUrl:
      'https://www.linkedin.com/posts/ahmad-mustafa-iqbal_learning-growth-computerscience-activity-7298564004971458562-Hpe3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFID7xMBZQ8mfXjpF1N-eX9CcKnk-aAoZUY',
  },
  {
    id: 'mc2',
    semester: 'Semester 2',
    title: 'Merit Certificate — Semester 2',
    issuer: 'COMSATS University Islamabad',
    date: 'Fall 2024',
    verifyUrl:
      'https://www.linkedin.com/posts/ahmad-mustafa-iqbal_secondsemester-csstudent-dsa-activity-7321390627953287168-85wr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFID7xMBZQ8mfXjpF1N-eX9CcKnk-aAoZUY',
  },
  {
    id: 'mc3',
    semester: 'Semester 3',
    title: 'Merit Certificate — Semester 3',
    issuer: 'COMSATS University Islamabad',
    date: 'Spring 2025',
    verifyUrl:
      'https://www.linkedin.com/posts/ahmad-mustafa-iqbal_alhamdulillah-all-my-achievements-truly-activity-7376987280445583360-xMao?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFID7xMBZQ8mfXjpF1N-eX9CcKnk-aAoZUY',
  },
  {
    id: 'mc4',
    semester: 'Semester 4',
    title: 'Merit Certificate — Semester 4',
    issuer: 'COMSATS University Islamabad',
    date: 'Summer 2025',
    verifyUrl:
      'https://www.linkedin.com/posts/ahmad-mustafa-iqbal_alhamdulilah-activity-7471892700540313600-So04?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFID7xMBZQ8mfXjpF1N-eX9CcKnk-aAoZUY',
  },
];

/* ── Laptop Award ── */
export const laptopAward = {
  id: 'la1',
  title: 'Laptop Award for Academic Excellence',
  issuer: 'COMSATS University Islamabad',
  description:
    'Awarded a laptop by the university under the Prime Minister Youth Laptop Scheme 2025, in recognition of outstanding academic performance and maintaining a top CGPA.',
  date: '2025',
  images: [laptopAward1, laptopAward2, laptopAward4],
};

/* ── Speed Coding Award ── */
export const speedCodingAward = {
  id: 'sc1',
  title: 'Speed Coding — 1st Runner-Up',
  issuer: 'COMSICON 2025 · Google Developer Groups On Campus',
  description:
    'Secured 1st Runner-Up position in the Speed Coding competition at COMSICON 2025, held on 24 April 2025 at COMSATS University, Islamabad.',
  date: 'April 2025',
  images: [speedCodingCeremony, speedCodingCertCloseup, speedCodingCert],
};

/* ── Awards (combined export) ── */
export const awards = [laptopAward, speedCodingAward];

/* ── Certifications (Courses & Specializations) ── */
const certificates = [
  {
    id: 1,
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI, Coursera, Stanford CPD, UVM',
    date: 'Aug 2025',
    credentialUrl: 'https://coursera.org/share/ce74ec392592f96247d78a1db0c1d9e1',
    category: 'ai',
  },
  {
    id: 2,
    title: 'Mathematics for Machine Learning Specialization',
    issuer: 'Imperial College London',
    date: 'Jul 2025',
    credentialUrl: 'https://coursera.org/share/d7fa79d363dec8757b43ab85a705635dh',
    category: 'ai',
  },
  {
    id: 3,
    title: 'Probability & Statistics for Machine Learning & Data Science',
    issuer: 'DeepLearning.AI',
    date: 'Aug 2025',
    credentialUrl: 'https://coursera.org/share/04532e116c27ed2c25f743202253323a',
    category: 'ai',
  },
  {
    id: 4,
    title: 'Python for Everybody (Specialization)',
    issuer: 'Coursera',
    date: 'Jul 2025',
    credentialUrl: 'https://coursera.org/share/ee6a03a83b3be62f72db6d1ce319a1ba',
    category: 'dev',
  },
  {
    id: 5,
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Training Online',
    date: 'Jun 2025',
    credentialUrl: 'https://coursera.org/share/e3494d735aae00d73fa6cc45a1be5868',
    category: 'ai',
  },
  {
    id: 6,
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Jul 2025',
    credentialUrl: 'https://coursera.org/share/d15f0f29a324c0ea690b92e1e69f71e7',
    category: 'ai',
  },
  {
    id: 7,
    title: 'Understanding Artificial Intelligence',
    issuer: 'DataCamp',
    date: '',
    credentialUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/557a87b6030b28f164b5fa93e845b731e98ceba4',
    category: 'ai',
  },
  {
    id: 8,
    title: 'Introduction to Python for Developers',
    issuer: 'DataCamp',
    date: '',
    credentialUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/89f2a527f3331aa98693f26b33aac68ee106bf27',
    category: 'dev',
  },
  {
    id: 9,
    title: 'Intermediate Python for Developers',
    issuer: 'DataCamp',
    date: '',
    credentialUrl:
      'https://www.datacamp.com/completed/statement-of-accomplishment/course/fda20809890b2c8ece9a091c8969e229ab11916a',
    category: 'dev',
  },
];

export default certificates;
