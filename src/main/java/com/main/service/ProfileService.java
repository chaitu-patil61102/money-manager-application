//package com.main.service;
//
//import com.main.dto.AuthDTO;
//import com.main.dto.ProfileDTO;
//import com.main.entity.ProfileEntity;
//import com.main.repository.ProfileRepository;
//import com.main.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class ProfileService {
//    //this service will handle business logic related to  profiles.
//    //for ex. it can include methods for creating,updating,deleting and retrieving profiles.
//    //it can also include methods for profile activation password management etc.
//    private final ProfileRepository profileRepository;
//    private  final  EmailService emailService;
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;
//
//    public ProfileDTO registerProfile(ProfileDTO profileDTO){
//        /// check if the email is already exists
//        ProfileEntity newProfile=toEntity(profileDTO);
//        newProfile.setActivationToken(UUID.randomUUID().toString());
//        newProfile=profileRepository.save(newProfile);
//
//        //send activation email
//        String activationLink="http://localhost:8080/api/v1.0/activate?token=" + newProfile.getActivationToken();
//        String subject="Activate your Money Manager Account";
//        String body="Click on the following link to  activate your account : "+ activationLink;
//        emailService.sendEmail(newProfile.getEmail(),subject,body);
//
//        return toDTO(newProfile);
//    }
//
//    //helper method
//    public ProfileEntity toEntity(ProfileDTO profileDTO){
//        return ProfileEntity.builder()
//                .id(profileDTO.getId())
//                .fullName(profileDTO.getFullName())
//                .email(profileDTO.getEmail())
//                .password(passwordEncoder.encode(profileDTO.getPassword()))
//                .profileImageUrl(profileDTO.getProfileImageUrl())
//                .createdAt(profileDTO.getCreatedAt())
//                .updatedAt(profileDTO.getUpdatedAt())
//                .build();
//    }
//
//    //helper method
//    public ProfileDTO toDTO(ProfileEntity profileEntity){
//        return ProfileDTO.builder()
//                .id(profileEntity.getId())
//                .fullName(profileEntity.getFullName())
//                .email(profileEntity.getEmail())
//                .profileImageUrl(profileEntity.getProfileImageUrl())
//                .createdAt(profileEntity.getCreatedAt())
//                .updatedAt(profileEntity.getUpdatedAt())
//                .build();
//    }
//
//    public boolean activateProfile(String activationToken){
//        return profileRepository.findByActivationToken(activationToken)
//                .map(profile->{
//                    profile.setIsActive(true);
//                    profileRepository.save(profile);
//                    return true;
//                })
//                .orElse(false);
//    }
//
//    public boolean isAccountActive(String email){
//        return profileRepository.findByEmail(email)
//                .map(ProfileEntity::getIsActive)
//                .orElse(false);
//    }
//
//    public ProfileEntity getCurrentProfile(){
//        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
//        return profileRepository.findByEmail(authentication.getName())
//                .orElseThrow(()->new UsernameNotFoundException("Profile not found with email : "+authentication.getName()));
//    }
//
//    public ProfileDTO getPublicProfile(String email){
//        ProfileEntity currentUser=null;
//        if(email==null){
//            currentUser=getCurrentProfile();
//        }
//        else{
//            currentUser=profileRepository.findByEmail(email)
//                    .orElseThrow(()->new UsernameNotFoundException("Profile not found with email : "+email));
//        }
//        return ProfileDTO.builder()
//                .id(currentUser.getId())
//                .fullName(currentUser.getFullName())
//                .email(currentUser.getEmail())
//                .profileImageUrl(currentUser.getProfileImageUrl())
//                .createdAt(currentUser.getCreatedAt())
//                .updatedAt(currentUser.getUpdatedAt())
//                .build();
//    }
//
//    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(),authDTO.getPassword()));
//            //Generate the JWT token
//            String token = jwtUtil.generateToken(authDTO.getEmail());
//            return Map.of(
//                    "token",token,
//                    "user", getPublicProfile(authDTO.getEmail())
//            );
//        }
//        catch(Exception e){
//            throw new RuntimeException("Invalid email or password");
//        }
//    }
//}

package com.main.service;

import com.main.dto.AuthDTO;
import com.main.dto.ProfileDTO;
import com.main.entity.ProfileEntity;
import com.main.repository.ProfileRepository;
import com.main.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

//    @Value("${app.activation.url}")
//    private String activationURL;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) {
        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);

        //send activation email
//        String activationLink = activationURL + "/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String activationLink = "http://localhost:8080/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your Money Manager Account";
        String body = "Click on the following link to activate your account : " + activationLink;
        emailService.sendEmail(newProfile.getEmail(), subject, body);
        return toDTO(newProfile);
    }

    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email : " + authentication.getName()));
    }

    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser = (email == null) ? getCurrentProfile()
                : profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email : " + email));

        return toDTO(currentUser);
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword())
            );
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token", token,
                    "user", getPublicProfile(authDTO.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}

