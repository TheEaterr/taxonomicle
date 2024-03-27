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
		jsonData := `[
			{
				"id": "_pb_users_auth_",
				"created": "2024-02-28 16:51:08.620Z",
				"updated": "2024-03-25 20:13:44.406Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_name",
						"name": "name",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"mimeTypes": [
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif",
								"image/webp"
							],
							"thumbs": null,
							"maxSelect": 1,
							"maxSize": 5242880,
							"protected": false
						}
					}
				],
				"indexes": [],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": true,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": null,
					"onlyVerified": false,
					"requireEmail": false
				}
			},
			{
				"id": "q9uvtlynm3ygzf8",
				"created": "2024-03-01 00:18:50.961Z",
				"updated": "2024-03-27 10:22:13.107Z",
				"name": "taxon",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "5rzlsjz9",
						"name": "site_link",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "xx8ewtbg",
						"name": "rank",
						"type": "select",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"phylum",
								"subfamily",
								"tribe",
								"subclass",
								"infraorder",
								"family",
								"subgenus",
								"superorder",
								"class",
								"superclass",
								"subkingdom",
								"superfamily",
								"superphylum",
								"infraphylum",
								"species",
								"subspecies",
								"genus",
								"subphylum",
								"subtribe",
								"order",
								"infraclass",
								"infrakingdon",
								"pavorder",
								"kindgom",
								"suborder"
							]
						}
					},
					{
						"system": false,
						"id": "rnuyw9me",
						"name": "vernacular",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "oljp5jof",
						"name": "scientific",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "tkrpinrn",
						"name": "iucn",
						"type": "select",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"EX",
								"EW",
								"CR",
								"EN",
								"VU",
								"NT",
								"LC",
								"DD"
							]
						}
					},
					{
						"system": false,
						"id": "j5vglzvn",
						"name": "parent",
						"type": "relation",
						"required": false,
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
						"id": "rk286xgd",
						"name": "image_path",
						"type": "bool",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {}
					},
					{
						"system": false,
						"id": "onvl6nuq",
						"name": "image_link",
						"type": "url",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": [],
							"onlyDomains": []
						}
					},
					{
						"system": false,
						"id": "glfjt5zx",
						"name": "path",
						"type": "json",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSize": 2000000
						}
					}
				],
				"indexes": [
					"CREATE INDEX ` + "`" + `idx_evhwE6h` + "`" + ` ON ` + "`" + `taxon` + "`" + ` (\n  ` + "`" + `scientific` + "`" + `,\n  ` + "`" + `vernacular` + "`" + `\n)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": "",
				"updateRule": "",
				"deleteRule": "",
				"options": {}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
