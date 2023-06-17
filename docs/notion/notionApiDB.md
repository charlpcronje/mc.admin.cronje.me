# Notion API DB Responses

## 1. Users Database

1.1 Get all the users in the database

```yml
 - Url : https://api.notion.com/v1/databases/024faf40382d4875b11e49f13656ce36
   - Method : GET
   - Headers :
     - Content-Type : application/json
     - Authorization : Bearer secret_...
     - Notion-Version : 2021-05-13
```

Sample output for Users: [./data/users.json](./data/user.json)

## 2. Mall Database
 
```yml
  - Url: https://api.notion.com/v1/databases/2d88b63bfc46440cb8c899536e872bd8/query
    - Method : GET
    - Headers :
      - Content-Type : application/json
      - Accept : application/json
      - Notion-Version: 2022-06-28
      - Authorization: Bearer secret_...
```

Sample output for Users: [./data/mall.json](./data/mall.json)

## 3. Companies Database

```yml
  - Url: https://api.notion.com/v1/databases/9572ec4be6de4b54b2712e776976d0d5/query
    - Method: GET
    - Headers :
      - Content-Type: application/json
      - Notion-Version: 2022-06-28
      - Authorization: Bearer secret_...
```

Sample output for Companies: [./data/company.json](./data/company.json)


## 4. Chat Bots Database

```yml
  - Url: https://api.notion.com/v1/databases/80db8da2f07f4cf6960af80106d87bf6/query
    - Method: GET
    - Headers :
      - Content-Type: application/json
      - Notion-Version: 2022-06-28
      - Authorization: Bearer secret_...
```

Sample output for Companies: [./data/bot.json](./data/bot.json)

## 5. Cities Database

```yml
  - Url: https://api.notion.com/v1/databases/e3df14c488124a819176452d2ff4d151/query
    - Method: GET
    - Headers :
      - Content-Type: application/json
      - Notion-Version: 2022-06-28
      - Authorization: Bearer secret_...
```

Sample output for Companies: [./data/city.json](./data/city.json)

## 6. Cities Database

```yml
  - Url: https://api.notion.com/v1/databases/2d88b63bfc46440cb8c899536e872bd8/query
    - Method: GET
    - Headers :
      - Content-Type: application/json
      - Notion-Version: 2022-06-28
      - Authorization: Bearer secret_...
```

Sample output for Companies: [./data/region.json](./data/region.json)



