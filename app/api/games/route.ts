import { NextResponse } from 'next/server';
import { storeGame, getGames } from '../../lib/infra/games';

export async function POST(request: Request) {
    let game = await request.json();
    try {
        game = await storeGame(game);
      } catch(error) {
        return NextResponse.json({ error });
      }  
      return NextResponse.json({ mensagem: `${game.title} was added to the collection!` });
}


export async function GET(request: Request) {
  try {
      const games = await getGames();
      return NextResponse.json({ games });
    } catch(error) {
      return NextResponse.json({ error });
    }  
}