'use client'

import { signOut } from '@/auth';
import { Button, Modal } from 'flowbite-react';
import { getGames } from '../lib/infra/games';
import { Game } from '../lib/domain/games';
import { Card } from 'flowbite-react';
import { useState } from 'react';



export default async function Collection() {

  const [openModal, setOpenModal] = useState(false);
  const [game, setGame] = useState<Game>({ id: "", title: "", console_id: "", user_id: "", image: ""});
  const [msg, setMsg] = useState("");

  const games = await getGames();

  const handleChange = (event : React.FormEvent<EventTarget>) => {
      let target = event.target as HTMLInputElement;
      const fieldName = target.name;
      const fieldValue = target.value;
      setGame((objetoAtual) => {
          return { ...objetoAtual, [fieldName]: fieldValue }
    })
  };

  const handleSave = async (event: React.FormEvent<EventTarget>) => {
    await fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    })
        .then((response) => response.json())
        .then((data) => setMsg(data.mensagem));
    setOpenModal(false);
  } 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-7xl w-full items-center justify-between font-mono text-sm">
        <div className="flex justify-between">
        <h1 className="text-lg content-center">Game Collection</h1>
        <div className='inline-flex'>
          <Button onClick={() => setOpenModal(true)} className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded">+ Game</Button>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Sign up to GCM</Modal.Header>
            <form>
              <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="title">
                            Title
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="title" name="title" onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="image">
                            Image
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="image" name="image" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="user_id">
                            User
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="user_id" name="user_id" required minLength={6} onChange={handleChange}/>
                        </div>
                      </div>
                    </div>
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="console_id">
                            Console
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="console_id" name="console_id" onChange={handleChange} required />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSave}>Add Game</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    </main>
  )
}