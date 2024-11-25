package models

/* ----------- Users ------------ */

type User struct {
	ID       uint   `gorm:"primarykey"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserModel interface {
	AddUser(userData User) (uint, error)
	DeleteUser(id uint) error
	UpdateUser(id uint, userData User) error
	GetUsernameById(id uint) (string, error)
	GetEmailById(id uint) (string, error)
	LogInUser(email string, password string) (uint, error)
}

/* ----------- Profiles ------------ */

type Profile struct {
	ID uint `gorm:"primarykey"`
	//Serializer converts the string[] to json when entering it inter the database
	Interests []string `json:"interests" gorm:"serializer:json"`
}

type ProfileModel interface {
	AddProfile(id uint, profileData Profile) error
	UpdateProfile(id uint, profileData Profile) error
	GetProfileById(id uint) (Profile, error)
}

/* ----------- Projects ------------ */

type Project struct {
	ID          uint     `json:"project_id" gorm:"primarykey"`
	User_id     uint     `json:"user_id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Link        string   `json:"link"`
	Tags        []string `json:"tags" gorm:"serializer:json"`
}

type ProjectModel interface {
	AddProject(userID uint, projectData Project) error
	UpdateProject(userID uint, projectData Project) error
	GetProjectById(userID uint) (Project, error)
	GetProjectsByUserId(userID uint) ([]Project, error)
	DeleteProject(projectID uint) error
	GetAllProjects() ([]Project, error)
	GetMatchedProjects(userID uint) ([]Project, error)
}
