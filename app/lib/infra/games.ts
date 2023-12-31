import { sql } from '@vercel/postgres';
import { Game } from '../../lib/domain/games';

export async function getGames() {
  try {
    const query = await sql<Game>`SELECT g.id, g.title, u.name as user, c.name as console, c.image as image FROM games g
    INNER JOIN consoles c ON g.console_id = c.id
    INNER JOIN users u ON g.user_id = u.id`;
    return query.rows;
  } catch (erro) {
    console.error('Erro na consulta de contatos:', erro);
    throw new Error('Erro na consulta de contatos.');
  }
}

export async function storeGame(game: Game) {
  try {
    const query = await sql<Game>`
        INSERT INTO games
        ("user_id", "console_id", "title")
        VALUES (${game.user_id}, ${game.console_id},${game.title})
        RETURNING id, user_id, console_id, title
    `;
    return query.rows[0]
  } catch (erro) {
    console.error('Error storing game:', erro);
    throw new Error('Error storing game.');
  }
}

export async function deleteGame(id: string) {
  try {
    const consulta = await sql<Game>`
      DELETE FROM games 
      WHERE id=${id}
    `;
  } catch (erro) {
    console.error('Error deleting game:', erro);
    throw new Error('Error deleting game.');
  }
}