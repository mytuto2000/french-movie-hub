import { Movie } from "@/types/movie";

export const initialMovies: Movie[] = [
  {
    id: "1",
    titre: "Le Fabuleux Destin d'Amélie Poulain",
    realisateur: "Jean-Pierre Jeunet",
    annee: 2001,
    genre: "Comédie romantique",
    description: "Amélie, jeune fille parisienne, décide de changer la vie des gens autour d'elle tout en cherchant l'amour.",
    affiche: "https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?w=400&h=600&fit=crop",
    note: 8.5
  },
  {
    id: "2",
    titre: "Intouchables",
    realisateur: "Olivier Nakache, Éric Toledano",
    annee: 2011,
    genre: "Comédie dramatique",
    description: "L'histoire vraie d'une amitié improbable entre un riche tétraplégique et son aide à domicile.",
    affiche: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    note: 8.6
  },
  {
    id: "3",
    titre: "La Haine",
    realisateur: "Mathieu Kassovitz",
    annee: 1995,
    genre: "Drame",
    description: "Vingt-quatre heures dans la vie de trois jeunes de banlieue après une émeute.",
    affiche: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    note: 8.1
  }
];
