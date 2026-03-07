import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { CollegeCard } from '@/components/cards/CollegeCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TN_DISTRICTS } from '@/data/districts';
import { searchColleges, College } from '@/data/colleges';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Search, GraduationCap, MapPin } from 'lucide-react';
import campusImg from '@/assets/campus-building.jpg';

const NAAC_GRADES = ['A++', 'A+', 'A', 'B+', 'B'];

export default function CollegeFinder() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('course') || '';
  const [query, setQuery] = useState(initialQuery);
  const [district, setDistrict] = useState('');
  const [naacGrade, setNaacGrade] = useState('');
  const { saveItem, isItemSaved } = useBookmarks();

  const colleges = searchColleges(query, district && district !== 'all' ? district : undefined, naacGrade && naacGrade !== 'all' ? naacGrade : undefined);

  return (
    <PageWrapper>
      {/* Hero header with campus image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusImg} alt="University campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/90" />
        </div>
        <div className="relative pt-10 pb-8 px-6 text-center">
          <GraduationCap className="w-10 h-10 text-white/90 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-white">College Finder</h1>
          <p className="text-white/70 text-sm mt-1 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" /> Tamil Nadu · {colleges.length} Colleges
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto -mt-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search college or course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-xl bg-card shadow-md border-border"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="rounded-xl text-sm">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={naacGrade} onValueChange={setNaacGrade}>
            <SelectTrigger className="rounded-xl text-sm">
              <SelectValue placeholder="NAAC Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {NAAC_GRADES.map((g) => <SelectItem key={g} value={g}>NAAC {g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{colleges.length} colleges found</span>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {colleges.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No colleges found</p>
              <p className="text-sm">Try changing search or filters</p>
            </div>
          ) : (
            colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                onSave={() => saveItem('college', college as unknown as Record<string, unknown>)}
                isSaved={isItemSaved(college.id)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}