/* The user model defines the structure of the user struct and directly accesses the database to store, update, delete
   and get user information
 --------------------------------------------------------------------------------------------------------------------- */

package models

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"regexp"
)

type User struct {
	ID       uint   `gorm:"primarykey"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func AddUser(userData User) (uint, error) {
	hashedPassword, err := hash(userData.Password)
	if err != nil {
		return 0, err
	}
	//    if (!(validatePassword(userData.Password) &&
	//          validateUsername(userData.Username) &&
	//   validateEmail(userData.Email))) {
	// return 0, errors.New("Invalid username, email or password")
	//
	//    }
	userData.Password = hashedPassword
	result := DB.Create(&userData)
	return userData.ID, result.Error
}

func DeleteUser(id uint) error {
	result := DB.Delete(&User{}, id)
	return result.Error
}

func UpdateUser(id uint, userData User) error {
	result := DB.Where("id = ?", id).Updates(&userData)
	return result.Error
}

func GetUsernameById(id uint) (string, error) {
	var username string
	result := DB.Model(&User{}).Select("username").Where("id = ?", id).Scan(&username)
	return username, result.Error
}

func GetEmailById(id uint) (string, error) {
	var email string
	result := DB.Model(&User{}).Select("email").Where("id = ?", id).Scan(&email)
	return email, result.Error
}

func LogInUser(email string, password string) (uint, error) {
	/* Log in a user with their email and password */

	var user User
	result := DB.Model(&User{}).Where("email = ?", email).Scan(&user)
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

func ValidatePassword(password string) bool {
	/* ^ asserts the start of the string, $ asserts the end.
	   (?=.*[a-z]) ensures at least one lowercase letter.
	   (?=.*[A-Z]) ensures at least one uppercase letter.
	   (?=.*\d) ensures at least one digit.
	   .{8,} ensures the password is at least 8 characters long. */

	pattern := `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;,.?]).{8,16}$`
	re := regexp.MustCompile(pattern)
	return re.MatchString(password)
}

func ValidateUsername(username string) bool {
	// {3,}$ ensures the username is at least 3 characters long
	// ^[a-zA-Z0-9] ensures only alphabetic chars and numbers
	pattern := `^[a-zA-Z0-9]{3,}$`
	re := regexp.MustCompile(pattern)
	return re.MatchString(username)
}

func ValidateEmail(email string) bool {
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	re := regexp.MustCompile(pattern)
	return re.MatchString(email)
}
