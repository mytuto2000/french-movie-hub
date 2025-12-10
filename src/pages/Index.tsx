import { useState, useMemo } from "react";
import { Movie, MovieFormData } from "@/types/movie";
import { initialMovies } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { MovieForm } from "@/components/MovieForm";
import { SearchBar } from "@/components/SearchBar";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus, Film } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    const query = searchQuery.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.titre.toLowerCase().includes(query) ||
        movie.realisateur.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
    );
  }, [movies, searchQuery]);

  const movieToDelete = useMemo(
    () => movies.find((m) => m.id === deleteId),
    [movies, deleteId]
  );

  const handleAddMovie = (data: MovieFormData) => {
    const newMovie: Movie = {
      ...data,
      id: Date.now().toString(),
      affiche: data.affiche || "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    };
    setMovies((prev) => [newMovie, ...prev]);
    setIsFormOpen(false);
    toast({
      title: "Film ajouté",
      description: `"${data.titre}" a été ajouté à votre collection.`,
    });
  };

  const handleEditMovie = (data: MovieFormData) => {
    if (!editingMovie) return;
    setMovies((prev) =>
      prev.map((m) =>
        m.id === editingMovie.id ? { ...data, id: m.id } : m
      )
    );
    setEditingMovie(null);
    toast({
      title: "Film modifié",
      description: `"${data.titre}" a été mis à jour.`,
    });
  };

  const handleDeleteMovie = () => {
    if (!deleteId) return;
    const movie = movies.find((m) => m.id === deleteId);
    setMovies((prev) => prev.filter((m) => m.id !== deleteId));
    setDeleteId(null);
    toast({
      title: "Film supprimé",
      description: `"${movie?.titre}" a été supprimé de votre collection.`,
    });
  };

  const openEditForm = (movie: Movie) => {
    setEditingMovie(movie);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gradient-gold">
                CinéThèque
              </h1>
            </div>
            
            <div className="flex-1 flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-gold text-primary-foreground hover:opacity-90 gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-2xl text-foreground mb-2">
              {searchQuery ? "Aucun résultat" : "Aucun film"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Essayez une autre recherche"
                : "Commencez par ajouter votre premier film"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-gold text-primary-foreground hover:opacity-90 gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un film
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {filteredMovies.length} film{filteredMovies.length > 1 ? "s" : ""} 
              {searchQuery && ` trouvé${filteredMovies.length > 1 ? "s" : ""}`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  onEdit={openEditForm}
                  onDelete={setDeleteId}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Forms and dialogs */}
      {isFormOpen && (
        <MovieForm
          onSubmit={handleAddMovie}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {editingMovie && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleEditMovie}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteMovie}
        movieTitle={movieToDelete?.titre || ""}
      />
    </div>
  );
};

export default Index;
