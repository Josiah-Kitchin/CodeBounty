package test_models

import (
	"codebounty/models"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestAddUser(t *testing.T) {
	/* Test the creation of a user in the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	user := models.User{
		Username: "testuser",
		Email:    "testPerson@gmail.com",
		Password: "testPassword!123",
	}

	mock.ExpectBegin()
	mock.ExpectExec("INSERT INTO `users`").
		WithArgs(user.Username, user.Email, sqlmock.AnyArg()). //any arg because the password is hashed
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	id, err := mockRepo.AddUser(user)
	assert.NoError(t, err)
	assert.Equal(t, uint(1), id)

	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestDeleteUser(t *testing.T) {
	/* Test the deletion of a user from the db */

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
	/* Test an update of the user from the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(1)
	user := models.User{Email: "newEmail@gmail.com"}

	mock.ExpectBegin()
	mock.ExpectExec("UPDATE `users` SET `email`=\\? WHERE id = \\?").
		WithArgs(user.Email, userId).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.UpdateUser(userId, user)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetUsernameById(t *testing.T) {
	/* Test getting a username by id from the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	user := models.User{
		ID:       1,
		Username: "test_user",
	}

	mock.ExpectQuery("SELECT `username` FROM `users` WHERE id = ?").
		WithArgs(user.ID).
		WillReturnRows(sqlmock.NewRows([]string{user.Username}).
			AddRow(user.Username))

	username, err := mockRepo.GetUsernameById(user.ID)
	assert.NoError(t, err)
	assert.Equal(t, username, user.Username)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetEmailById(t *testing.T) {
	/* Test getting a email by user id */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	user := models.User{
		ID:    1,
		Email: "test_email@gmail.com",
	}

	mock.ExpectQuery("SELECT `email` FROM `users` WHERE id = ?").
		WithArgs(user.ID).
		WillReturnRows(sqlmock.NewRows([]string{user.Email}).
			AddRow(user.Email))

	email, err := mockRepo.GetEmailById(user.ID)
	assert.NoError(t, err)
	assert.Equal(t, email, user.Email)
	assert.NoError(t, mock.ExpectationsWereMet())
}
