package com.quoram.quoram.Services.ServicesImpl;

import com.quoram.quoram.DAO.TeacherDAOImpl;
import com.quoram.quoram.Entity.Teacher;
import com.quoram.quoram.Services.ServicesInterface.TeacherServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherServicesImpl implements TeacherServices {

    @Autowired
    TeacherDAOImpl teacherDAO;

    @Override
    public List<Teacher> getSuggestedTeachersForAQuery(String language, String subject, String educationLevel) {
        return teacherDAO.getSuggestedTeachersForAQuery(language, subject,educationLevel);
    }

    @Override
    public String acceptIncomingRequest(int queryId, int teacherId) {
        return teacherDAO.acceptIncomingRequest(queryId, teacherId);
    }

    @Override
    public List<Teacher> listInterestedTeachers(int queryId) {
        List<Teacher> interestedIntegers = new ArrayList<>();
        try {
            interestedIntegers = teacherDAO.listInterestedTeachers(queryId);
        } catch (Exception e) {

        }
        return interestedIntegers;
    }

    @Override
    public String selectTeacher(int queryId, int teacherId) {
        try {
             teacherDAO.selectTeacher(queryId, teacherId);
            return HttpStatus.OK.toString() + " teacher with id = " + teacherId + " is selected";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() +  "failed to select" +  "teacher with id = " + teacherId;
        }
    }
}
