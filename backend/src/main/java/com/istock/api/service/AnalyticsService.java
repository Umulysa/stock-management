package com.istock.api.service;

import com.istock.api.model.Order;
import com.istock.api.model.Product;
import com.istock.api.model.User;
import com.istock.api.model.dto.DashboardStats;
import com.istock.api.repository.OrderRepository;
import com.istock.api.repository.ProductRepository;
import com.istock.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public DashboardStats getDashboardStats() {
        // Calculate current month stats
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfPrevMonth = startOfMonth.minusMonths(1);

        List<Order> currentMonthOrders = orderRepository.findByCreatedAtBetween(startOfMonth, now);
        List<Order> prevMonthOrders = orderRepository.findByCreatedAtBetween(startOfPrevMonth, startOfMonth);

        BigDecimal currentRevenue = currentMonthOrders.stream()
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal prevRevenue = prevMonthOrders.stream()
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate growth percentages
        double revenueGrowth = calculateGrowth(prevRevenue, currentRevenue);
        
        int totalProducts = productRepository.findAll().size();
        int totalOrders = currentMonthOrders.size();
        int activeUsers = userRepository.findByStatus("Active").size();
        
        int prevMonthProducts = totalProducts - 50; // Mock data, in real app would track product creation dates
        int prevMonthOrders = prevMonthOrders.size();
        int prevMonthUsers = activeUsers - 10; // Mock data
        
        double productGrowth = calculateGrowth(prevMonthProducts, totalProducts);
        double orderGrowth = calculateGrowth(prevMonthOrders, totalOrders);
        double userGrowth = calculateGrowth(prevMonthUsers, activeUsers);

        return new DashboardStats(
                currentRevenue,
                totalProducts,
                totalOrders,
                activeUsers,
                revenueGrowth,
                productGrowth,
                orderGrowth,
                userGrowth
        );
    }

    public List<Map<String, Object>> getSalesData() {
        // Get sales data for the last 12 months
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneYearAgo = now.minusYears(1);
        
        List<Order> orders = orderRepository.findByCreatedAtBetween(oneYearAgo, now);
        
        // Group by month
        Map<String, BigDecimal> monthlySales = new LinkedHashMap<>();
        Map<String, BigDecimal> monthlyTargets = new LinkedHashMap<>();
        
        // Initialize months
        for (int i = 0; i < 12; i++) {
            LocalDateTime date = now.minusMonths(i);
            String month = date.getMonth().toString().substring(0, 3);
            monthlySales.put(month, BigDecimal.ZERO);
            // Set arbitrary targets for demo purposes
            monthlyTargets.put(month, BigDecimal.valueOf(5000 + Math.random() * 2000));
        }
        
        // Populate with actual sales
        for (Order order : orders) {
            String month = order.getCreatedAt().getMonth().toString().substring(0, 3);
            monthlySales.put(month, monthlySales.getOrDefault(month, BigDecimal.ZERO).add(order.getTotal()));
        }
        
        // Convert to list of maps for the response
        List<Map<String, Object>> result = new ArrayList<>();
        for (String month : monthlySales.keySet()) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("month", month);
            entry.put("sales", monthlySales.get(month));
            entry.put("target", monthlyTargets.get(month));
            result.add(entry);
        }
        
        // Sort by month chronologically
        Collections.reverse(result);
        
        return result;
    }

    public List<Map<String, Object>> getProductPerformance() {
        List<Product> products = productRepository.findAll();
        List<Order> recentOrders = orderRepository.findByCreatedAtBetween(
                LocalDateTime.now().minusMonths(3), 
                LocalDateTime.now()
        );
        
        // Calculate revenue per product
        Map<String, BigDecimal> productRevenue = new HashMap<>();
        
        for (Order order : recentOrders) {
            order.getItems().forEach(item -> {
                String productId = item.getProductId();
                BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                productRevenue.put(productId, productRevenue.getOrDefault(productId, BigDecimal.ZERO).add(itemTotal));
            });
        }
        
        // Create result with product names
        List<Map<String, Object>> result = new ArrayList<>();
        for (Product product : products) {
            if (productRevenue.containsKey(product.getId())) {
                Map<String, Object> entry = new HashMap<>();
                entry.put("name", product.getName());
                entry.put("revenue", productRevenue.get(product.getId()));
                result.add(entry);
            }
        }
        
        // Sort by revenue descending and take top 5
        result.sort((a, b) -> ((BigDecimal)b.get("revenue")).compareTo((BigDecimal)a.get("revenue")));
        return result.stream().limit(5).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getInventoryTrends() {
        // Mock inventory trend data for the last 12 months
        List<Map<String, Object>> result = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        
        for (int i = 0; i < 12; i++) {
            LocalDateTime date = now.minusMonths(i);
            String month = date.getMonth().toString().substring(0, 3);
            
            Map<String, Object> entry = new HashMap<>();
            entry.put("month", month);
            // Generate some realistic looking inventory data
            entry.put("stock", 100 + (int)(Math.sin(i * 0.5) * 50) + (int)(Math.random() * 20));
            result.add(entry);
        }
        
        // Sort chronologically
        Collections.reverse(result);
        
        return result;
    }

    public List<Map<String, Object>> getCustomerMetrics() {
        // Mock customer metrics data
        List<Map<String, Object>> result = new ArrayList<>();
        
        // New customers (last 30 days)
        Map<String, Object> newCustomers = new HashMap<>();
        newCustomers.put("name", "New Customers");
        newCustomers.put("value", 540);
        newCustomers.put("color", "#3b82f6");
        result.add(newCustomers);
        
        // Returning customers (made more than one order)
        Map<String, Object> returningCustomers = new HashMap<>();
        returningCustomers.put("name", "Returning Customers");
        returningCustomers.put("value", 620);
        returningCustomers.put("color", "#10b981");
        result.add(returningCustomers);
        
        // Inactive customers (no orders in 90 days)
        Map<String, Object> inactiveCustomers = new HashMap<>();
        inactiveCustomers.put("name", "Inactive Customers");
        inactiveCustomers.put("value", 210);
        inactiveCustomers.put("color", "#f59e0b");
        result.add(inactiveCustomers);
        
        return result;
    }

    private double calculateGrowth(int previous, int current) {
        if (previous == 0) return 100.0;
        return ((double)(current - previous) / previous) * 100.0;
    }

    private double calculateGrowth(BigDecimal previous, BigDecimal current) {
        if (previous.compareTo(BigDecimal.ZERO) == 0) return 100.0;
        return current.subtract(previous)
                .divide(previous, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();
    }
}
