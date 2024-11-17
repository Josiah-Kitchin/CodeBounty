package models

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

type GormRepo struct {
	DB *gorm.DB
}

func NewGormDatabase() *GormRepo {
	/* Constructer for a GormDatabase
	Requires a .env set up with DB_HOST, DB_NAME, DB_USER, DB_PASS */

	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASS")

	credentials := fmt.Sprintf("%s:%s@tcp(%s)/%s", dbUser, dbPassword, dbHost, dbName)

	db, err := gorm.Open(mysql.Open(credentials), &gorm.Config{})
	if err != nil {
		log.Fatalf("could not connect to database: %s", err.Error())
	}

	return &GormRepo{DB: db}
}
