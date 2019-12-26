package com.quoram.quoram.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "query")
public class Query {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private String createdTime;

    @Column(name = "modified_time")
    private String modifiedTime;

    @Column(name = "student_id")
    private int studentId;

    @Column(name = "teacher_id")
    private int teacherId;

    @Column(name = "title")
    private String title;

    @Column(name = "subject")
    private String subject;

    @Column(name = "tags")
    private String tags;

    @Column(name = "status")
    private String status;

    @Column(name = "images")
    private String images;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "language")
    private String language;

    @Column(name = "interested_teachers")
    private String interestedTeachers;

    @Column(name = "session_end_time")
    private int sessionEndTime;

    @Column(name = "session_duration")
    private String sessionDuration;

    public int getSessionEndTime() {
        return sessionEndTime;
    }

    public void setSessionEndTime(int sessionEndTime) {
        this.sessionEndTime = sessionEndTime;
    }

    public String getSessionDuration() {
        return sessionDuration;
    }

    public void setSessionDuration(String sessionDuration) {
        this.sessionDuration = sessionDuration;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public String getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(String modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getInterestedTeachers() {
        return interestedTeachers;
    }

    public void setInterestedTeachers(String interestedTeachers) {
        this.interestedTeachers = interestedTeachers;
    }
}
