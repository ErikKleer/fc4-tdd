**Project (FORK)**
- **Name**: `fc4-tdd` — Desafio Técnico: Desenvolvimento Orientado a Testes (TDD)
- **Objetivo**: Implementar testes usando TDD para um sistema de reservas de propriedades. Os testes cobrem mappers, criação de usuários (guests) e propriedades via REST, regras de reembolso e serviço de cancelamento de reservas.

**Requisitos**
- **Node.js**: recomendado `>=16` (Node 18+ recomendado).
- **npm**: versão compatível com sua instalação do Node.

**Estrutura do projeto**
- `src/` — código TypeScript organizado em `application`, `domain`, `infrastructure`.
- `jest.config.js`, `tsconfig.json` — configuração de testes e TypeScript.

**Instalação**
1. Abra terminal no diretório root do projeto.
2. Instale dependências:

```
npm install
```

**Executando os testes**
- Executar toda a suíte de testes (Jest):

```
npm test
```

- Executar um arquivo de teste específico (exemplo):

```
npx jest "src/infrastructure/persistence/mappers/booking_mapper.test.ts"
```

- Executar testes em modo watch (desenvolvimento):

```
npm test -- --watchAll
```

Observações:
- Caso encontre erro relacionado ao ambiente TypeScript, verifique `tsconfig.json` e `jest.config.js`.

**Testes importantes / áreas cobertas**
- Mappers: arquivos em `src/infrastructure/persistence/mappers/` com testes correspondentes.
- Criação via REST: controllers e testes e2e em `src/infrastructure/web/`.
- Regras de reembolso: lógica em `src/domain/cancelation/` e testes de fábrica/estratégias.
- Serviço de cancelamento: `src/application/services/` contendo lógica de cancelamento e testes unitários.
