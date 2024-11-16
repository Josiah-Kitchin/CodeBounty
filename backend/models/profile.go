/* The profile model defines the structure of the profile jstruct and directly accesses the database to store, update,
   and get profile information
 --------------------------------------------------------------------------------------------------------------------- */

package models

type Profile struct {
	ID uint `gorm:"primarykey"`
	//Serializer converts the string[] to json when entering it inter the database
	Interests []string `json:"interests" gorm:"serializer:json"`
}

func AddProfile(id uint, profileData Profile) error {
	/* Add a profile to a user based on their user id */

	profileData.ID = id
	result := DB.Create(&profileData)
	return result.Error
}

func UpdateProfile(id uint, profileData Profile) error {
	/* Update a profile based on the user id */

	result := DB.Where("id = ?", id).Updates(&profileData)
	return result.Error
}

func GetProfileById(id uint) (Profile, error) {
	/* get a profile by a user id */

	var profile Profile
	result := DB.Model(&Profile{}).Where("id = ?", id).Scan(&profile)
	return profile, result.Error
}
