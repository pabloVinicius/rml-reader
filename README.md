# Visualizador RML - Caixa Econômica Federal

Dia 12/01/2021 o Adobe Flash Player foi completamente descontinuado e bloqueado em todas as aplicações que o utilizam. Uma delas era o visualizador de arquivos RML da Caixa Econômica Federal, o RML Web 2.0,  uma aplicação muito utilizada por contadores que acessam a Conectividade Social. Essa aplicação resolve esse problema, lendo e interpretando o arquivo RML da Caixa para gerar um arquivo com uma formatação similar ao gerado pelo RML Web 2.0, disponível para visualização e impressão.

Sugestões, criticas e PRs são muito bem-vindos.

## Live
https://visualizadorrml.data.eti.br/

## Documentos suportados
- [x] FGTS - Extrato de Conta Vinculada para Fins Recisórios
- [x] FGTS - Extrato Analítico do Trabalhador
- [] FGTS - Relatório de Contas com Inconsistências Cadastrais

> Devido à implementação abstrata do parser, outros documentos podem funcionar, porém somente os que estão marcados foram testados

## Changelog
- 18/01/2021
  - Agora é possível gerar extratos recisórios que possuem mais de um funcionário por arquivo RML.
- 30/01/2021
  - Foi implementada uma nova versão do parser que se baseia no tipo dos elementos existentes no documento, isso garante um maior reuso das rotinas de parsing. Assim, é possível que mais documentos não antes testados funcionem, desde que eles não tenham nenhum tipo de dado novo.
  - O novo parser foi testado com os documentos que já eram suportados e agora também com o "FGTS - Extrato Analítico do Trabalhador", que também é suportado a partir de agora.
## Comandos comuns
### Instalar dependências
```bash
$ yarn
```
### Iniciar servidor de desenvolvimento ([http://localhost:3000](http://localhost:3000))
```bash
$ yarn start
```
### Buildar a aplicação
```bash
$ yarn build
```