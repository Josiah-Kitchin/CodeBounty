/* The profile model defines the structure of the profile jstruct and directly accesses the database to store, update,
   and get profile information
--------------------------------------------------------------------------------------------------------------------- */

package models

func (repo *GormRepo) AddProfile(id uint, profileData Profile) error {
	/* Add a profile to a user based on their user id */

	profileData.ID = id
	result := repo.DB.Create(&profileData)
	return result.Error
}

func (repo *GormRepo) UpdateProfile(id uint, profileData Profile) error {
	/* Update a profile based on the user id */

	result := repo.DB.Where("id = ?", id).Updates(&profileData)
	return result.Error
}

func (repo *GormRepo) GetProfileById(id uint) (Profile, error) {
	/* get a profile by a user id */

	var profile Profile
	result := repo.DB.Model(&Profile{}).Where("id = ?", id).Scan(&profile)
	return profile, result.Error
}
