package com.quoram.quoram.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "teacher")
public class Teacher {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private String createdTime;

    @Column(name = "modified_time")
    private String modifiedTime;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "contact")
    private String contact;

    @Column(name = "wallet_amount")
    private int walletAmount;

    @Column(name = "queries_handled")
    private int queriesHandled;

    @Column(name = "money_earned_till_date")
    private int moneyEarnedTillDate;

    @Column(name = "teaching_areas")
    private String teachingAreas;

    @Column(name = "experience_level")
    private String ExperienceLevel;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "points")
    private int points;

    @Column(name = "hourly_rate")
    private int hourlyDate;

    @Column(name = "subjects")
    private String subjects;

    @Column(name = "languages")
    private String languages;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public int getWalletAmount() {
        return walletAmount;
    }

    public void setWalletAmount(int walletAmount) {
        this.walletAmount = walletAmount;
    }

    public int getQueriesHandled() {
        return queriesHandled;
    }

    public void setQueriesHandled(int queriesHandled) {
        this.queriesHandled = queriesHandled;
    }

    public int getMoneyEarnedTillDate() {
        return moneyEarnedTillDate;
    }

    public void setMoneyEarnedTillDate(int moneyEarnedTillDate) {
        this.moneyEarnedTillDate = moneyEarnedTillDate;
    }

    public String getTeachingAreas() {
        return teachingAreas;
    }

    public void setTeachingAreas(String teachingAreas) {
        this.teachingAreas = teachingAreas;
    }

    public String getExperienceLevel() {
        return ExperienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        ExperienceLevel = experienceLevel;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getHourlyDate() {
        return hourlyDate;
    }

    public void setHourlyDate(int hourlyDate) {
        this.hourlyDate = hourlyDate;
    }

    public String getSubjects() {
        return subjects;
    }

    public void setSubjects(String subjects) {
        this.subjects = subjects;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }
}
