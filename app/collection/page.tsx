import { signOut } from '@/auth';
import { Button } from 'flowbite-react';
import { getGames } from '../lib/infra/games';
import { Card } from 'flowbite-react';


export default async function Collection() {

  const games = await getGames();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-7xl w-full items-center justify-between font-mono text-sm">
        <div className="flex justify-between">
        <h1 className="text-lg content-center">Game Collection</h1>
        <div className='inline-flex'>
          <Button className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded">+ Game</Button>
          <form action={async () => { 'use server'; await signOut(); }} method="POST">
            <Button type="submit" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Logout</Button>
          </form>
        </div>
        </div>
        <div className="container py-5 px-5 mx-0 min-w-full flex flex-col items-center">
          {games &&
          games.map(game => 
            <Card className="max-w-sm" imgSrc="/images/mario_kart_8.webp" horizontal>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {game.title}
              </h5>
              <ul>
                <li>User: {game.user}</li>
                <li>Console: {game.console}</li>
              </ul>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}