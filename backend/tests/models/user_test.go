package test_models

import (
	"codebounty/models"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestAddUser(t *testing.T) {
	// Initialize mock repository
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	// Set up SQL expectations
	mock.ExpectBegin()
	mock.ExpectExec("INSERT INTO `users`").
		WithArgs("testuser", "testPerson@gmail.com", "dummyhashedpassword").
		WillReturnResult(sqlmock.NewResult(1, 1)) // Simulate ID 1
	mock.ExpectCommit()

	// Test AddUser
	user := models.User{
		Username: "testuser",
		Email:    "testPerson@gmail.com",
		Password: "pAssword!123",
	}
	id, err := mockRepo.AddUser(user)
	assert.NoError(t, err)
	assert.Equal(t, uint(1), id)

	// Ensure SQL expectations were met
	assert.NoError(t, mock.ExpectationsWereMet())
}
