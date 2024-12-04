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
	mock.ExpectExec("UPDATE `projects` SET `link`=? WHERE (id = ? AND user_id = ?) AND `id` = ?").
		WithArgs(project.Link, userId, project.ID).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.UpdateProject(userId, project)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetProjectById(t *testing.T) {

	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	project := models.Project{
		ID:    1,
		Title: "testTitle",
	}

	mock.ExpectQuery("SELECT \\* FROM `projects` WHERE id = ?").
		WithArgs(project.ID).
		WillReturnRows(sqlmock.NewRows([]string{"title"}).
			AddRow(project.Title))

	resultProject, err := mockRepo.GetProjectById(project.ID)
	assert.NoError(t, err)
	assert.Equal(t, resultProject.Title, project.Title)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetProjectsByUserId(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	project := models.Project{
		User_id: 4,
		Title:   "testTitle",
	}
	project2 := models.Project{
		Title: "testTitle2",
	}

	mock.ExpectQuery("SELECT \\* FROM `projects` WHERE user_id = ?").
		WithArgs(project.User_id).
		WillReturnRows(sqlmock.NewRows([]string{"title"}).
			AddRow(project.Title).
			AddRow(project2.Title))

	projects, err := mockRepo.GetProjectsByUserId(project.User_id)
	assert.NoError(t, err)
	assert.Equal(t, project.Title, projects[0].Title)
	assert.Equal(t, project2.Title, projects[1].Title)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetMatchingProjects(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	profileID := uint(1)

	mockRows := sqlmock.NewRows([]string{"id", "tags"}).
		AddRow(1, `["tech", "education"]`).
		AddRow(2, `["gaming", "health"]`)

	mock.ExpectQuery("CALL GetMatchingProjects(?)").
		WithArgs(profileID).
		WillReturnRows(mockRows)

	projects, err := mockRepo.GetMatchedProjects(profileID)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(projects) != 2 {
		t.Errorf("expected 2 projects, got %d", len(projects))
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unmet expectations: %v", err)
	}
}

func TestGetAllProjects(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	project := models.Project{
		User_id: 4,
		Title:   "testTitle",
	}
	project2 := models.Project{
		Title: "testTitle2",
	}

	mock.ExpectQuery("SELECT \\* FROM `projects`").
		WillReturnRows(sqlmock.NewRows([]string{"title"}).
			AddRow(project.Title).
			AddRow(project2.Title))

	projects, err := mockRepo.GetProjectsByUserId(project.User_id)
	assert.NoError(t, err)
	assert.Equal(t, project.Title, projects[0].Title)
	assert.Equal(t, project2.Title, projects[1].Title)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestDeleteProject(t *testing.T) {
	mockRepo, mock, err := NewMockGormDatabase()
	assert.NoError(t, err)

	userId := uint(2)
	project := models.Project{
		ID: 1,
	}

	mock.ExpectBegin()
	mock.ExpectExec("DELETE FROM `projects` WHERE (user_id = ? AND id = ?) AND `projects`.id = ?").
		WithArgs(userId, project.ID, project.ID).
		WillReturnResult(sqlmock.NewResult(0, 1))
	mock.ExpectCommit()

	err = mockRepo.DeleteProject(userId, project.ID)

	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}
