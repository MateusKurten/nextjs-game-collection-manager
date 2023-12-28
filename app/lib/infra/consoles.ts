import { sql } from '@vercel/postgres';

export async function getConsoles(): Promise<Array<any>> {
    try {
        const consoles = await sql`SELECT * FROM consoles`;
        return consoles.rows;
    } catch (erro) {
        console.error('Error consulting consoles:', erro);
        throw new Error('Error consulting consoles.');
    }
}
