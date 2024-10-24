# 🖥️ **Frontend - Aplicação de Controle de Comissões de uma Papelaria**

## 1️⃣ **Requisitos**
- **Node.js**: `v20.16.0`

## 2️⃣ **Rodando o Frontend em Modo de Desenvolvimento**
1. 📂 **Clonar o repositório.**
2. 💻 **Acessar o diretório do repositório clonado via terminal.**
3. 📦 **Instalar os pacotes necessários** com o comando:
   ```bash
   npm i
   ```
4. 🚀 **Iniciar o frontend** com o comando:
   ```bash
   npm start
   ```

## 3️⃣ **Link backend**
```
https://github.com/mdiori/papelaria-back
```

---

## 🔄 **Implementações Futuras**

- ⚙️ **Implementar TypeScript.**
- 🧩 **Melhorar a componentização dos elementos.**
- 🛡️ **Adicionar validação com a biblioteca Zod.**
- 🔐 **Implementar autenticação com sistema de login.**
- 📋 **Desenvolver páginas de cadastro** para produtos, clientes e empregados.

---

# 📋 **Requisitos do Projeto**

Abaixo estão listados os requisitos funcionais e não funcionais para garantir que o sistema atenda às necessidades do cliente, mantendo qualidade e acessibilidade.

### 🛠️ **Requisitos Funcionais**:
1. **Cadastro de Produtos, Clientes e Vendedores**:
   - 📋 Cadastro via Django Admin.
   - 📦 Produtos devem ter código, descrição, valor unitário e percentual de comissão (0% a 10%).
   - 👥 Clientes e vendedores devem ter nome, e-mail e telefone.

2. **Comissões Configuráveis**:
   - ⚙️ Configurar limites de comissão para dias da semana no Django Admin.

3. **Cálculo de Comissões**:
   - 💰 Cálculo com base no percentual de comissão por produto e quantidade vendida.
   - 🚫 Aplicação de limites de comissão para dias configuráveis.

4. **Registro de Vendas**:
   - 🧾 Registrar vendas com número da nota fiscal, data/hora, cliente, vendedor, e lista de produtos.

5. **Gestão de Vendas**:
   - 📊 Interface para listar, criar, editar e excluir vendas, exibindo data/hora, cliente, vendedor e valor total.

6. **Gestão de Comissões**:
   - 📅 Listagem de vendedores com o total de comissões a serem pagas com base nas vendas de um período.

7. **API REST**:
   - 🌐 Possibilitar CRUD (criação, recuperação, atualização, exclusão) de produtos, clientes, vendedores e vendas.
   - 🔄 Consultar total de comissões dos vendedores por período.

8. **Protótipos**:
   - 🖼️ A interface deve seguir os protótipos criados pela equipe de UX:
     - [Protótipo Navegável](https://www.figma.com/proto/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?page-id=69%3A5896&node-id=830%3A2&viewport=1335%2C779%2C0.5&scaling=min-zoom&starting-point-node-id=830%3A124)
     - [Protótipo Aberto](https://www.figma.com/file/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?node-id=69%3A5896)

---

### 🚀 **Requisitos Não Funcionais**:
1. **Plataforma de Backend**:
   - 🖥️ Uso do **Django** como framework principal.
   - 🗃️ Preferência pelo banco de dados **PostgreSQL**.

2. **Padrões de API**:
   - 🌐 API Restful utilizando corretamente os verbos HTTP.

3. **Repositório Git**:
   - 📂 Código disponível em repositório Git com README contendo instruções claras.

4. **Testes Unitários**:
   - 🧪 O projeto deve conter testes unitários para validar o funcionamento.

5. **Frontend**:
   - 💻 Desenvolver o frontend com **ReactJS** e **JavaScript**.
   - 🔗 Comunicação do frontend com a API para obtenção e envio de dados.

---

# 📋 **Contextualização**

1. O cliente em questão é uma papelaria fictícia que deseja manter um registro de suas vendas e calcular as comissões de seus vendedores com base nas transações realizadas em um determinado período, levando em consideração os percentuais de comissão vinculados aos produtos comercializados.
   
2. Cada produto deve conter as seguintes informações: código, descrição, valor unitário e o percentual de comissão, que pode variar de 0 a 10%.
   
3. As vendas devem registrar o número da nota fiscal, data e hora da transação, o cliente, o vendedor, além de incluir uma lista com um ou mais produtos vendidos e suas respectivas quantidades.

4. Tanto clientes quanto vendedores precisam ter nome, e-mail e telefone registrados.

5. O cálculo da comissão é baseado no percentual cadastrado para o produto e aplicado ao valor total das vendas desse item (quantidade * valor unitário).

6. Em certos dias da semana, os percentuais de comissão têm limites mínimos e máximos. Esses valores podem variar, por isso devem ser configuráveis.  
   - Exemplo: Nas segundas-feiras, o percentual mínimo é 3% e o máximo é 5%. Se um produto tiver uma comissão de 10%, a comissão será limitada a 5% em uma venda nesse dia. Já se o percentual for inferior a 3%, como 2%, será ajustado para 3%.

7. O total da comissão em uma venda será a soma das comissões individuais de cada item vendido.

---
