import java.util.*;
import java.util.stream.*;

class Employee {
    private int id;
    private String name;
    private double salary;

    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getSalary() { return salary; }
}

public class SalaryAnalytics {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee(101, "Alice", 120000.0),
            new Employee(102, "Bob", 120000.0),   // Duplicate top salary
            new Employee(103, "Charlie", 95000.0),
            new Employee(104, "David", 80000.0),
            new Employee(105, "Emma", 45000.0)
        );

        // TODO 1: Find Highest Salary
        double highest = employees.stream().map(Employee::getSalary).distinct().sorted(Comparator.reverseOrder()).collect(Collectors.toList()).get(0);

        // TODO 2: Find 2nd Highest Distinct Salary
        double secondHighest = employees.stream().map(Employee::getSalary).distinct().sorted(Comparator.reverseOrder()).skip(1).limit(1).collect(Collectors.toList()).get(0);

        // TODO 3: Find Lowest Salary
        double lowest = employees.stream().map(Employee::getSalary).distinct().sorted().limit(1).collect(Collectors.toList()).get(0);

        // Print your results

        System.out.println("Highest Salary : " + highest );

        System.out.println("Second Highest Salary : " + secondHighest );

        System.out.println("Lowest Salary : " + lowest );
    }
}
