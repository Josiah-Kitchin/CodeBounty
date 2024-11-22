/* The project model is responsible for handeling database operations concerning user projects */

package models

func (repo *GormRepo) AddProject(userID uint, projectData Project) error {
	/* Add a project to a user based on their user id */

	projectData.User_id = userID
	result := repo.DB.Create(&projectData)
	return result.Error
}

func (repo *GormRepo) UpdateProject(userID uint, projectData Project) error {
	/* Update a project by their project id and user id */

	result := repo.DB.Where("id = ? AND user_id = ?", projectData.ID, userID).Updates(&projectData)
	return result.Error
}

func (repo *GormRepo) GetProjectById(projectID uint) (Project, error) {
	/* Gets a project by its project id */

	var project Project
	result := repo.DB.Model(&Project{}).Where("id = ?", projectID).Scan(&project)
	return project, result.Error
}

func (repo *GormRepo) GetProjectsByUserId(userID uint) ([]Project, error) {
	/* Gets all projects of a user by their user id */

	var projects []Project
	result := repo.DB.Model(&Project{}).Where("user_id = ?", userID).Scan(&projects)
	return projects, result.Error
}

func (repo *GormRepo) DeleteProject(projectID uint) error {
	result := repo.DB.Delete(&Project{}, projectID)
	return result.Error
}
