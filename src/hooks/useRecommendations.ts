import { useMemo } from 'react';
import { getHigherStudiesRecommendations, getJobRecommendations, getSkillRecommendations, RecommendationContext } from '@/data/recommendations';

export function useRecommendations(ctx: RecommendationContext | null) {
  const higherStudies = useMemo(() => {
    if (!ctx) return [];
    return getHigherStudiesRecommendations(ctx);
  }, [ctx]);

  const jobs = useMemo(() => {
    if (!ctx) return [];
    return getJobRecommendations(ctx);
  }, [ctx]);

  const skills = useMemo(() => {
    if (!ctx) return [];
    return getSkillRecommendations(ctx);
  }, [ctx]);

  return { higherStudies, jobs, skills };
}
