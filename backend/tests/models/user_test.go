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

func TestDeleteUser(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(1)
	mock.ExpectBegin()
	mock.ExpectExec("DELETE FROM `users` WHERE `users`.`id` = ?").
		WithArgs(userId).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.DeleteUser(userId)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestUpdateUser(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(1)
	user := models.User{Email: "newEmail@gmail.com"}

	mock.ExpectBegin()
	mock.ExpectExec("UPDATE `users` SET `email`=? WHERE id = ?").
		WithArgs(user.Email, userId).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.UpdateUser(userId, user)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetUsernameById(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	user := models.User{
		ID:       1,
		Username: "test_user",
		Password: "passwordTest123!",
		Email:    "testemail@gmail.com",
	}

	mock.ExpectBegin()
	mock.ExpectExec("SELECT FROM `users` (username) WHERE `id` = ?").
		WithArgs(userId).
		WillReturnRows(sqlmock.NewRows([]string{"test_user"})).
		AddRow(user.ID, user.Username, user.Password, user.Email)
	mock.ExpectCommit()

	username, err := mockRepo.GetUsernameById(userId)
	assert.True(t)
	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}
