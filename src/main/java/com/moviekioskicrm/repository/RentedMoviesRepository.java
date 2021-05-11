package com.moviekioskicrm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviekioskicrm.model.Clients;


@Repository
public interface RentedMoviesRepository extends JpaRepository<Clients, Long> {

}
