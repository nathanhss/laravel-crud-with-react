# laravel-crud-with-react

Este é um projeto de um CRUD simples para usuário com cadastro e números telefonico. O mesmo é feito utilizando Laravel no seu back-end, Next.JS no front-end e TailWind para estilização

# Executação o projeto

Para executar o projeto é necessário tem instalado em sua máquina o [PHP](https://www.php.net), [Composer](https://getcomposer.org), [MySQL](https://www.mysql.com) e [Node.JS](https://nodejs.org). Todos disponíves nos links indicados.

## Back-End
Após isso, acesse o diretório ``/backend`` e execute o comando ``php artisan migrate``.

>O comando `php artisan migrate` irá criar as tabelas na base de dados para o funcionamento correto do sistema

Após executar carregar as migrações do banco de dados, basta rodar o back-end com o comando `php artisan serve` no mesmo diretório.

## Front-End

Para executar o front-end acessamos o diretório `front-end/cdl-frontend` e fazemos o download das dependências, usando o comando ``npm install``. Após instaladas, basta executar o front com o ``npm run start`` ou ``npm run dev``

# Requisições

A seguir tem alguns exemplos de requisições

|Route           |METHOD                         |URL                                 |BODY                            | RESPONSE                    |   
|----------------|-------------------------------|------------------------------------|-----------------------------   |-----------------------------|
|INDEX           |GET                            |http://localhost:8000/api/users     |                                |`[User object]`              |
|SHOW            |GET                            |http://localhost:8000/api/users/{id}|                                |`User object`                |
|STORE           |POST                           |http://localhost:8000/api/users     |{name: String, document: String}|`User object`                |
|UPDATE          |PUT                            |http://localhost:8000/api/users/{id}|{name: String, document: String}|`message: String`            |
|DESTROY         |DELETE                         |http://localhost:8000/api/users     |                                |`message: String`            |

- abaixo o exemplo do `user object`

```json
    {
        users: {
            created_at: string, 
            document: string, 
            id: number, 
            name: string, 
            updated_at: string
        }
    }
```

O link a seguir tem um vídeo de apresentação do projeto com o mesmo funcionando. [CLICK AQUI]()