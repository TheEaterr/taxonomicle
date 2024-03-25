# `Taxonomicle` backend

## Quick start

First install a **recent** version of `go` then run the commands :

```bash
go install
air serve # air is a utility to give hot reloading to the go code
```

## Register changes to the database

To register new changes to the database schema, simply run :

```bash
go run main.go migrate collections
```