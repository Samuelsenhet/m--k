import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Intentionally not throwing so the app can run in environments without env set.
  // Consumers should handle missing config gracefully.
  // eslint-disable-next-line no-console
  console.warn('Supabase client not fully configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type PersonalityResultPayload = {
  user_id?: string | null;
  category: string;
  archetype?: string | null;
  ei_score: number;
  sn_score: number;
  tf_score: number;
  jp_score: number;
  at_score: number;
  analysis_text?: string | null;
};

export const upsertPersonalityScore = async (payload: PersonalityResultPayload) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { error: new Error('Supabase not configured') } as any;
  }

  const response = await supabase.from('personality_scores').upsert(payload).select();
  return response;
};

export const getCurrentUser = async () => {
  try {
    // v2 client: auth.getUser()
    // If not available in runtime, this will fail gracefully.
    // @ts-ignore
    if (supabase.auth && typeof supabase.auth.getUser === 'function') {
      // @ts-ignore
      const { data } = await supabase.auth.getUser();
      // @ts-ignore
      return data?.user ?? null;
    }
  } catch (e) {
    // ignore
  }
  return null;
};

export default { supabase, upsertPersonalityScore, getCurrentUser };
