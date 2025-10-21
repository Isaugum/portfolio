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

  const order = ['frontend', 'backend', 'tools']; // or 'tools and others'

  const groupedData = data?.reduce((acc, skill) => {
    const { category, ...rest } = skill;
    if (!acc[category]) acc[category] = [];
    acc[category].push(rest);
    return acc;
  }, {});

  const orderedGroupedData = Object.fromEntries(
    order.filter(key => groupedData[key]).map(key => [key, groupedData[key]])
  );

  return { data: orderedGroupedData, error };
};

const getHeader = async () => {
  const { data, error } = await supabase
    .from('nav_elements')
    .select()
    .order('order', { ascending: true });

  return { data, error };
};

const getProjectsData = async () => {
  const { data, error } = await supabase.from('projects').select();

  return { data, error };
};

export { getData, getHeader, getPageData, getProjectsData, getSkills };
