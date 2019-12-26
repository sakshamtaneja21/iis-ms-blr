package com.quoram.quoram.Services.ServicesInterface;

import com.quoram.quoram.Entity.Teacher;

import java.util.List;

public interface TeacherServices {

    List<Teacher> getSuggestedTeachersForAQuery(String language, String subject, String educationLevel);
    String acceptIncomingRequest(int queryId, int teacherId);
    List<Teacher> listInterestedTeachers(int queryId);
    public String selectTeacher(int queryId, int teacherId);

}
