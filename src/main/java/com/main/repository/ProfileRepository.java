package com.main.repository;

import com.main.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {
    //This interface will automatically provide CRUD operations for ProfileEntity
    //you can add custom query method here if needed

    //select *from tbl_profiles where email=?
    Optional <ProfileEntity> findByEmail(String email);

    //select *from tbl_profiles where activation_token=?
    Optional<ProfileEntity> findByActivationToken(String activationToken);
}
