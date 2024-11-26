package test_models

import (
	"codebounty/models"
	"encoding/json"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestAddProfile(t *testing.T) {
	/* Test the creation of a profile in the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	id := uint(1)
	profile := models.Profile{
		Interests: []string{"go"},
	}

	mock.ExpectBegin()
	mock.ExpectExec("INSERT INTO `profiles`").
		WithArgs(sqlmock.AnyArg(), id). //any arg because of how i have the string being converted to json
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	err = mockRepo.AddProfile(id, profile)
	assert.NoError(t, err)

	assert.NoError(t, mock.ExpectationsWereMet())

}

func TestUpdateProfile(t *testing.T) {
	/* Test an update of the profile from the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(1)
	profile := models.Profile{Interests: []string{"go"}}

	mock.ExpectBegin()
	mock.ExpectExec("UPDATE `profiles` SET `interests`=\\? WHERE id = \\?").
		WithArgs(sqlmock.AnyArg(), userId).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.UpdateProfile(userId, profile)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())

}

func TestGetProfileById(t *testing.T) {
	/* Test getting a profile by id from the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(0)
	profile := models.Profile{
		Interests: []string{"go"},
	}
	jsonInterests, _ := json.Marshal(profile.Interests)

	mock.ExpectQuery("SELECT \\* FROM `profiles` WHERE id = ?"). //it sometimes trolls and you need to add regex urself
									WithArgs(userId).
									WillReturnRows(sqlmock.NewRows([]string{"id", "interests"}).
										AddRow(userId, jsonInterests))

	resultProfile, err := mockRepo.GetProfileById(userId)
	assert.NoError(t, err)
	assert.Equal(t, resultProfile, profile)
	assert.NoError(t, mock.ExpectationsWereMet())
}
