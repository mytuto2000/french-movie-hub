import { Movie } from "@/types/movie";
import { Star, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
  index: number;
}

export const MovieCard = ({ movie, onEdit, onDelete, index }: MovieCardProps) => {
  return (
    <div 
      className="group card-cinema rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:glow-gold opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.affiche}
          alt={`Affiche de ${movie.titre}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-foreground">{movie.note}</span>
        </div>

        {/* Actions overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onEdit(movie)}
            className="bg-primary text-primary-foreground hover:bg-gold-light transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(movie.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {movie.genre}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight line-clamp-2">
          {movie.titre}
        </h3>
        <p className="text-sm text-muted-foreground">
          {movie.realisateur} • {movie.annee}
        </p>
        <p className="text-sm text-secondary-foreground line-clamp-2">
          {movie.description}
        </p>
      </div>
    </div>
  );
};
