'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import type { User } from '../domain/users';

export async function login(prevState: string | undefined, formData: FormData,) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Invalid login.';
        }
        throw error;
    }
}

export async function getUsuarioPorEmail(email: string): Promise<User | undefined> {
    try {
        const usuario = await sql<User>`SELECT * FROM usuarios WHERE email=${email}`;
        return usuario.rows[0];
    } catch (erro) {
        console.error('Erro na consulta de usuario:', erro);
        throw new Error('Erro na consulta de usuario.');
    }
}

export async function getUsuarios(): Promise<Array<any>> {
    try {
        const usuarios = await sql`SELECT * FROM usuarios`;
        return usuarios.rows;
    } catch (erro) {
        console.error('Erro na consulta de usuario:', erro);
        throw new Error('Erro na consulta de usuario.');
    }
}