package com.quoram.quoram.Controllers;

import com.quoram.quoram.DAO.QueryRepository;
import com.quoram.quoram.Entity.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class QueryController {

    @Autowired
    private QueryRepository queryRepository;


    @GetMapping("/query/{id}")
    public Query getQuery(@PathVariable int id) {
        return queryRepository.getOne(id);
    }

    @GetMapping("/queries")
    public List<Query> listQueries() {
        return queryRepository.findAll();
    }

    @PostMapping("/query")
    public String createQuery(@RequestBody Query query) {
        try {
            queryRepository.save(query);
            return HttpStatus.CREATED.toString() + " Query created succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " failed to create a query";
        }
    }

    @DeleteMapping("/query/{id}")
    public String deleteQuery(@PathVariable int id) {
        try {
            queryRepository.deleteById(id);
            return HttpStatus.OK.toString() + " deleted the query succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " error deleting the query";
        }
    }

    @GetMapping("/end-session/{queryId}")
    public String endSession(@PathVariable int queryId) {
        Query query = new Query();
        try {
            query = queryRepository.getOne(queryId);
            query.setStatus("COMPLETED");
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            Timestamp timestamp = new Timestamp(new Date());
            query.setSessionEndTime(formatter.format(date));
            return HttpStatus.OK.toString() + " deleted the query succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " error deleting the query";
        }
    }
}
