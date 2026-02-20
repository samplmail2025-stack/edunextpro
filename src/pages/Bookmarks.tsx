import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { useBookmarks } from '@/hooks/useBookmarks';
import { CollegeCard } from '@/components/cards/CollegeCard';
import { JobCard } from '@/components/cards/JobCard';
import { CourseCard } from '@/components/cards/CourseCard';
import { Bookmark, Loader2 } from 'lucide-react';
import { College } from '@/data/colleges';
import { Job } from '@/data/jobs';
import { Course } from '@/data/courses';

export default function Bookmarks() {
  const { savedItems, loading, removeItem } = useBookmarks();

  const colleges = savedItems.filter((i) => i.item_type === 'college');
  const jobs = savedItems.filter((i) => i.item_type === 'job');
  const courses = savedItems.filter((i) => i.item_type === 'course');

  if (loading) {
    return (
      <PageWrapper>
        <AppHeader title="Bookmarks" subtitle="Saved items" gradient />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <BottomNav />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <AppHeader title="Bookmarks" subtitle={`${savedItems.length} saved items`} gradient />
      <div className="p-4 space-y-5 max-w-lg mx-auto">
        {savedItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bookmark className="w-16 h-16 mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-lg">No saved items yet</p>
            <p className="text-sm">Save colleges and jobs from recommendations!</p>
          </div>
        ) : (
          <>
            {colleges.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  🏛️ Saved Colleges <span className="text-xs bg-edu-blue-light text-edu-blue px-2 py-0.5 rounded-full">{colleges.length}</span>
                </h3>
                <div className="space-y-3">
                  {colleges.map((item) => (
                    <CollegeCard key={item.id} college={item.item_data as unknown as College} onSave={() => removeItem(item.id)} isSaved />
                  ))}
                </div>
              </div>
            )}
            {jobs.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  💼 Saved Jobs <span className="text-xs bg-edu-green-light text-edu-green px-2 py-0.5 rounded-full">{jobs.length}</span>
                </h3>
                <div className="space-y-3">
                  {jobs.map((item) => (
                    <JobCard key={item.id} job={item.item_data as unknown as Job} onSave={() => removeItem(item.id)} isSaved />
                  ))}
                </div>
              </div>
            )}
            {courses.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  📚 Saved Courses <span className="text-xs bg-edu-purple-light text-edu-purple px-2 py-0.5 rounded-full">{courses.length}</span>
                </h3>
                <div className="space-y-3">
                  {courses.map((item) => (
                    <CourseCard key={item.id} course={item.item_data as unknown as Course} onSave={() => removeItem(item.id)} isSaved />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
