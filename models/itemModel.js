const supabase = require('../db/supabase');

const TABLE = 'items'; 

async function getAllItems(filter = {}) {
  const { status } = filter;
  let query = supabase.from(TABLE).select('*');

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query.order('tanggalMasuk', { ascending: false });

  if (error) throw error;
  return data;
}

async function getItemById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createItem(item) {
  const payload = {
    ...item,
    harga: Number(item.harga),
    tanggalMasuk: item.tanggalMasuk || new Date().toISOString(),
    tanggalSelesai: item.tanggalSelesai || null
  };

  const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
  if (error) throw error;
  return data;
}

async function updateItem(id, changes) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(changes)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteItem(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id).select().single();
  if (error) throw error;
  return data;
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
