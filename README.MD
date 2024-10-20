# Projeto de Processamento de Contas de Luz em PDF

Este projeto é responsável por ler dados de contas de luz em formato PDF, processar as informações e salvá-las em um banco de dados.

## Pré-requisitos

- É necessário ter o [Docker](https://www.docker.com/) instalado na sua máquina.

## Passos para rodar o projeto

1. Faça o download do repositório: [processar-conta-de-luz-pdf](https://github.com/alan-10/processar-conta-de-luz-pdf)
2. Acesse o diretório do projeto:
   ```bash
   cd processar-conta-de-luz-pdf
   
3. Execute o seguinte comando para construir a imagem e iniciar os serviços
   ```bash
   docker compose up --build
4. Acesse a URL `http://localhost:3000/`

Protinho já estará rodando a aplicação..


#### Dicas
 Dentro do aquivo api tem uma pasta chamada faturas, 
 é so colocar as faturas desejadas processar que serão processados, ao clicar no frontend no botão processar
 
 #### O que tem por vir?
 adicionar funcionalidade de :
 1. fazer upload da fatura pelo frontend
 2. ter a opção de fazer o download da fatura


