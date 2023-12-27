import { NextResponse } from 'next/server';
import { storeGame } from '../../lib/infra/games';

export async function POST(request: Request) {
    let game = await request.json();
    try {
        game = await storeGame(game);
      }catch(error) {
        return NextResponse.json({ error });
      }  
      return NextResponse.json({ mensagem: `${game.title} was added to the collection!` });
}