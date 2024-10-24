# Frontend - Aplicação de controle de comissões de uma papelaria

## 1 - Requisitos
- Nodejs v20.16.0

## 2 - Rodar o frontend em modo de desenvolvimento

1. Clonar o repositório.
2. Acessar o folder do repositório clonado pelo terminal.
3. Instalar os pacotes com o comando:

```
npm i
```

4. Iniciar o frontend com o comando:

```
npm start
```

## 4 - Implementações Futuras

- Implementar TypeScript.
- Melhorar a componentização dos elementos.
- Adicionar validação utilizando a biblioteca Zod.
- Implementar autenticação de acesso com sistema de login.
- Desenvolver páginas para o cadastro de produtos, clientes e empregados.

---

# Requisitos do projeto

Os seguintes requisitos garantem que a solução atenda às necessidades funcionais e técnicas do cliente, além de manter um alto padrão de qualidade e acessibilidade.

### **Requisitos Funcionais**:
1. **Cadastro de Produtos, Clientes e Vendedores**:
   - Permitir o cadastro via Django Admin.
   - Produtos devem conter código, descrição, valor unitário e percentual de comissão (0% a 10%).
   - Clientes e vendedores devem ter nome, e-mail e telefone.

2. **Comissões Configuráveis**:
   - Possibilidade de configurar limites mínimos e máximos de comissão para determinados dias da semana via Django Admin.

3. **Cálculo de Comissões**:
   - Cálculo baseado no percentual de comissão configurado para cada produto e na quantidade vendida.
   - Aplicação de limites mínimos e máximos de comissão em dias configuráveis.

4. **Registro de Vendas**:
   - Registrar vendas contendo número da nota fiscal, data/hora, cliente, vendedor, lista de produtos vendidos e suas quantidades.

5. **Gestão de Vendas**:
   - Interface para listar, criar, editar e excluir vendas.
   - Exibição de data/hora, cliente, vendedor e valor total da venda.

6. **Gestão de Comissões**:
   - Interface para listar vendedores com o total de comissões a serem pagas com base nas vendas de um período.
   - Exibição do total de comissões por vendedor e total geral.

7. **API Rest**:
   - Possibilitar CRUD (criação, recuperação, atualização, exclusão) de produtos, clientes, vendedores e vendas.
   - Permitir consulta do total de comissões de vendedores por período.

8. **Protótipos**:
   - A interface deve seguir os protótipos criados pela equipe de UX.
     - [Protótipo Navegável](https://www.figma.com/proto/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?page-id=69%3A5896&node-id=830%3A2&viewport=1335%2C779%2C0.5&scaling=min-zoom&starting-point-node-id=830%3A124)
     - [Protótipo Aberto](https://www.figma.com/file/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?node-id=69%3A5896)

### **Requisitos Não Funcionais**:
1. **Plataforma de Backend**:
   - Utilização do Django como framework principal.
   - Preferência pelo banco de dados PostgreSQL.

2. **Padrões de API**:
   - API Restful com uso correto dos verbos HTTP para operações de criação, exclusão, etc.

3. **Projeto Disponível em Repositório Git**:
   - O código deve ser acessível via repositório Git, com README detalhado contendo instruções de execução.

4. **Testes Unitários**:
   - O projeto deve conter testes unitários para garantir a funcionalidade do sistema.

5. **Frontend**:
   - Utilizar Javascript e ReactJs para desenvolver o frontend.
   - A aplicação frontend deve se comunicar com a API desenvolvida para obter e gravar dados.
