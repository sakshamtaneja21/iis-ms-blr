package com.quoram.quoram.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "student")
public class Student {

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

    @Column(name = "subject_interests")
    private String subjectInterests;

    @Column(name = "queries_asked")
    private int queriesAsked;

    @Column(name = "money_spent_till_date")
    private int moneySpentTillDate;

    @Column(name = "education_level")
    private String educationLevel;

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

    public String getSubjectInterests() {
        return subjectInterests;
    }

    public void setSubjectInterests(String subjectInterests) {
        this.subjectInterests = subjectInterests;
    }

    public int getQueriesAsked() {
        return queriesAsked;
    }

    public void setQueriesAsked(int queriesAsked) {
        this.queriesAsked = queriesAsked;
    }

    public int getMoneySpentTillDate() {
        return moneySpentTillDate;
    }

    public void setMoneySpentTillDate(int moneySpentTillDate) {
        this.moneySpentTillDate = moneySpentTillDate;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }
}
