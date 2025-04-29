package com.istock.api.controller;

import com.istock.api.model.dto.DashboardStats;
import com.istock.api.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Map<String, Object>>> getSalesData() {
        return ResponseEntity.ok(analyticsService.getSalesData());
    }

    @GetMapping("/products/performance")
    public ResponseEntity<List<Map<String, Object>>> getProductPerformance() {
        return ResponseEntity.ok(analyticsService.getProductPerformance());
    }

    @GetMapping("/inventory/trends")
    public ResponseEntity<List<Map<String, Object>>> getInventoryTrends() {
        return ResponseEntity.ok(analyticsService.getInventoryTrends());
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Map<String, Object>>> getCustomerMetrics() {
        return ResponseEntity.ok(analyticsService.getCustomerMetrics());
    }
}
