import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CollegeCard } from '@/components/cards/CollegeCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TN_DISTRICTS } from '@/data/districts';
import { searchColleges, College } from '@/data/colleges';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { Search, GraduationCap } from 'lucide-react';

const NAAC_GRADES = ['A++', 'A+', 'A', 'B+', 'B'];

export default function CollegeFinder() {
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  const initialQuery = searchParams.get('course') || '';
  const [query, setQuery] = useState(initialQuery);
  const [district, setDistrict] = useState(profile?.district || '');
  const [naacGrade, setNaacGrade] = useState('');
  const { saveItem, isItemSaved } = useBookmarks();

  const colleges = searchColleges(query, district || undefined, naacGrade || undefined);

  return (
    <PageWrapper>
      <AppHeader title="College Finder" subtitle="Tamil Nadu Colleges" gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search college or course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="rounded-xl text-sm">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Districts</SelectItem>
              {TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={naacGrade} onValueChange={setNaacGrade}>
            <SelectTrigger className="rounded-xl text-sm">
              <SelectValue placeholder="NAAC Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Grades</SelectItem>
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
