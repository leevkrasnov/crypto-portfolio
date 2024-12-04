import { supabase } from '../supabase';

export async function fetchAssets() {
  const { data, error } = await supabase.from('assets').select('*');
  if (error) throw new Error(error.message);
  return data.map((asset) => ({
    ...asset,
    coin: JSON.parse(asset.coin),
  }));
}

export async function addAssetToDatabase(newAsset) {
  const { data, error } = await supabase.from('assets').insert([newAsset]);
  if (error) throw new Error(error.message);
  return data;
}

export async function removeAssetFromDatabase(assetId) {
  const { error } = await supabase.from('assets').delete().eq('id', assetId);
  if (error) throw new Error(error.message);
}
