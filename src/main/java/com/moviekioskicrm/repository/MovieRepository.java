package com.moviekioskicrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviekioskicrm.model.Movies;

@Repository
public interface MovieRepository extends JpaRepository<Movies, Long> {

}
