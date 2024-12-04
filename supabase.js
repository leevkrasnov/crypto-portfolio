import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jklnqnexeadsfzwzkdzx.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbG5xbmV4ZWFkc2Z6d3prZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTQ1MDksImV4cCI6MjA0ODg5MDUwOX0.7yj_DtyP80x1ePxrvTsmABOwahYso2aBV1VRcSm9q9o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
