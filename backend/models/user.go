/* The user model defines the structure of the user struct and directly accesses the database to store, update, delete
   and get user information
 --------------------------------------------------------------------------------------------------------------------- */

package models

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"regexp"
	"unicode"
)

func (repo *GormRepo) AddUser(userData User) (uint, error) {
	hashedPassword, err := hash(userData.Password)
	if err != nil {
		return 0, err
	}

	validateErr := validateUserFields(userData.Username, userData.Email, userData.Password)
	if validateErr != nil {
		return 0, validateErr
	}

	userData.Password = hashedPassword
	result := repo.DB.Create(&userData)
	return userData.ID, result.Error
}

func (repo *GormRepo) DeleteUser(id uint) error {
	result := repo.DB.Delete(&User{}, id)
	return result.Error
}

func (repo *GormRepo) UpdateUser(id uint, userData User) error {
	result := repo.DB.Where("id = ?", id).Updates(&userData)
	return result.Error
}

func (repo *GormRepo) GetUsernameById(id uint) (string, error) {
	var username string
	result := repo.DB.Model(&User{}).Select("username").Where("id = ?", id).Scan(&username)
	return username, result.Error
}

func (repo *GormRepo) GetEmailById(id uint) (string, error) {
	var email string
	result := repo.DB.Model(&User{}).Select("email").Where("id = ?", id).Scan(&email)
	return email, result.Error
}

func (repo *GormRepo) LogInUser(email string, password string) (uint, error) {
	/* Log in a user with their email and password */

	var user User
	result := repo.DB.Model(&User{}).Where("email = ?", email).Scan(&user)
	if result.Error != nil {
		return 0, result.Error
	}
	if err := verifyPassword(user.Password, password); err != nil {
		return 0, errors.New("incorrect password")
	}
	return user.ID, result.Error
}

/* ---- Utils ---- */

func hash(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func verifyPassword(hash string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err
}

func ValidatePassword(password string) error {
	// Check if the password is at least 8 characters long
	if len(password) < 8 {
		return errors.New("password must be at least 8 characters long")
	}

	// Variables to check requirements
	hasUpper := false
	hasSpecial := false

	// Check each character
	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	// Ensure all requirements are met
	if !hasUpper {
		return errors.New("password must contain at least one uppercase letter")
	}

	if !hasSpecial {
		return errors.New("password must contain at least one special character")
	}

	return nil
}

func ValidateUsername(username string) error {
	// Check if the username has at least 3 characters
	if len(username) < 3 {
		return errors.New("username must be at least 3 characters long")
	}

	// Regex for letters only (no special characters or numbers)
	matched, err := regexp.MatchString(`^[a-zA-Z]+$`, username)
	if err != nil {
		return err
	}

	if !matched {
		return errors.New("username can only contain letters")
	}

	return nil
}

func ValidateEmail(email string) error {
	// Regex for a basic email validation
	matched, err := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, email)
	if err != nil {
		return err
	}

	if !matched {
		return errors.New("invalid email format")
	}

	return nil
}

func validateUserFields(username string, email string, password string) error {
	if ValidatePassword(password) != nil ||
		ValidateUsername(username) != nil ||
		ValidateEmail(email) != nil {
		return errors.New("invalid username email or password")
	}
	return nil
}
