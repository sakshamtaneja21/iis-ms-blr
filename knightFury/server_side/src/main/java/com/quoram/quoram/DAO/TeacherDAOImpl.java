package com.quoram.quoram.DAO;


import com.quoram.quoram.Entity.Query;
import com.quoram.quoram.Entity.Teacher;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.rmi.CORBA.Util;
import javax.swing.event.ListDataEvent;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TeacherDAOImpl {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> getSuggestedTeachersForAQuery(String language, String subject, String educationLevel) {
        Session session = entityManager.unwrap(Session.class);
        javax.persistence.Query query = session.createQuery("from Teacher where languages LIKE :language and subjects LIKE :subject and teaching_areas LIKE :educationLevel", Teacher.class);
        query.setParameter("language", "%" + language + "%");
        query.setParameter("subject", "%" + subject + "%");
        query.setParameter("educationLevel", "%" + educationLevel + "%");
        List<Teacher> suggestedTeachers = (List<Teacher>) query.getResultList();
        return suggestedTeachers;
    }

    public String acceptIncomingRequest(int queryId, int teacherId) {

        try {
            Query query = queryRepository.getOne(queryId);
            String existingInterestedTeachers = query.getInterestedTeachers();
            String updatedInterestedTeachers = existingInterestedTeachers +  teacherId;
            query.setInterestedTeachers(updatedInterestedTeachers);
            queryRepository.save(query);
            return HttpStatus.OK.toString() + " Query accepted by teacherId = " + teacherId;
        } catch (Exception e) {

            return HttpStatus.BAD_REQUEST.toString() + " failed to accept the query with queryId = " + queryId;
        }
    }

    public List<Teacher> listInterestedTeachers(int queryId) throws Exception {
        try {
            Query query = queryRepository.getOne(queryId);
            String[] interestedTeacherIds = query.getInterestedTeachers().split(",");
            List<Teacher> interestedTeachers= new ArrayList<>();
            for(String teacherId: interestedTeacherIds) {
                Teacher teacher = teacherRepository.getOne(Integer.parseInt(teacherId));
                interestedTeachers.add(teacher);
            }
            return interestedTeachers;
        } catch (Exception e) {
            throw new Exception("listInterestedTeachers failed" + e.getMessage());
        }
    }

    public void selectTeacher(int queryId, int teacherId) {
        Query query = queryRepository.getOne(queryId);
        query.setTeacherId(teacherId);
        queryRepository.save(query);
    }

}
