package handlers

import (
    "codebounty/models"
)

type Handler struct {
    repo *models.GormRepo
}

func NewHandler(repo *models.GormRepo) *Handler {
    return &Handler{repo: repo}
}
