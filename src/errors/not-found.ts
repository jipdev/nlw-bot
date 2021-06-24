export class NotFound {
  status = 404;
  message: string;

  constructor(message = 'Não foi encontrado nenhum conteúdo!') {
    this.message = message;
  }
}
