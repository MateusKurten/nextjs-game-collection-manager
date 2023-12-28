import { deleteGame } from "@/app/lib/infra/games";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      await deleteGame(params.id);
    } catch (error) {
      return Response.json({ error });
    }
    return Response.json({ mensagem: "Contato Excluído com sucesso" });
  }
  