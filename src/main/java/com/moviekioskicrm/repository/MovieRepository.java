package com.moviekioskicrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviekioskicrm.model.Movies;

@Repository //is a Spring annotation that indicates that the decorated class is a repository. A repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.
public interface MovieRepository extends JpaRepository<Movies, Long> {
	
	//this interface extend all the methosd from the JPA repo so we dont need to use any query in our program it is automatcaly assigned through the  spring boot annotations

}
