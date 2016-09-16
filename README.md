# Trabalho de Engenharia de Software [2016/2]

__Autores:__ Eduardo Stein Brito, Felipe Barbosa Tormes, Levindo Gabriel Taschetto Neto e Luis Gustavo Mollmann dos Santos.


O sistema a ser desenvolvido é uma aplicação web que permita conectar usuários que queiram trocar mangás de uma maneira fácil e eficaz.


## Lista de casos de uso

### Partindo de usuário comum
* Criar conta de usuário
* Entrar no sistema (log in)
* Criar anúncio
* Adicionar mangá à lista de desejos
* Ver histórico
* Pesquisar anúncio (com filtros)
* Realizar troca
* Mostrar interesse em um anúncio
* Ver status da troca
* Confirmar ou cancelar troca
* Submeter código de rastreio
* Avaliar troca


###Partindo do administrador
* Banir 
* Desbanir usuário


### Partindo do sistema
* Notificar usuário


## Diagrama de Casos de uso

![Diagrama de Casos de Uso](/recursos/diagrama_uc.jpg)


## Descrição textual dos diagramas de casos de uso

As sequências de eventos são dividas em típicas e alternativas.


### UC1
Identificação: UC1.
Caso de uso: Criação de conta de usuário.
Ator: Usuário.
Pré condições: Ter CPF com 11 dígitos, não possuir CPF cadastrado no banco de dados.
Pós condições: O sistema salva os dados do novo usuário no banco de dados.
#### Sequência típica de eventos:
##### Ator
1. Usuário entra no sistema.
2. Usuário clica no botão “Cadastrar novo usuário”.
4. Usuário preenche todas informações do formulário.
5. Usuário clica no botão “Realizar cadastro”. 

##### Sistema
3. Sistema abre o formulário de cadastro de novo usuário.
6. Sistema salva as informações preenchidas pelo usuário no banco de dados.


#### Sequência típica de eventos:
##### Ator
1. Usuário entra no sistema.
2. Usuário clica no botão “Cadastrar novo usuário”.
4. Usuário não preenche todas informações do formulário.
5. Usuário clica no botão “Realizar cadastro”. 

##### Sistema
3. Sistema abre o formulário de cadastro.
6. Sistema informa erro e avisa quais 

