import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrapper localizzati di Link, redirect, usePathname, useRouter e getPathname:
// generano automaticamente l'URL giusto per la lingua attiva (con prefisso /en
// e slug tradotto dove previsto). Da usare al posto di next/link e next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
