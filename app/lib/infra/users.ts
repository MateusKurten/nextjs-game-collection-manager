'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import type { User } from '../domain/users';
import bcrypt from 'bcrypt';

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
        const usuario = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return usuario.rows[0];
    } catch (erro) {
        console.error('Erro na consulta de usuario:', erro);
        throw new Error('Erro na consulta de usuario.');
    }
}

export async function getUsuarios(): Promise<Array<any>> {
    try {
        const usuarios = await sql`SELECT * FROM users`;
        return usuarios.rows;
    } catch (erro) {
        console.error('Erro na consulta de usuario:', erro);
        throw new Error('Erro na consulta de usuario.');
    }
}

export async function storeUser(user: User) {
    try {
        const hashedPassword = bcrypt.hash(user.password, 10);
        const query = await sql<User>`
            INSERT INTO users 
            ("name", "email", "password")
            VALUES (${user.name}, ${user.email},${await hashedPassword})
            RETURNING id, name, email, password
        `;
        return query.rows[0]
    } catch (erro) {
        console.error('Erro na consulta de usuario:', erro);
        throw new Error('Erro na consulta de usuario.');
    }
}