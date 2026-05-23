import { supabase } from "./supabase";

export async function getEstoque() {

  const { data, error } =
    await supabase
      .from("estoque")
      .select("*");

  if (error) {

    console.log(error);

    return [];

  }

  return data;

}

export async function atualizarEstoque(
  tipo: string,
  quantidade: number
) {

  const { error } =
    await supabase
      .from("estoque")
      .update({
        quantidade,
      })
      .eq("tipo", tipo);

  if (error) {

    console.log(error);

  }

}