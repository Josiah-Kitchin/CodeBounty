package models

import (
	"codebounty/models"
	"testing"
)

func TestValidatePassword(t *testing.T) {
	password := "validPassword!123"
	if models.ValidatePassword(password) != nil {
		t.Errorf("VerifyPassword(validPassword!123) has error; want no error")
	}
	password = "invalid"
	if models.ValidatePassword(password) == nil {
		t.Errorf("VerifyPassword(invalid) has no error: want error")
	}
}

func TestValidateEmail(t *testing.T) {
	email := "valid@gmail.com"
	if models.ValidateEmail(email) != nil {
		t.Error("VerifyEmail(valid@gmail.com) has error; want no error")
	}
	email = "invalid"
	if models.ValidateEmail(email) == nil {
		t.Error("VerifyEmail(invalid) has no error; want error")
	}
}

func TestValidateUsername(t *testing.T) {
	username := "valid"
	if models.ValidateUsername(username) != nil {
		t.Error("ValidateUsername(valid) has error; want no error")
	}
	username = "invalid!"
	if models.ValidateUsername(username) == nil {
		t.Error("ValidateUsername(invalid!) has no error; want error")
	}
}
