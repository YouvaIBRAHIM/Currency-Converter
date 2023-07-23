export const api = {
    "/api/currencies" : {
      "endpoint": "/api/currencies",
      "title": "Récupérer les devises disponibles",
      "details": "Récupérer les devises disponibles",
      "params": {
        "page": {
          "type": "string",
          "requirement": "facultatif",
          "description": "Récupère une liste de devises selon la pagination",
        }
      },
      "data": {
        "current_page": {
          "type": "number (integer)",
          "description": "Le numéro de la page actuelle dans la pagination."
        },
        "data": {
          "type": "array",
          "description": "Un tableau contenant une liste d'objets représentant différentes devises."
        },
        "data[i].id": {
          "type": "number (integer)",
          "description": "L'identifiant unique de la devise i."
        },
        "data[i].name": {
          "type": "string",
          "description": "Le nom de la devise i."
        },
        "data[i].code": {
          "type": "string",
          "description": "Le code de la devise i (ex: USD, EUR, etc.)."
        },
        "data[i].created_at": {
          "type": "string (format: ISO 8601)",
          "description": "La date et l'heure de création de la devise i."
        },
        "data[i].updated_at": {
          "type": "string (format: ISO 8601)",
          "description": "La date et l'heure de la dernière mise à jour de la devise i."
        },
        "first_page_url": {
          "type": "string",
          "description": "L'URL de la première page de la pagination."
        },
        "from": {
          "type": "number (integer)",
          "description": "L'index de la première entrée de la page actuelle dans le tableau de données."
        },
        "last_page": {
          "type": "number (integer)",
          "description": "Le numéro de la dernière page disponible dans la pagination."
        },
        "last_page_url": {
          "type": "string",
          "description": "L'URL de la dernière page de la pagination."
        },
        "links": {
          "type": "array",
          "description": "Un tableau contenant des liens de pagination."
        },
        "links[i].url": {
          "type": "string or null",
          "description": "L'URL du lien i. Si null, le lien n'est pas cliquable."
        },
        "links[i].label": {
          "type": "string",
          "description": "L'étiquette du lien i, généralement le numéro de page."
        },
        "links[i].active": {
          "type": "boolean",
          "description": "Indique si le lien i représente la page actuelle."
        },
        "next_page_url": {
          "type": "string or null",
          "description": "L'URL de la page suivante. Si null, il n'y a pas de page suivante."
        },
        "path": {
          "type": "string",
          "description": "L'URL de base de la ressource des devises."
        },
        "per_page": {
          "type": "number (integer)",
          "description": "Le nombre de devises affichées par page."
        },
        "prev_page_url": {
          "type": "string or null",
          "description": "L'URL de la page précédente. Si null, il n'y a pas de page précédente."
        },
        "to": {
          "type": "number (integer)",
          "description": "L'index de la dernière entrée de la page actuelle dans le tableau de données."
        },
        "total": {
          "type": "number (integer)",
          "description": "Le nombre total de devises dans la ressource."
        }
      },
      "example": {
        current_page: 1,
        data: [
          {
            id: 5,
            name: "Dollar Canadien",
            code: "CAD",
            created_at: "2023-07-22T17:01:29.000000Z",
            updated_at: "2023-07-22T17:01:29.000000Z"
          },
          {
            id: 1,
            name: "Dollar Américain",
            code: "USD",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T16:54:29.000000Z"
          },
          {
            id: 2,
            name: "Euro",
            code: "EUR",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T16:54:29.000000Z"
          },
          {
            id: 3,
            name: "Dinar Algérien",
            code: "DZD",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T16:54:29.000000Z"
          },
          {
            id: 4,
            name: "Bitcoin",
            code: "BTC",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T16:54:29.000000Z"
          }
        ],
        first_page_url: "http://localhost:8000/api/currencies?page=1",
        from: 1,
        last_page: 1,
        last_page_url: "http://localhost:8000/api/currencies?page=1",
        links: [
          {
            url: null,
            label: "&laquo; Previous",
            active: false
          },
          {
            url: "http://localhost:8000/api/currencies?page=1",
            label: "1",
            active: true
          },
          {
            url: null,
            label: "Next &raquo;",
            active: false
          }
        ],
        next_page_url: null,
        path: "http://localhost:8000/api/currencies",
        per_page: 5,
        prev_page_url: null,
        to: 5,
        total: 5
      }
    },
    "/api/pairs" : {
      "endpoint": "/api/pairs",
      "title": "Récupérer les paires disponibles",
      "details": "Récupérer les devises disponibles",
      "params": {
        "page": {
          "type": "string",
          "requirement": "facultatif",
          "description": "Récupère une liste de paires selon la pagination",
        }
      },
      "data": {
          "current_page": {
            "type": "number (integer)",
            "description": "Le numéro de la page actuelle dans la pagination."
          },
          "data": {
            "type": "array",
            "description": "Un tableau contenant une liste d'objets représentant différentes paires de devises avec leurs taux de change et d'autres informations."
          },
          "data[i].id": {
            "type": "number (integer)",
            "description": "L'identifiant unique de la paire de devises i."
          },
          "data[i].from_id": {
            "type": "number (integer)",
            "description": "L'identifiant de la devise de départ de la paire i."
          },
          "data[i].to_id": {
            "type": "number (integer)",
            "description": "L'identifiant de la devise d'arrivée de la paire i."
          },
          "data[i].currency_rate": {
            "type": "string",
            "description": "Le taux de change entre les devises de la paire i."
          },
          "data[i].created_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de création de la paire de devises i."
          },
          "data[i].updated_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de la dernière mise à jour de la paire de devises i."
          },
          "data[i].from_currency": {
            "type": "object",
            "description": "L'objet représentant la devise de départ de la paire i avec ses détails."
          },
          "data[i].from_currency.id": {
            "type": "number (integer)",
            "description": "L'identifiant unique de la devise de départ i."
          },
          "data[i].from_currency.name": {
            "type": "string",
            "description": "Le nom de la devise de départ i."
          },
          "data[i].from_currency.code": {
            "type": "string",
            "description": "Le code de la devise de départ i (ex: USD, EUR, etc.)."
          },
          "data[i].from_currency.created_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de création de la devise de départ i."
          },
          "data[i].from_currency.updated_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de la dernière mise à jour de la devise de départ i."
          },
          "data[i].to_currency": {
            "type": "object",
            "description": "L'objet représentant la devise d'arrivée de la paire i avec ses détails."
          },
          "data[i].to_currency.id": {
            "type": "number (integer)",
            "description": "L'identifiant unique de la devise d'arrivée i."
          },
          "data[i].to_currency.name": {
            "type": "string",
            "description": "Le nom de la devise d'arrivée i."
          },
          "data[i].to_currency.code": {
            "type": "string",
            "description": "Le code de la devise d'arrivée i (ex: USD, EUR, etc.)."
          },
          "data[i].to_currency.created_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de création de la devise d'arrivée i."
          },
          "data[i].to_currency.updated_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de la dernière mise à jour de la devise d'arrivée i."
          },
          "data[i].count": {
            "type": "object",
            "description": "L'objet représentant un compteur associé à la paire de devises i."
          },
          "data[i].count.id": {
            "type": "number (integer)",
            "description": "L'identifiant unique du compteur i."
          },
          "data[i].count.pair_id": {
            "type": "number (integer)",
            "description": "L'identifiant de la paire de devises associée au compteur i."
          },
          "data[i].count.count": {
            "type": "number (integer)",
            "description": "Le compteur de la paire de devises i."
          },
          "data[i].count.created_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de création du compteur i."
          },
          "data[i].count.updated_at": {
            "type": "string (format: ISO 8601)",
            "description": "La date et l'heure de la dernière mise à jour du compteur i."
          },
          "first_page_url": {
            "type": "string",
            "description": "L'URL de la première page de la pagination."
          },
          "from": {
            "type": "number (integer)",
            "description": "L'index de la première entrée de la page actuelle dans le tableau de données."
          },
          "last_page": {
            "type": "number (integer)",
            "description": "Le numéro de la dernière page disponible dans la pagination."
          },
          "last_page_url": {
            "type": "string",
            "description": "L'URL de la dernière page de la pagination."
          },
          "links": {
            "type": "array",
            "description": "Un tableau contenant des liens de pagination."
          },
          "links[i].url": {
            "type": "string or null",
            "description": "L'URL du lien i. Si null, le lien n'est pas cliquable."
          },
          "links[i].label": {
            "type": "string",
            "description": "L'étiquette du lien i, généralement le numéro de page."
          },
          "links[i].active": {
            "type": "boolean",
            "description": "Indique si le lien i représente la page actuelle."
          },
          "next_page_url": {
            "type": "string or null",
            "description": "L'URL de la page suivante. Si null, il n'y a pas de page suivante."
          },
          "path": {
            "type": "string",
            "description": "L'URL de base de la ressource des paires de devises."
          },
          "per_page": {
            "type": "number (integer)",
            "description": "Le nombre de paires de devises affichées par page."
          },
          "prev_page_url": {
            "type": "string or null",
            "description": "L'URL de la page précédente. Si null, il n'y a pas de page précédente."
          },
          "to": {
            "type": "number (integer)",
            "description": "L'index de la dernière entrée de la page actuelle dans le tableau de données."
          },
          "total": {
            "type": "number (integer)",
            "description": "Le nombre total de paires de devises dans la ressource."
          }
      },
      "example": {
        current_page: 1,
        data: [
          {
            id: 1,
            from_id: 4,
            to_id: 5,
            currency_rate: "3.70",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T17:10:18.000000Z",
            from_currency: {
              id: 4,
              name: "Bitcoin",
              code: "BTC",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            to_currency: {
              id: 5,
              name: "Dollar Canadien",
              code: "CAD",
              created_at: "2023-07-22T17:01:29.000000Z",
              updated_at: "2023-07-22T17:01:29.000000Z"
            },
            count: {
              id: 1,
              pair_id: 1,
              count: 0,
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T17:10:18.000000Z"
            }
          },
          {
            id: 2,
            from_id: 5,
            to_id: 3,
            currency_rate: "1.80",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T17:05:15.000000Z",
            from_currency: {
              id: 5,
              name: "Dollar Canadien",
              code: "CAD",
              created_at: "2023-07-22T17:01:29.000000Z",
              updated_at: "2023-07-22T17:01:29.000000Z"
            },
            to_currency: {
              id: 3,
              name: "Dinar Algérien",
              code: "DZD",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            count: {
              id: 2,
              pair_id: 2,
              count: 0,
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T17:05:15.000000Z"
            }
          },
          {
            id: 3,
            from_id: 1,
            to_id: 4,
            currency_rate: "2.50",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T17:05:29.000000Z",
            from_currency: {
              id: 1,
              name: "Dollar Américain",
              code: "USD",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            to_currency: {
              id: 4,
              name: "Bitcoin",
              code: "BTC",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            count: {
              id: 3,
              pair_id: 3,
              count: 0,
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T17:05:29.000000Z"
            }
          },
          {
            id: 4,
            from_id: 5,
            to_id: 1,
            currency_rate: "7.25",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T17:06:54.000000Z",
            from_currency: {
              id: 5,
              name: "Dollar Canadien",
              code: "CAD",
              created_at: "2023-07-22T17:01:29.000000Z",
              updated_at: "2023-07-22T17:01:29.000000Z"
            },
            to_currency: {
              id: 1,
              name: "Dollar Américain",
              code: "USD",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            count: {
              id: 4,
              pair_id: 4,
              count: 0,
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T17:06:54.000000Z"
            }
          },
          {
            id: 5,
            from_id: 2,
            to_id: 5,
            currency_rate: "5.40",
            created_at: "2023-07-22T16:54:29.000000Z",
            updated_at: "2023-07-22T17:11:14.000000Z",
            from_currency: {
              id: 2,
              name: "Euro",
              code: "EUR",
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T16:54:29.000000Z"
            },
            to_currency: {
              id: 5,
              name: "Dollar Canadien",
              code: "CAD",
              created_at: "2023-07-22T17:01:29.000000Z",
              updated_at: "2023-07-22T17:01:29.000000Z"
            },
            count: {
              id: 5,
              pair_id: 5,
              count: 0,
              created_at: "2023-07-22T16:54:29.000000Z",
              updated_at: "2023-07-22T17:11:14.000000Z"
            }
          }
        ],
        first_page_url: "http://localhost:8000/api/pairs?page=1",
        from: 1,
        last_page: 3,
        last_page_url: "http://localhost:8000/api/pairs?page=3",
        links: [
          {
            url: null,
            label: "&laquo; Previous",
            active: false
          },
          {
            url: "http://localhost:8000/api/pairs?page=1",
            label: "1",
            active: true
          },
          {
            url: "http://localhost:8000/api/pairs?page=2",
            label: "2",
            active: false
          },
          {
            url: "http://localhost:8000/api/pairs?page=3",
            label: "3",
            active: false
          },
          {
            url: "http://localhost:8000/api/pairs?page=2",
            label: "Next &raquo;",
            active: false
          }
        ],
        next_page_url: "http://localhost:8000/api/pairs?page=2",
        path: "http://localhost:8000/api/pairs",
        per_page: 5,
        prev_page_url: null,
        to: 5,
        total: 12
      }
    }
}