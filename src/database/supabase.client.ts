import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hlyuwmdvgpqwdggzzywr.supabase.co'
const supabaseKey = 'sb_secret_yLiJWuWk7AoYH4tLh-Gpkw_vkqrdSnM'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;