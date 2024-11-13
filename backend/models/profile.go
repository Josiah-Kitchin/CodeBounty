

/* The profile model defines the structure of the profile jstruct and directly accesses the database to store, update, 
   and get profile information 
 --------------------------------------------------------------------------------------------------------------------- */

package models


type Profile struct {
    ID uint `gorm:"primarykey"`
    Interests []string `json: "interests"`
}


func AddProfile(id uint, profileData Profile) (error) {
    result := DB.Create(&profileData) 
    return  result.Error
}

func UpdateProfile(id uint, profileData Profile) (error) {
    result := DB.Where("id = ?", id).Updates(&profileData)
    return result.Error
}

func GetProfileById(id uint) (Profile, error) {
    var profile Profile
    result := DB.Model(&Profile{}).Where("id = ?", id).Scan(&profile)
    return profile, result.Error 
}

