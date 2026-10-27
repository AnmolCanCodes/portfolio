export type Education = {
  school: string;
  degree: string;
  cgpa: string;
  dates: string;
  location: string;
  coursework: string[];
};

export const education: Education = {
  school: "Mahatma Gandhi Kashi Vidyapith (MGKVP) – Jeevandeep Institute Campus",
  degree: "Bachelor of Computer Applications (BCA)",
  cgpa: "8.45 / 10.0",
  dates: "Aug 2024 - June  2026",
  location: "Uttar Pradesh, India",
  coursework: [
    "Mathematics & Business Integration",
    "Programming Fundamentals",
    "Data Structures and Algorithms",
    "Advanced Computing & Web",
    "Software Development & Systems",
  ],
};

// export type Certification = {
//   name: string;
//   issuer: string;
//   date: string;
//   note?: string;
//   link?: string;
// };

// export const certifications: Certification[] = [
//   {
//     name: "Nutanix Certified Associate (NCA) 6",
//     issuer: "Nutanix",
//     date: "Apr 2026",
//     note: "Valid to Apr 2029",
//     link: "https://www.credly.com/badges/09f2d8d3-38ac-4192-b7bd-0b92020319f4",
//   },
//   {
//     name: "Google Cloud Engineering Certificate",
//     issuer: "Google Cloud Career Launchpad",
//     date: "Mar 2026",
//     link: "https://drive.google.com/file/d/1bHj_n0tSEaw1hVLs3SuGa0B2s-3GQab_/view",
//   },
//   {
//     name: "Postman API Fundamentals Student Expert",
//     issuer: "Postman",
//     date: "Jan 2026",
//     link: "https://badges.parchment.com/public/assertions/2noe-vL3T52TjlcQyGrwKg",
//   },
// ];
