import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { authConfig } from './auth.config';
//-------------------------------------------------------
import type { User } from './app/lib/domain/users';
import { getUsuarioPorEmail } from "./app/lib/infra/users";
//-------------------------------------------------------

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const usuario = await getUsuarioPorEmail(email);
                    if (!usuario) return null;

                    const passwordOk = await bcrypt.compare(password, usuario.password);
                    if (passwordOk) return usuario;
                }

                console.log('Login inválido');
                return null;
            },
        }),
    ],
});