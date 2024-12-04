package handlers

import (
	"codebounty/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) AddProject(c *gin.Context) {
	/* Add a new project
	Request:  { id uint, title string, description string, link string, tags []string}
	Response: { message, error } */

	id, ok := getIdFromRequest(c)
	if !ok {
		return
	}

	project, ok := getProjectData(c)
	if !ok {
		return
	}

	if err := h.repo.AddProject(id, project); err != nil {
		errorMessage := fmt.Sprintf("Could not add project: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project created", "error": ""})
}

func (h *Handler) UpdateProject(c *gin.Context) {

	/* Update a project
	Request: { id uint, title? string, description? string, link? string, tags? []string}
	Response: { message, error } */

	userid, ok := getIdFromRequest(c)
	if !ok {
		return
	}

	project, ok := getProjectData(c)
	if !ok {
		return
	}

	if err := h.repo.UpdateProject(userid, project); err != nil {
		errorMessage := fmt.Sprintf("could not update profile: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project updated", "error": ""})
}

func (h *Handler) GetProjectById(c *gin.Context) {
	/* Get a project by the project id
	Param: id uint
	Response: { project Project } */

	id, ok := getIdFromParam(c)
	if !ok {
		return
	}

	project, err := h.repo.GetProjectById(id)
	if err != nil {
		errorMessage := fmt.Sprintf("Error getting project by id: %s: ", err)
		c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
		return
	}

	c.JSON(http.StatusOK, gin.H{"project": project, "error": ""})
}

func (h *Handler) GetProjectsByUserId(c *gin.Context) {
	/* Get a projects by a user id
	Param: id uint
	Response: { projects []Project } */

	id, ok := getIdFromParam(c)
	if !ok {
		return
	}

	projects, err := h.repo.GetProjectsByUserId(id)
	if err != nil {
		errorMessage := fmt.Sprintf("Error getting projects by user id: %s ", err)
		c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
		return
	}

	c.JSON(http.StatusOK, gin.H{"projects": projects, "error": ""})

}

func (h *Handler) DeleteProject(c *gin.Context) {
	userId, ok := getIdFromRequest(c)
	if !ok {
		return
	}
	projectId, okay := getIdFromParam(c)
	if !okay {
		return
	}
	if err := h.repo.DeleteProject(userId, projectId); err != nil {
		errorMessage := fmt.Sprintf("error deleting project: %s", err.Error())
		c.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project deleted", "error": ""})
}

func (h *Handler) GetAllProjects(c *gin.Context) {
	projects, err := h.repo.GetAllProjects()
	if err != nil {
		errorMessage := fmt.Sprintf("error getting all project: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, gin.H{"projects": projects})
}

func (h *Handler) GetMatchedProjects(c *gin.Context) {
	id, ok := getIdFromRequest(c)
	if !ok {
		return
	}
	projects, err := h.repo.GetMatchedProjects(id)
	if err != nil {
		errorMessage := fmt.Sprintf("error getting matched projects: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, gin.H{"projects": projects})
}

/* ---------- utils ---------- */

func getProjectData(c *gin.Context) (models.Project, bool) {
	/* Fill a project struct with project data from the request */
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		errorMessage := fmt.Sprintf("Error binding json data to project: %s", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return project, false
	}
	return project, true
}
