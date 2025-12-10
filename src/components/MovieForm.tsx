import { useState, useEffect } from "react";
import { Movie, MovieFormData } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface MovieFormProps {
  movie?: Movie | null;
  onSubmit: (data: MovieFormData) => void;
  onCancel: () => void;
}

const genres = [
  "Action", "Comédie", "Comédie romantique", "Drame", "Comédie dramatique",
  "Horreur", "Science-fiction", "Thriller", "Animation", "Documentaire"
];

export const MovieForm = ({ movie, onSubmit, onCancel }: MovieFormProps) => {
  const [formData, setFormData] = useState<MovieFormData>({
    titre: "",
    realisateur: "",
    annee: new Date().getFullYear(),
    genre: "Drame",
    description: "",
    affiche: "",
    note: 7
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        titre: movie.titre,
        realisateur: movie.realisateur,
        annee: movie.annee,
        genre: movie.genre,
        description: movie.description,
        affiche: movie.affiche,
        note: movie.note
      });
    }
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof MovieFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg card-cinema rounded-2xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {movie ? "Modifier le film" : "Ajouter un film"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre" className="text-foreground">Titre</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => handleChange("titre", e.target.value)}
              placeholder="Le titre du film"
              required
              className="bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="realisateur" className="text-foreground">Réalisateur</Label>
              <Input
                id="realisateur"
                value={formData.realisateur}
                onChange={(e) => handleChange("realisateur", e.target.value)}
                placeholder="Nom du réalisateur"
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annee" className="text-foreground">Année</Label>
              <Input
                id="annee"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 5}
                value={formData.annee}
                onChange={(e) => handleChange("annee", parseInt(e.target.value))}
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-foreground">Genre</Label>
              <select
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note" className="text-foreground">Note (/10)</Label>
              <Input
                id="note"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.note}
                onChange={(e) => handleChange("note", parseFloat(e.target.value))}
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiche" className="text-foreground">URL de l'affiche</Label>
            <Input
              id="affiche"
              value={formData.affiche}
              onChange={(e) => handleChange("affiche", e.target.value)}
              placeholder="https://exemple.com/image.jpg"
              className="bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Synopsis du film..."
              rows={3}
              className="bg-secondary border-border focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-gold text-primary-foreground hover:opacity-90">
              {movie ? "Sauvegarder" : "Ajouter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
