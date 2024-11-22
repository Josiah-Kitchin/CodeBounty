package test_models

import (
	"codebounty/models"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestAddProject(t *testing.T) {
	/* Test the creation of a project in the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(3)
	project := models.Project{
		ID:          1,
		Title:       "testTitle",
		Link:        "testLink",
		Description: "testDescription",
		Tags:        []string{"testTags"},
	}

	mock.ExpectBegin()
	mock.ExpectExec("INSERT INTO `projects`").
		WithArgs(userId, project.Title, project.Description, project.Link, sqlmock.AnyArg(), project.ID). //any arg because of how i have the string being converted to json
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	err = mockRepo.AddProject(userId, project)
	assert.NoError(t, err)

	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestUpdateProject(t *testing.T) {
	/* Test an update of the project from the db */

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(3)
	project := models.Project{
		ID:   1,
		Link: "testLink",
	}

	mock.ExpectBegin()
	mock.ExpectExec(`^UPDATE `+"`projects`"+` SET `+"`link`"+` = \? WHERE \(id = \? AND user_id = \?\) AND `+"`id`"+` = \?$`).
		WithArgs(project.Link, userId, project.ID).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.UpdateProject(userId, project)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}
