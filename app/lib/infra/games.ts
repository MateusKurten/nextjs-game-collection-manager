'use server';

import { sql } from '@vercel/postgres';
import { Game } from '../../lib/domain/games';

export async function getGames() {
    try {    
        const query = await sql<Game>`SELECT g.id, g.title, g.image, u.name as user, c.name as console FROM games g
        INNER JOIN consoles c ON g.console_id = c.id
        INNER JOIN users u ON g.user_id = u.id`;
        return query.rows;
    } catch (erro) {
        console.error('Erro na consulta de contatos:', erro);
        throw new Error('Erro na consulta de contatos.');
    }
}