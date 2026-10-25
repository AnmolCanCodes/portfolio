export type Education = {
  school: string;
  degree: string;
  cgpa: string;
  dates: string;
  location: string;
  coursework: string[];
};

export const education: Education = {
  school: "B.M.S. College of Engineering",
  degree: "B.E. Computer Science and Business Systems",
  cgpa: "9.27 / 10.0",
  dates: "Aug 2023 - May 2027",
  location: "Bengaluru, India",
  coursework: [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems",
    "Machine Learning",
    "Cryptography and Network Security",
    "Software Engineering",
  ],
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  note?: string;
  link?: string;
};

export const certifications: Certification[] = [
  {
    name: "Nutanix Certified Associate (NCA) 6",
    issuer: "Nutanix",
    date: "Apr 2026",
    note: "Valid to Apr 2029",
    link: "https://www.credly.com/badges/09f2d8d3-38ac-4192-b7bd-0b92020319f4",
  },
  {
    name: "Google Cloud Engineering Certificate",
    issuer: "Google Cloud Career Launchpad",
    date: "Mar 2026",
    link: "https://drive.google.com/file/d/1bHj_n0tSEaw1hVLs3SuGa0B2s-3GQab_/view",
  },
  {
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "Jan 2026",
    link: "https://badges.parchment.com/public/assertions/2noe-vL3T52TjlcQyGrwKg",
  },
];
