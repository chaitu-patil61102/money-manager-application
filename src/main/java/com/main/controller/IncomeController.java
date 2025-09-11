package com.main.controller;

import com.main.dto.ExpenseDTO;
import com.main.dto.IncomeDTO;
import com.main.service.EmailService;
import com.main.service.IncomeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;
    private final EmailService emailService;

    //add income
    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto){
        IncomeDTO saved=incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    //read income
    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes(){
        List<IncomeDTO> incomes=incomeService.getCurrentMonthIncomesForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    //delete income
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    //added

    // New endpoint to download income as an Excel file
    @GetMapping("/excel/download/income")
    public ResponseEntity<Resource> downloadIncomesAsExcel() throws IOException {
        // Assume incomeService.downloadIncomesAsExcel() returns a ByteArrayResource or similar
//        Resource file = (Resource) incomeService.downloadIncomesAsExcel();
        Resource file = incomeService.downloadIncomesAsExcel();

        // Set headers for file download
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incomes.xlsx");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        // Return the file with headers
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/email/income-excel")
    public ResponseEntity<Void> emailIncomeExcel(@AuthenticationPrincipal(expression = "username") String email) throws Exception {
        incomeService.emailIncomes(email);  // send to logged-in user
        return ResponseEntity.ok().build();
    }

}
