package main

import (
	"log"
	"os"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "taxonomicle/migrations"
)

// This middleware allows only GET requests to /api/collections to be accessed from outside the local network.
// This allows exposing the pocketbase endpoint to the network while preventing any manipulation.
func preventNonCollectionCalls(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ip := c.RealIP()
		route := c.Request().URL.Path
		// check if route starts with /api/collections and it is a GET request
		if strings.HasPrefix(route, "/api/collections") && c.Request().Method == "GET" {
			return next(c) // proceed with the request chain
		}
		if ip != "127.0.0.1" {
			return apis.NewForbiddenError("You are not permitted to access this resource.", nil)
		}

		return next(c) // proceed with the request chain
	}
}

func main() {
	app := pocketbase.New()

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))
		e.Router.Use(preventNonCollectionCalls)
		return nil
	})

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Admin UI
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
