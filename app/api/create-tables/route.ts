import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
    try {
        let hashedPassword = await bcrypt.hash("user1password", 10);
        let result = await sql`
            INSERT INTO usuarios (name, email, password)
            VALUES ('user1', 'user1@gmail.com', ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
        hashedPassword = await bcrypt.hash("user2password", 10);
        result = await sql`
            INSERT INTO usuarios (name, email, password)
            VALUES ('user2', 'user2@gmail.com', ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}