import { useState, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CollegeCard } from '@/components/cards/CollegeCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TN_DISTRICTS } from '@/data/districts';
import { searchColleges, TN_COLLEGES } from '@/data/colleges';
import { COURSES } from '@/data/courses';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useCompare } from '@/contexts/CompareContext';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};
import {
  Search, GraduationCap, MapPin, Building2, Filter, X,
  BookOpen, Award, ChevronDown, GitCompareArrows, ArrowRight
} from 'lucide-react';
import campusImg from '@/assets/campus-building.jpg';

const NAAC_GRADES = ['A++', 'A+', 'A', 'B+', 'B'];
const COLLEGE_TYPES = ['Government', 'Aided', 'Private', 'Deemed', 'Central'] as const;

// Build unique department list from courses data (UG level for common searches)
const DEPARTMENTS = (() => {
  const allCourseNames = COURSES.filter(c => c.level === 'UG').map(c => c.name);
  // Also add common short forms that colleges use
  const shortForms = ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'BCA', 'BA', 'B.Sc', 'B.Com', 'BBA', 'MBBS', 'BDS', 'LLB', 'B.Ed', 'Ph.D', 'B.Arch', 'B.Pharm'];
  return [...new Set([...shortForms, ...allCourseNames])].sort();
})();

// Map full course name to short college-listing names for better matching
function getCourseSearchTerms(courseName: string): string[] {
  const terms = [courseName.toLowerCase()];
  // Extract the base degree
  const base = courseName.split(' ')[0]; // e.g., "B.Sc", "B.Tech"
  if (base) terms.push(base.toLowerCase());
  return terms;
}

export default function CollegeFinder() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('course') || '';
  const [query, setQuery] = useState(initialQuery);
  const [district, setDistrict] = useState('');
  const [naacGrade, setNaacGrade] = useState('');
  const [collegeType, setCollegeType] = useState('');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { saveItem, isItemSaved } = useBookmarks();

  // Filter departments based on search query for dropdown
  const filteredDepts = useMemo(() => {
    if (!query) return DEPARTMENTS.slice(0, 20);
    const q = query.toLowerCase();
    return DEPARTMENTS.filter(d => d.toLowerCase().includes(q)).slice(0, 15);
  }, [query]);

  // Enhanced search: match college name, courses (short & full names)
  const colleges = useMemo(() => {
    const searchTerms = query ? getCourseSearchTerms(query) : [];
    return TN_COLLEGES.filter((c) => {
      // Query matching
      if (query) {
        const q = query.toLowerCase();
        const nameMatch = c.name.toLowerCase().includes(q);
        const courseMatch = c.courses.some(cr =>
          searchTerms.some(term => cr.toLowerCase().includes(term) || term.includes(cr.toLowerCase()))
        );
        if (!nameMatch && !courseMatch) return false;
      }
      // Filters
      if (district && district !== 'all' && c.district !== district) return false;
      if (naacGrade && naacGrade !== 'all' && c.naacGrade !== naacGrade) return false;
      if (collegeType && collegeType !== 'all' && c.type !== collegeType) return false;
      return true;
    });
  }, [query, district, naacGrade, collegeType]);

  const handleDeptSelect = (dept: string) => {
    setQuery(dept);
    setShowDeptDropdown(false);
  };

  const clearSearch = () => {
    setQuery('');
    searchRef.current?.focus();
  };

  // Stats
  const stats = useMemo(() => ({
    total: colleges.length,
    govt: colleges.filter(c => c.type === 'Government' || c.type === 'Central').length,
    private: colleges.filter(c => c.type === 'Private').length,
    aPlus: colleges.filter(c => c.naacGrade === 'A++' || c.naacGrade === 'A+').length,
  }), [colleges]);

  return (
    <PageWrapper>
      <AppHeader title="College Finder" subtitle={`Tamil Nadu · ${TN_COLLEGES.length} Colleges`} showBack gradient />
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusImg} alt="University campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
        </div>
        {/* Decorative icons */}
        <div className="absolute inset-0 opacity-[0.06]">
          <GraduationCap className="absolute top-6 right-8 w-14 h-14 text-white rotate-12" />
          <Building2 className="absolute bottom-6 left-10 w-12 h-12 text-white -rotate-6" />
          <BookOpen className="absolute top-10 left-1/3 w-8 h-8 text-white" />
        </div>
        <div className="relative pt-6 pb-8 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Find Your College</h2>
          <p className="text-white/70 text-sm mt-1.5 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Tamil Nadu · {TN_COLLEGES.length} Colleges
          </p>
        </div>
      </div>

      <div className="p-4 space-y-3 max-w-lg mx-auto -mt-5 relative z-10">
        {/* Search with department dropdown */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search department or college..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDeptDropdown(true);
              }}
              onFocus={() => setShowDeptDropdown(true)}
              className="w-full pl-10 pr-20 h-12 rounded-2xl bg-card shadow-lg border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query && (
                <button onClick={clearSearch} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 text-primary transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Department dropdown */}
          {showDeptDropdown && filteredDepts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto">
              <div className="p-2">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider px-3 py-1.5">
                  Departments & Courses
                </p>
                {filteredDepts.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleDeptSelect(dept)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2.5 ${
                      query === dept ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>{dept}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close dropdown */}
        {showDeptDropdown && (
          <div className="fixed inset-0 z-40" onClick={() => setShowDeptDropdown(false)} />
        )}

        {/* Filters row */}
        <div className="grid grid-cols-3 gap-2">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="rounded-xl text-xs h-10">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={naacGrade} onValueChange={setNaacGrade}>
            <SelectTrigger className="rounded-xl text-xs h-10">
              <SelectValue placeholder="NAAC" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {NAAC_GRADES.map((g) => <SelectItem key={g} value={g}>NAAC {g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={collegeType} onValueChange={setCollegeType}>
            <SelectTrigger className="rounded-xl text-xs h-10">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {COLLEGE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Active filters & stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{stats.total}</span>
              <span className="text-xs text-muted-foreground">colleges</span>
            </div>
          </div>
          <div className="flex gap-2">
            {stats.govt > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-edu-green-light text-edu-green font-medium">
                {stats.govt} Govt
              </span>
            )}
            {stats.aPlus > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-edu-blue-light text-edu-blue font-medium">
                {stats.aPlus} Top Rated
              </span>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {colleges.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 opacity-30" />
              </div>
              <p className="font-semibold text-foreground">No colleges found</p>
              <p className="text-sm mt-1">Try selecting a different department or clearing filters</p>
              {query && (
                <button
                  onClick={clearSearch}
                  className="mt-3 text-xs font-semibold text-primary hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            colleges.map((college, i) => (
              <motion.div
                key={college.id}
                custom={i % 10}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <CollegeCard
                  college={college}
                  highlightCourse={query}
                  onSave={() => saveItem('college', college as unknown as Record<string, unknown>)}
                  isSaved={isItemSaved(college.id)}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Floating Compare Bar */}
        <CompareFloatingBar />
      </div>
      <BottomNav />
    </PageWrapper>
  );
}

function CompareFloatingBar() {
  const { selected, clearAll } = useCompare();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-3 flex items-center gap-3"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
            <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center flex-shrink-0">
              <GitCompareArrows className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground">{selected.length} college{selected.length > 1 ? 's' : ''} selected</p>
              <p className="text-[10px] text-muted-foreground truncate">
                {selected.map(c => c.name.split(' ').slice(0, 2).join(' ')).join(' vs ')}
              </p>
            </div>
            <button onClick={clearAll} className="p-1.5 rounded-full hover:bg-muted">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate('/compare-colleges')}
              disabled={selected.length < 2}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                selected.length >= 2
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Compare <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
