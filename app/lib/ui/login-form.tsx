'use client';

import { useFormState } from 'react-dom';
import { Button, Modal } from 'flowbite-react';
import { login } from '../infra/users';
import { useState } from 'react';
import { User } from '../domain/users';

export default function LoginForm() {

  const [errorMessage, formAction] = useFormState(login, undefined);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User>({ id: "", name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSave = async (event: React.FormEvent<EventTarget>) => {
    setOpenModal(false);
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => setMsg(data.mensagem));
  }

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const fieldValue = target.value;
    setUser((objetoAtual) => {
      return { ...objetoAtual, [fieldName]: fieldValue }
    });
  };

  return (
    <div>
      <span>{msg}</span>
      <form action={formAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-2xl">Login</h1>
          <div className="w-full">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email" type="email" name="email" required />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password" type="password" name="password" required minLength={6} />
              </div>
            </div>
          </div>
          <div className="container py-5 px-5 mx-0 min-w-full flex flex-col items-center">
            <Button.Group>
              <Button type="submit" className="m-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">Login</Button>
              <Button color="success" className="m-2 bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => setOpenModal(true)}>Sign Up</Button>
            </Button.Group>
          </div>
          <div className="flex h-5 items-end space-x-1">
            {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Sign up to GCM</Modal.Header>
        <form>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
                  Username
                </label>
                <div className="relative">
                  <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="name" name="name" onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email" type="email" name="email" onChange={handleChange} required />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password" type="password" name="password" required minLength={6} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSave}>Create User</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}