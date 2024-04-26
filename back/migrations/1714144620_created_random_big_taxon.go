package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "cqdp1co9errw8ke",
			"created": "2024-04-26 15:17:00.429Z",
			"updated": "2024-04-26 15:17:00.429Z",
			"name": "random_big_taxon",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "tqiylpyu",
					"name": "taxon",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "q9uvtlynm3ygzf8",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "0lrmmqa6",
					"name": "probability",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": 0,
						"max": 10000,
						"noDecimal": false
					}
				},
				{
					"system": false,
					"id": "itevhabd",
					"name": "count",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"noDecimal": true
					}
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("cqdp1co9errw8ke")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
