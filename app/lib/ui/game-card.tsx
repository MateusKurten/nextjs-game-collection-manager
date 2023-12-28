import { Card, Button } from 'flowbite-react';
import { Game } from '../domain/games'

interface GameCardProps {
  game: Game;
  onDelete: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(game.id);
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full" imgSrc={game.image} horizontal>
        <div>
          <div className="mb-4">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{game.title}</h5>
            <span className="text-gray-500">{game.console}</span>
          </div>
          <span>User: {game.user}</span>
        </div>
        <div>
          <Button color="failure" onClick={handleDeleteClick} className="text-white font-bold rounded">
            Delete Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameCard;