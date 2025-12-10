export interface Movie {
  id: string;
  titre: string;
  realisateur: string;
  annee: number;
  genre: string;
  description: string;
  affiche: string;
  note: number;
}

export type MovieFormData = Omit<Movie, 'id'>;
