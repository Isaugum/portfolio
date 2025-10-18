import supabase from "./supabase.client";

const getPageData = async (key: string) => {
    const { data, error } = await supabase
    .from('pages')
    .select()
    .eq('slug', key)
    .single();

    if(error) {
        console.error(error);
    }

    return { data, error };
}

const getData = async (table: string, scope: string) => {
    const { data, error } = await supabase
    .from(table)
    .select()
    .eq('scope', scope)
    .order('order', { ascending: true });

    if(error) {
        console.error(error);
    }

    return { data, error };
}

export {
    getPageData,
    getData
}