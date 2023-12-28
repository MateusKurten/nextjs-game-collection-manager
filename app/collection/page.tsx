'use client'

import { Button, Modal } from 'flowbite-react';
import { useFormState } from 'react-dom';
import { Game } from '../lib/domain/games';
import { User } from '../lib/domain/users';
import { Console } from '../lib/domain/consoles';
import GameCard from '../lib/ui/game-card';
import { Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { logout } from '../lib//infra/users';


export default function Collection() {

  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, formAction] = useFormState(logout, undefined);
  const [game, setGame] = useState<Game>({ id: "", title: "", console_id: "", user_id: "" });
  const [games, setGames] = useState<Game[]>([]);
  const [originalGames, setOriginalGames] = useState<Game[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [filter, setFilter] = useState<Game>({ id: "", title: "", console: "", user: "", image: "" });

  useEffect(() => {
    loadGames();
    loadUsers();
    loadConsoles();
  }, []);

  const loadGames = async () => {
    const response = await fetch('/api/games');
    const data = await response.json();
    setGames(data.games);
    setOriginalGames(data.games);
  }

  const loadUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data.users);
  }

  const loadConsoles = async () => {
    const response = await fetch('/api/consoles');
    const data = await response.json();
    setConsoles(data.consoles);
  }

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const fieldValue = target.value;
    setGame((objetoAtual) => {
      return { ...objetoAtual, [fieldName]: fieldValue }
    })
  };

  const applyFilter = (filter: Game) => {
    if (filter.console || filter.title || filter.user) {
      const filteredGames = originalGames.filter(game => {
        const filterConsole = filter.console && game.console && game.console.toLowerCase().includes(filter.console.toLowerCase());
        const filterUser = filter.user && game.user && game.user.toLowerCase().includes(filter.user.toLowerCase());
        const filterTitle = filter.title && game.title && game.title.toLowerCase().includes(filter.title.toLowerCase());

        return filterConsole || filterUser || filterTitle;
      });

      setGames(filteredGames);
    } else {
      loadGames();
    }
  }
  
  useEffect(() => {
    applyFilter(filter);
  }, [filter]);

  const handleFilter = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const fieldValue = target.value;
    setFilter((objetoAtual) => {
      return { ...objetoAtual, [fieldName]: fieldValue }
    });
  };

  const handleSave = async (event: React.FormEvent<EventTarget>) => {
    setOpenModal(false);
    await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then((response) => response.json());
    loadGames();
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'id': id }),
    }).then(response => response.json());
    loadGames();
  }

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div className="z-10 max-w-8xl items-center font-mono text-sm">
        <div className="flex justify-between">
          <h1 className="text-lg content-center">Game Collection</h1>
          <div className='inline-flex'>
            <Button onClick={() => setOpenModal(true)} className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded">+ Game</Button>
            <form action={formAction}>
              <Button type="submit" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Logout</Button>
            </form>
          </div>
        </div>
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <input name="title" onChange={handleFilter} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Filter by Title" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <input name="user" onChange={handleFilter} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Filter by User" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <input name="console" onChange={handleFilter} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Filter by Console" />
            </div>
          </div>
        </form>
        <div className="justify-items-center w-full grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games &&
            games.map(game =>
              <GameCard key={game.id} game={game} onDelete={handleDelete} />
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
              <div className="mt-4">
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="user_id">
                  User
                </label>
                <div className="relative">
                  <Select id="user_id" name="user_id" onChange={handleChange} required>
                    <option>Select User</option>
                    {users &&
                      users.map(user =>
                        <option key={user.id} value={user.id}>{user.name}</option>
                      )}
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="console_id">
                Console
              </label>
              <Select id="console_id" name="console_id" onChange={handleChange} required>
              <option>Select Console</option>
                {consoles &&
                  consoles.map(console =>
                    <option key={console.id} value={console.id}>{console.name}</option>
                  )}
              </Select>
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