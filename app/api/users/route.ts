import { storeUser, getUsers } from '../../lib/infra/users';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let user = await request.json();
  try {
    user = await storeUser(user);
  } catch(error) {
    return NextResponse.json({ error });
  }  
  return NextResponse.json({ mensagem: "Registration complete!" });
}

export async function GET(request: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch(error) {
    return NextResponse.json({ error });
  }   
}