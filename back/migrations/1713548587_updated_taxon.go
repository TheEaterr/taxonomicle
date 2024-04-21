package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("q9uvtlynm3ygzf8")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("onvl6nuq")

		// add
		new_description := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "j7sa5ybf",
			"name": "description",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_description)
		collection.Schema.AddField(new_description)

		// add
		new_image_link := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "lujhjucl",
			"name": "image_link",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_image_link)
		collection.Schema.AddField(new_image_link)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("q9uvtlynm3ygzf8")
		if err != nil {
			return err
		}

		// add
		del_image_link := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
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
		}`), del_image_link)
		collection.Schema.AddField(del_image_link)

		// remove
		collection.Schema.RemoveField("j7sa5ybf")

		// remove
		collection.Schema.RemoveField("lujhjucl")

		return dao.SaveCollection(collection)
	})
}
