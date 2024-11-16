package main_test

import (
	"codebounty/models"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func TestGetProjectByID_WithMock(t *testing.T) {
	// Create a mock database connection
	db, mock, err := sqlmock.New() // sqlmock.New() creates a mock connection
	if err != nil {
		t.Fatalf("Error creating mock database: %v", err)
	}
	defer db.Close()

	// Create a GORM DB instance from the mock database
	gormDB, err := gorm.Open(mysql.New(mysql.Config{
		Conn: db, // Connect the mock SQL connection to GORM
	}), &gorm.Config{
		DisableAutomaticPing: true,
	})
	if err != nil {
		t.Fatalf("Error creating GORM instance: %v", err)
	}

	// Set the global db variable to the mock GORM DB instance
	models.DB = gormDB

	// Mock the query that should be executed by the GetProjectByID function
	mock.ExpectQuery("SELECT * FROM `projects` WHERE `projects`.`id` = ?").
		WithArgs(1).
		WillReturnRows(sqlmock.NewRows([]string{"id", "title"}).AddRow(1, "Test Project"))

	// Call the function that uses the global db
	project, err := models.GetProjectById(1)

	// Assertions
	assert.Nil(t, err)
	assert.NotNil(t, project)
	assert.Equal(t, "Test Project", project.Title)

	// Ensure that the expected queries were run
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("There were unmet expectations: %v", err)
	}
}
