export interface Todo {
  id: string;
  titulo: string;
  descricao?: string;
  concluido: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
