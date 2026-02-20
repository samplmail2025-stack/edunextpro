export interface College {
  id: string;
  name: string;
  district: string;
  state: string;
  naacGrade: string;
  type: 'Government' | 'Aided' | 'Private' | 'Deemed' | 'Central';
  courses: string[];
  address: string;
  phone: string;
  website: string;
  mapLink: string;
  established: number;
}

export const TN_COLLEGES: College[] = [
  { id: 'iit-madras', name: 'IIT Madras', district: 'Chennai', state: 'Tamil Nadu', naacGrade: 'A++', type: 'Central', courses: ['B.Tech', 'M.Tech', 'Ph.D'], address: 'IIT P.O., Chennai – 600036', phone: '044-2257-8000', website: 'https://www.iitm.ac.in', mapLink: 'https://goo.gl/maps/iitm', established: 1959 },
  { id: 'anna-univ', name: 'Anna University', district: 'Chennai', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Government', courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'Ph.D'], address: 'Sardar Patel Rd, Guindy, Chennai – 600025', phone: '044-2235-8666', website: 'https://www.annauniv.edu', mapLink: 'https://goo.gl/maps/annauniv', established: 1978 },
  { id: 'psg-coim', name: 'PSG College of Technology', district: 'Coimbatore', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Aided', courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA'], address: 'Peelamedu, Coimbatore – 641004', phone: '0422-434-4000', website: 'https://www.psgtech.edu', mapLink: 'https://goo.gl/maps/psgtech', established: 1951 },
  { id: 'nit-trichy', name: 'NIT Tiruchirappalli', district: 'Tiruchirappalli', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Central', courses: ['B.Tech', 'M.Tech', 'MBA', 'Ph.D'], address: 'Tanjore Main Road, National Highway, Tiruchirappalli – 620015', phone: '0431-250-3000', website: 'https://www.nitt.edu', mapLink: 'https://goo.gl/maps/nittrichy', established: 1964 },
  { id: 'loyola-chennai', name: 'Loyola College Chennai', district: 'Chennai', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Aided', courses: ['B.Sc', 'B.Com', 'BA', 'BCA', 'M.Sc', 'MA', 'M.Com'], address: 'Nungambakkam, Chennai – 600034', phone: '044-2817-7100', website: 'https://www.loyolacollege.edu', mapLink: 'https://goo.gl/maps/loyolachennai', established: 1925 },
  { id: 'madras-univ', name: 'University of Madras', district: 'Chennai', state: 'Tamil Nadu', naacGrade: 'A', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc', 'Ph.D'], address: 'Chepauk, Chennai – 600005', phone: '044-2536-8778', website: 'https://www.unom.ac.in', mapLink: 'https://goo.gl/maps/madrasuniv', established: 1857 },
  { id: 'bharathiar-univ', name: 'Bharathiar University', district: 'Coimbatore', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc', 'MBA', 'Ph.D'], address: 'Maruthamalai Road, Coimbatore – 641046', phone: '0422-242-2222', website: 'https://www.b-u.ac.in', mapLink: 'https://goo.gl/maps/bharathiar', established: 1982 },
  { id: 'alagappa-univ', name: 'Alagappa University', district: 'Sivaganga', state: 'Tamil Nadu', naacGrade: 'A+', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc', 'MBA', 'Ph.D'], address: 'Karaikudi – 630003', phone: '04565-225-301', website: 'https://www.alagappauniversity.ac.in', mapLink: 'https://goo.gl/maps/alagappa', established: 1985 },
  { id: 'srmist', name: 'SRM Institute of Science and Technology', district: 'Kancheepuram', state: 'Tamil Nadu', naacGrade: 'A++', type: 'Deemed', courses: ['B.Tech', 'M.Tech', 'BCA', 'MBA', 'MCA', 'Ph.D'], address: 'SRM Nagar, Kattankulathur – 603203', phone: '044-2745-2270', website: 'https://www.srmist.edu.in', mapLink: 'https://goo.gl/maps/srmist', established: 1985 },
  { id: 'vit', name: 'VIT University Vellore', district: 'Vellore', state: 'Tamil Nadu', naacGrade: 'A++', type: 'Deemed', courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'Ph.D'], address: 'Tiruvalam Road, Vellore – 632014', phone: '0416-220-2000', website: 'https://www.vit.ac.in', mapLink: 'https://goo.gl/maps/vit', established: 1984 },
  { id: 'sastra', name: 'SASTRA Deemed University', district: 'Thanjavur', state: 'Tamil Nadu', naacGrade: 'A', type: 'Deemed', courses: ['B.Tech', 'M.Tech', 'MBA', 'BCA', 'Ph.D'], address: 'Tirumalaisamudram, Thanjavur – 613401', phone: '04362-264-101', website: 'https://www.sastra.edu', mapLink: 'https://goo.gl/maps/sastra', established: 1984 },
  { id: 'gov-arts-salem', name: 'Government Arts College Salem', district: 'Salem', state: 'Tamil Nadu', naacGrade: 'B+', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc'], address: 'Yercaud Road, Salem – 636007', phone: '0427-233-3535', website: 'https://gacs.tn.gov.in', mapLink: 'https://goo.gl/maps/gacsalem', established: 1958 },
  { id: 'mdu', name: 'Madurai Kamaraj University', district: 'Madurai', state: 'Tamil Nadu', naacGrade: 'A', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc', 'MBA', 'Ph.D'], address: 'Palkalai Nagar, Madurai – 625021', phone: '0452-245-8471', website: 'https://www.mkuniversity.ac.in', mapLink: 'https://goo.gl/maps/mku', established: 1966 },
  { id: 'tnu', name: 'Tamil Nadu Open University', district: 'Chennai', state: 'Tamil Nadu', naacGrade: 'B', type: 'Government', courses: ['BA', 'B.Sc', 'B.Com', 'BCA', 'MBA', 'MCA'], address: 'Directorate, Chennai – 600015', phone: '044-2355-1080', website: 'https://www.tnou.ac.in', mapLink: 'https://goo.gl/maps/tnou', established: 2002 },
  { id: 'kongu-eng', name: 'Kongu Engineering College', district: 'Erode', state: 'Tamil Nadu', naacGrade: 'A', type: 'Private', courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA'], address: 'Perundurai, Erode – 638060', phone: '04294-226-585', website: 'https://www.kongu.edu', mapLink: 'https://goo.gl/maps/kongu', established: 1983 },
];

export function getCollegesByDistrict(district: string): College[] {
  return TN_COLLEGES.filter((c) => c.district === district);
}

export function searchColleges(query: string, district?: string, naacGrade?: string): College[] {
  return TN_COLLEGES.filter((c) => {
    const matchesQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.courses.some((cr) => cr.toLowerCase().includes(query.toLowerCase()));
    const matchesDistrict = !district || c.district === district;
    const matchesNaac = !naacGrade || c.naacGrade === naacGrade;
    return matchesQuery && matchesDistrict && matchesNaac;
  });
}
