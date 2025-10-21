import supabase from './supabase.client';

const getPageData = async (key: string) => {
  const { data, error } = await supabase
    .from('pages')
    .select()
    .eq('slug', key)
    .single();

  return { data, error };
};

const getData = async (table: string, scope?: string) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq('scope', scope)
    .order('order', { ascending: true });

  return { data, error };
};

const getSkills = async () => {
  const { data, error } = await supabase.from('skills').select();

  const groupedData = data?.reduce((acc, skill) => {
    const { category, ...rest } = skill;
    if (!acc[category]) acc[category] = [];
    acc[category].push(rest);
    return acc;
  }, {});

  return { data: groupedData, error };
};

const getHeader = async () => {
  const { data, error } = await supabase
    .from('nav_elements')
    .select()
    .order('order', { ascending: true });

  return { data, error };
};

export { getData, getHeader, getPageData, getSkills };
