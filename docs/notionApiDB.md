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

### Users Database Structure\*\*

```json
{
  "object": "database",
  "id": "024faf40-382d-4875-b11e-49f13656ce36",
  "cover": {
    "type": "file",
    "file": {
      "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9e1e5bab-b0cd-4cdb-9447-2708d272e3c5/_495ed342-b39e-455b-b3b5-4de8bce78774.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230609T135826Z&X-Amz-Expires=3600&X-Amz-Signature=1b2abcd6f161b9ed7a3981a82c790ebe6b751fcdbb123741dc6ff2036c312b54&X-Amz-SignedHeaders=host&x-id=GetObject",
      "expiry_time": "2023-06-09T14:58:26.245Z"
    }
  },
  "icon": {
    "type": "external",
    "external": {
      "url": "https://www.notion.so/icons/groups_lightgray.svg"
    }
  },
  "created_time": "2023-05-24T17:16:00.000Z",
  "created_by": {
    "object": "user",
    "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
  },
  "last_edited_by": {
    "object": "user",
    "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
  },
  "last_edited_time": "2023-06-08T21:28:00.000Z",
  "title": [
    {
      "type": "text",
      "text": {
        "content": "Users",
        "link": null
      },
      "annotations": {
        "bold": false,
        "italic": false,
        "strikethrough": false,
        "underline": false,
        "code": false,
        "color": "default"
      },
      "plain_text": "Users",
      "href": null
    }
  ],
  "description": [],
  "is_inline": false,
  "properties": {
    "Status": {
      "id": "EpiX",
      "name": "Status",
      "type": "checkbox",
      "checkbox": {}
    },
    "ID": {
      "id": "UNH%3D",
      "name": "ID",
      "type": "formula",
      "formula": {
        "expression": "id()"
      }
    },
    "Roles": {
      "id": "Xp%5B%60",
      "name": "Roles",
      "type": "multi_select",
      "multi_select": {
        "options": [
          {
            "id": "SNC`",
            "name": "Super Admin",
            "color": "brown"
          },
          {
            "id": "bfK{",
            "name": "Manager",
            "color": "pink"
          },
          {
            "id": "~yHc",
            "name": "Agent",
            "color": "purple"
          },
          {
            "id": "nllG",
            "name": "Client",
            "color": "yellow"
          },
          {
            "id": "_T>B",
            "name": "Admin",
            "color": "orange"
          },
          {
            "id": "dtN:",
            "name": "User",
            "color": "red"
          }
        ]
      }
    },
    "Password": {
      "id": "iV%5CC",
      "name": "Password",
      "type": "rich_text",
      "rich_text": {}
    },
    "Email Address": {
      "id": "mhLX",
      "name": "Email Address",
      "type": "email",
      "email": {}
    },
    "Avatar": {
      "id": "nLgl",
      "name": "Avatar",
      "type": "files",
      "files": {}
    },
    "Company": {
      "id": "%7DHLJ",
      "name": "Company",
      "type": "relation",
      "relation": {
        "database_id": "9572ec4b-e6de-4b54-b271-2e776976d0d5",
        "type": "dual_property",
        "dual_property": {
          "synced_property_name": "Users",
          "synced_property_id": "TUUy"
        }
      }
    },
    "Full Name": {
      "id": "title",
      "name": "Full Name",
      "type": "title",
      "title": {}
    }
  },
  "parent": {
    "type": "page_id",
    "page_id": "56c38e7f-a46e-4b4a-92ff-291be511e4c0"
  },
  "url": "https://www.notion.so/024faf40382d4875b11e49f13656ce36",
  "public_url": null,
  "archived": false
}
```

### Users Database Data

```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "67b36063-30c2-4861-b718-b031dc16e822",
      "created_time": "2023-05-24T17:16:00.000Z",
      "last_edited_time": "2023-06-08T20:32:00.000Z",
      "created_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "last_edited_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "024faf40-382d-4875-b11e-49f13656ce36"
      },
      "archived": false,
      "properties": {
        "Status": {
          "id": "EpiX",
          "type": "checkbox",
          "checkbox": true
        },
        "ID": {
          "id": "UNH%3D",
          "type": "formula",
          "formula": {
            "type": "string",
            "string": "67b3606330c24861b718b031dc16e822"
          }
        },
        "Roles": {
          "id": "Xp%5B%60",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "_T>B",
              "name": "Admin",
              "color": "orange"
            }
          ]
        },
        "Password": {
          "id": "iV%5CC",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "9983538",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "9983538",
              "href": null
            }
          ]
        },
        "Email Address": {
          "id": "mhLX",
          "type": "email",
          "email": "charl@cronje.me"
        },
        "Avatar": {
          "id": "nLgl",
          "type": "files",
          "files": [
            {
              "name": "283560782_133894659298074_196786874908296505_n.jpg",
              "type": "file",
              "file": {
                "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/81f9f570-3ef9-42b9-af42-e32084dc759e/283560782_133894659298074_196786874908296505_n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230609T152057Z&X-Amz-Expires=3600&X-Amz-Signature=4bf1ac7d5dd77e3ede93da9b6a99402735cfd11666976269ef618d9ee79977c9&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2023-06-09T16:20:57.496Z"
              }
            }
          ]
        },
        "Company": {
          "id": "%7DHLJ",
          "type": "relation",
          "relation": [
            {
              "id": "fa0a2357-f5ba-483a-8002-831c94df44a5"
            }
          ],
          "has_more": false
        },
        "Full Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Charl Cronje",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Charl Cronje",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Charl-Cronje-67b3606330c24861b718b031dc16e822",
      "public_url": null
    },
    {
      "object": "page",
      "id": "dc390b61-23c9-413e-88e9-8c6b81fe9035",
      "created_time": "2023-05-24T17:16:00.000Z",
      "last_edited_time": "2023-06-08T20:33:00.000Z",
      "created_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "last_edited_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "024faf40-382d-4875-b11e-49f13656ce36"
      },
      "archived": false,
      "properties": {
        "Status": {
          "id": "EpiX",
          "type": "checkbox",
          "checkbox": true
        },
        "ID": {
          "id": "UNH%3D",
          "type": "formula",
          "formula": {
            "type": "string",
            "string": "dc390b6123c9413e88e98c6b81fe9035"
          }
        },
        "Roles": {
          "id": "Xp%5B%60",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "bfK{",
              "name": "Manager",
              "color": "pink"
            }
          ]
        },
        "Password": {
          "id": "iV%5CC",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "0827749084",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "0827749084",
              "href": null
            }
          ]
        },
        "Email Address": {
          "id": "mhLX",
          "type": "email",
          "email": "anthony@fgx.co.za"
        },
        "Avatar": {
          "id": "nLgl",
          "type": "files",
          "files": [
            {
              "name": "anthony.png",
              "type": "file",
              "file": {
                "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3ac32647-e245-4b98-918c-2b2276dd523e/anthony.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230609T152057Z&X-Amz-Expires=3600&X-Amz-Signature=bcf3c7d0233c01cafc07905c548811ddcec597e6d33087a5fd77e79e6efd9422&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2023-06-09T16:20:57.496Z"
              }
            }
          ]
        },
        "Company": {
          "id": "%7DHLJ",
          "type": "relation",
          "relation": [
            {
              "id": "e0907b69-6906-47b4-8c14-7e9330f5701c"
            }
          ],
          "has_more": false
        },
        "Full Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Anthony Otte",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Anthony Otte",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Anthony-Otte-dc390b6123c9413e88e98c6b81fe9035",
      "public_url": null
    },
    {
      "object": "page",
      "id": "ea3dac4f-e677-4ca3-8695-5db428e55d7e",
      "created_time": "2023-05-25T14:41:00.000Z",
      "last_edited_time": "2023-06-08T20:33:00.000Z",
      "created_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "last_edited_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "024faf40-382d-4875-b11e-49f13656ce36"
      },
      "archived": false,
      "properties": {
        "Status": {
          "id": "EpiX",
          "type": "checkbox",
          "checkbox": true
        },
        "ID": {
          "id": "UNH%3D",
          "type": "formula",
          "formula": {
            "type": "string",
            "string": "ea3dac4fe6774ca386955db428e55d7e"
          }
        },
        "Roles": {
          "id": "Xp%5B%60",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "~yHc",
              "name": "Agent",
              "color": "purple"
            }
          ]
        },
        "Password": {
          "id": "iV%5CC",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "0",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "0",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": "827749084",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "827749084",
              "href": null
            }
          ]
        },
        "Email Address": {
          "id": "mhLX",
          "type": "email",
          "email": "marketing@fgx.co.za"
        },
        "Avatar": {
          "id": "nLgl",
          "type": "files",
          "files": [
            {
              "name": "chrome_tMkD80RZuN.png",
              "type": "file",
              "file": {
                "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/710467ba-86d2-41a7-88a0-36285a0db2ae/chrome_tMkD80RZuN.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230609T152057Z&X-Amz-Expires=3600&X-Amz-Signature=921b046470848d59a07aa71c407a42764db817d7b8a31071bd486fdf2ca57d41&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2023-06-09T16:20:57.496Z"
              }
            }
          ]
        },
        "Company": {
          "id": "%7DHLJ",
          "type": "relation",
          "relation": [
            {
              "id": "e0907b69-6906-47b4-8c14-7e9330f5701c"
            }
          ],
          "has_more": false
        },
        "Full Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Marketing",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Marketing",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Marketing-ea3dac4fe6774ca386955db428e55d7e",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page",
  "page": {}
}
```

### Filter Users Database

```yml
- URL: https://api.notion.com/v1/databases/024faf40382d4875b11e49f13656ce36/query
  - method: POST
  - Headers :
     - Content-Type : application/json
     - Authorization : Bearer secret_...
     - Notion-Version : 2021-05-13
  - Body : '{
            "filter": {
              "and": [{
                  "property": "Email Address",
                  "rich_text": {
                    "equals": "charl@cronje.me"
                  }
                },
                {
                  "property": "Password",
                  "rich_text": {
                    "equals": "9983538"
                  }
               }]
              }
            }' 

```

### Users Database Filtered Response

```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "67b36063-30c2-4861-b718-b031dc16e822",
      "created_time": "2023-05-24T17:16:00.000Z",
      "last_edited_time": "2023-06-08T20:32:00.000Z",
      "created_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "last_edited_by": {
        "object": "user",
        "id": "39e1f1c8-74e8-4187-96bd-4fb10a8f62f5"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "024faf40-382d-4875-b11e-49f13656ce36"
      },
      "archived": false,
      "properties": {
        "Status": {
          "id": "EpiX",
          "type": "checkbox",
          "checkbox": true
        },
        "ID": {
          "id": "UNH%3D",
          "type": "formula",
          "formula": {
            "type": "string",
            "string": "67b3606330c24861b718b031dc16e822"
          }
        },
        "Roles": {
          "id": "Xp%5B%60",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "_T>B",
              "name": "Admin",
              "color": "orange"
            }
          ]
        },
        "Password": {
          "id": "iV%5CC",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "9983538",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "9983538",
              "href": null
            }
          ]
        },
        "Email Address": {
          "id": "mhLX",
          "type": "email",
          "email": "charl@cronje.me"
        },
        "Avatar": {
          "id": "nLgl",
          "type": "files",
          "files": [
            {
              "name": "283560782_133894659298074_196786874908296505_n.jpg",
              "type": "file",
              "file": {
                "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/81f9f570-3ef9-42b9-af42-e32084dc759e/283560782_133894659298074_196786874908296505_n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230609T154641Z&X-Amz-Expires=3600&X-Amz-Signature=2303cbcc509a080de9961cabce2176fee2bbb1b947f3b40db785f8e2569435e3&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2023-06-09T16:46:41.547Z"
              }
            }
          ]
        },
        "Company": {
          "id": "%7DHLJ",
          "type": "relation",
          "relation": [
            {
              "id": "fa0a2357-f5ba-483a-8002-831c94df44a5"
            }
          ],
          "has_more": false
        },
        "Full Name": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Charl Cronje",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Charl Cronje",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Charl-Cronje-67b3606330c24861b718b031dc16e822",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page",
  "page": {}
}
