package main

import (
    "codebounty/models"
    "testing"
)

func TestValidatePassword(t *testing.T) {
    password := "validPassword!123"
    if !(models.ValidatePassword(password)) {
	t.Errorf("VerifyPassword(validPassword!123) = false; want true")
    }
}
