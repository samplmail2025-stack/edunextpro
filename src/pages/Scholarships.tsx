import { useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { SCHOLARSHIPS, Scholarship } from '@/data/scholarships';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Search, ExternalLink, Bookmark, GraduationCap, IndianRupee, Calendar, Filter, Award, Heart, Users, Trophy, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import scholarshipsHeroImg from '@/assets/scholarships-hero.jpg';

const TYPES = ['All', 'Government of TN', 'Central Government', 'Private'] as const;
const CATEGORIES = ['All', 'Merit', 'Income', 'Community', 'Sports', 'Disability'] as const;

const categoryConfig: Record<string, { icon: React.ElementType; gradient: string; badge: string }> = {
  Merit: { icon: Award, gradient: 'from-amber-500 to-orange-500', badge: 'bg-amber-100 text-amber-700' },
  Income: { icon: Heart, gradient: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-100 text-emerald-700' },
  Community: { icon: Users, gradient: 'from-violet-500 to-purple-500', badge: 'bg-violet-100 text-violet-700' },
  Sports: { icon: Trophy, gradient: 'from-blue-500 to-cyan-500', badge: 'bg-blue-100 text-blue-700' },
  Disability: { icon: Accessibility, gradient: 'from-rose-500 to-pink-500', badge: 'bg-rose-100 text-rose-700' },
};

function ScholarshipCard({ scholarship, onSave, isSaved }: { scholarship: Scholarship; onSave?: () => void; isSaved?: boolean }) {
  const config = categoryConfig[scholarship.category] || categoryConfig.Merit;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
    >
      <div className={`bg-gradient-to-r ${config.gradient} p-4 relative overflow-hidden`}>
        <div className="absolute top-2 right-2 opacity-10">
          <Icon className="w-16 h-16 text-white" />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm leading-tight">{scholarship.name}</h3>
              <p className="text-white/80 text-xs mt-0.5">{scholarship.provider}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white flex-shrink-0">
              {scholarship.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">{scholarship.amount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{scholarship.deadline}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{scholarship.description}</p>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Eligibility</p>
          <p className="text-xs text-foreground bg-secondary rounded-lg px-2.5 py-1.5">{scholarship.eligibility}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {scholarship.studentType.map((t) => (
            <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{t}</span>
          ))}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryConfig[scholarship.category]?.badge || ''}`}>
            {scholarship.type}
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className={`w-full rounded-xl text-xs bg-gradient-to-r ${config.gradient} border-0 text-white gap-1`}>
              <ExternalLink className="w-3 h-3" /> Apply Now
            </Button>
          </a>
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className={`rounded-xl px-3 ${isSaved ? 'text-amber-500 border-amber-500' : ''}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { saveItem, isItemSaved } = useBookmarks();

  const filtered = SCHOLARSHIPS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === 'All' || s.type === activeType;
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <PageWrapper>
      <AppHeader title="Scholarships" subtitle={`${filtered.length} scholarships found`} showBack />

      <div className="px-4 py-4 space-y-4 pb-24">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                activeType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">No scholarships found</p>
            </div>
          ) : (
            filtered.map((s, i) => (
              <motion.div
                key={s.id}
                custom={i % 10}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <ScholarshipCard
                  scholarship={s}
                  onSave={() => saveItem('course', s as unknown as Record<string, unknown>)}
                  isSaved={isItemSaved(s.id)}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
