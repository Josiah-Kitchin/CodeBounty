

/* The user model defines the structure of the user struct and directly accesses the database to store, update, delete
   and get user information 
 --------------------------------------------------------------------------------------------------------------------- */


package models

import (
    "errors"
    "crypto/sha256"
    "encoding/hex"
)

type User struct {
    ID        uint   `gorm:"primarykey"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Password  string `json:"password"` 
}


func AddUser(userData User) (uint, error) {
    userData.Password = hash(userData.Password)
    result := db.Create(&userData) 
    return userData.ID, result.Error
}

func DeleteUser(id uint) (error) {
    result := db.Delete(&User{}, id)
    return result.Error
}

func UpdateUser(id uint, userData User) (error) {
    result := db.Where("id = ?", id).Updates(userData)
    return result.Error
}

func GetUsernameById(id uint) (string, error) {
    var username string
    result := db.Model(&User{}).Select("username").Where("id = ?", id).Scan(&username)
    return username, result.Error 
}

func GetEmailById(id uint) (string, error) {
    var email string
    result := db.Model(&User{}).Select("email").Where("id = ?", id).Scan(&email)
    return email, result.Error
}

func LogInUser(email string, password string) (uint, error) {
    var user User
    result := db.Model(&User{}).Where("email = ?", email).Scan(&user)
    if result.Error != nil {
	return 0, result.Error
    }
    if user.Password != password {
	return 0, errors.New("Incorrect password")
    }
    return user.ID, result.Error
}

/* ---- Utils ---- */

func hash(password string) (string) {
    //Hash a string 
    passwordBytes := []byte(password)
    hash := sha256.New()
    hash.Write(passwordBytes)
    hashBytes := hash.Sum(nil)
    hashString := hex.EncodeToString(hashBytes)
    return hashString
}




