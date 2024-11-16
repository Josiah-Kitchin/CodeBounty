/* The project model is responsible for handeling database operations concerning user projects */

package models

type Project struct {
	ID          uint     `json:"project_id" gorm:"primarykey"`
	User_id     uint     `json:"user_id"`
	Title       string   `json:"title"`
	Description string   `json"description"`
	Link        string   `json:"link"`
	Tags        []string `json:"tags" gorm:"serializer:json"`
}

func AddProject(userID uint, projectData Project) error {
	/* Add a project to a user based on their user id */

	projectData.User_id = userID
	result := DB.Create(&projectData)
	return result.Error
}

func UpdateProject(userID uint, projectData Project) error {
	/* Update a project by their project id and user id */

	result := DB.Where("id = ? AND user_id = ?", projectData.ID, userID).Updates(&projectData)
	return result.Error
}

func GetProjectById(projectID uint) (Project, error) {
	/* Gets a project by its project id */

	var project Project
	result := DB.Model(&Project{}).Where("id = ?", projectID).Scan(&project)
	return project, result.Error
}

func GetProjectsByUserId(userID uint) ([]Project, error) {
	/* Gets all projects of a user by their user id */

	var projects []Project
	result := DB.Model(&Project{}).Where("user_id = ?", userID).Scan(&projects)
	return projects, result.Error
}
