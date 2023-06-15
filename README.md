

<h1 align=center>Sistema para controle de finanças pessoais</h1>


O sistema trata-se de uma aplicação para controle de finanças pessoais. 
Foi utilizado conhecimentos em React, integração com API, uso de componentes e etc.                   

As funcionalidades são:

- Cadastro do usuário 
- Login de usuário 
- Deslogar usuário 
- Cadastro de uma nova transação 
- Edição de uma transação 
- Exclusão de uma transação 
- Listagem de transações 
- Resumo das transações 



Clicando no botão **Cadastrar** é enviado os dados do formulário para a **API** fazendo com que o sistema registre um novo usuário, caso dê certo o cadastro de um novo usuário, redireciona o usuário para a tela de **sign-in (login)**, assim ele já poderá se logar no sistema.

---

### Login de usuário:

1. Na página de login de usuário, temos um botão chamado **Cadastre-se**, esse botão leva o usuário para a tela de cadastrar um novo usuário **(sign-up)**:
2. O formulário de login  valida se os campos estão realmente preenchidos, se estiverem preenchidos sera enviado uma requisição para a **API** para fazer o login desse usuário, as informações como **token** e **userId** são armazenadas no **localStorage** para que o usuário possa depois usar dentro da **área logada**.
3. Caso o login dê certo o usuário é redirecionado para a tela principal (**main**) onde ele verá a listagem de suas transações.
4. Caso o usuário esteja logado, é bloquear o acesso dele a página de login, sendo assim, somente quando o usuário estiver deslogado que poderá acessar a página **sign-in (login)**.

![](https://i.imgur.com/vvnluj6.png)


### Página principal:

Após o usuário fazer o login ele será redirecionado para a página principal, essa página só poderá ser acessada por usuários que estão logados na aplicação, caso contrário ao tentar acessar a página principal sem estar logado o usuário deverá ser redirecionado para a página de login (**sign-in**).

Nessa página ele verá todas as informações:

1. Header da aplicação com botões, logos e ícones.
2. Tabela com a listagem de transações.
3. Área de resumo, que traz as informações de entradas, saídas e saldos.
4. Botão para adicionar uma nova transação.
5. Botão para abrir área de filtros.

Veja na imagem abaixo:

![](https://i.imgur.com/SYm8uuY.png)

---



### Cadastro de uma nova transação:

Para cadastrar uma nova transação o usuário deverá clicar no botão `Adicionar Registro`, que ficará logo abaixo da área de `resumo`.

![](https://i.imgur.com/10q85lh.png)

Ao clicar no referido botão, um modal com a opção de adicionar informações de uma transação deve ser exibido:

![](https://i.imgur.com/qMegn2n.png)

1. Nesse modal todas as informações devem ser preenchidas, sendo dicionado uma `entrada` ou `saída` de dinheiro, por padrão o valor deve ser o de `saída`, caso o usuário queira adicionar um valor de entrada ele precisará clicar no botão **Entrada**.
2. O **select** de **Categoria** deverá ser preenchido com as informações de categorias que a **API** traz, ou seja, as categorias listadas dentro do **select** com base em um **GET** na rota de **categoria** da **API.**

\*Todos os campos são obrigatórios!

Após o usuário clicar no botão **confirmar**, uma nova transação deve ser inserida e a tabela de listagem deve ser atualizada.



### Editar uma transação:

Para editar uma transação o usuário deverá clicar no ícone do lápis, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/iFD6G3k.png)

Ao clicar no ícone de editar uma transação, o modal (que foi utilizado para adicionar uma nova transação) é aberto e as informações da transação "clicada", deverão ser preenchidas automaticamente, assim como a imagem abaixo:

![](https://i.imgur.com/UGQ9uda.png)

\*Novamente, todos os campos são obrigatórios!

Após validar os campos e o usuário clicar em confirmar, a transação é atualizada na `API`.

---



### Excluir uma transação:

Para excluir uma transação o usuário deverá clicar no ícone da lixeira, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/X6GB3kh.png)



  ![](https://i.imgur.com/Ohhk1lhm.png)

---

# Pessoa B

### Listagem de transações:

As transações registradas por meio dos endpoints da `api`, são listadas numa tabela que ficará ao centro da página, nessa tabela teremos 6 colunas, sendo:

1. **Data** da transação no formato `dd/mm/yyyy`
2. **Dia da semana**, nessa coluna são utilizados apenas os primeiros nomes dos dias da semana, ao invéz de Segunda-Feira, foi usado uo formato `Segunda`.
3. **Descrição**, nessa coluna foi listadas as descrições informadas no cadastro de transação.
4. **Categoria**, aqui é mostrado as categorias inseridas em cada uma das transações cadastradas.
5. **Valor**, nessa coluna exibe os valores de cada uma das transações. Existe uma regra importante nas cores e nos sinais, para valores de **entrada de dinheiro (credit)** exibimos o número positivo.
6. Na última coluna ficarão os botões de editar e excluir.

![](https://i.imgur.com/jie9f1T.png)

Cada linha da tabela representa uma transação. Portanto cada botão representa a ação para um registro.

---



















