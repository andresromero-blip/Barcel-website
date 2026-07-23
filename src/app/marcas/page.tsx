import { redirect } from "next/navigation";
import { brands } from "@/data/brands";

// Ya no existe un "hub" /marcas: cada marca tiene su propia página
// (/marcas/[slug]). Si alguien llega a /marcas a secas (link viejo,
// escrito a mano), lo mandamos a la primera marca en vez de un 404.
export default function MarcasIndexRedirect() {
  redirect(`/marcas/${brands[0].slug}`);
}
