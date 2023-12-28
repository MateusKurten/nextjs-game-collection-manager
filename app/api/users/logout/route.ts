import { NextResponse } from 'next/server';
import { signOut } from '@/auth'

export async function GET() {
  try {
    await signOut();
  } catch (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ mensagem: "Logout successful!" });
}