import java.util.ArrayList;
import java.util.List;

public class ProceduralSystem {

    // =========================================================================
    // GLOBAL DATA STRUCTURES (PARALLEL LISTS)
    // Sa Procedural Style, nagkabag-o ug nagkabulag ang data sa kada estudyante.
    // Kinahanglan magkaparehas ang INDEX sa usa ka estudyante sa tulo ka Lists.
    // Hal. Index 0 = ID, Pangalan, ug Grade sa UNANG estudyante.
    // =========================================================================
    static List<String> studentIds = new ArrayList<>();
    static List<String> studentNames = new ArrayList<>();
    static List<Double> studentGrades = new ArrayList<>();

    // =========================================================================
    // PROCEDURE 1: Magdugang ug Estudyante
    // Mu-dawat ug data ug idugang kini sa kani-iya nga bulag nga List.
    // =========================================================================
    public static void addStudent(String id, String name, double grade) {
        studentIds.add(id);
        studentNames.add(name);
        studentGrades.add(grade);
        System.out.println("Student '" + name + "' successfully added.");
    }

    // =========================================================================
    // PROCEDURE 2: Mag-calculate sa Average Grade
    // I-loop ang tibuok 'studentGrades' List para makuha ang tanan ug sumada.
    // =========================================================================
    public static double calculateAverage() {
        // Siguraduhon nga dili mag-zero ang denominator kung walay sulod ang list
        if (studentGrades.isEmpty()) {
            return 0.0;
        }

        double sum = 0;
        // Kuhaon ang tanan nga grade ug i-sumada
        for (double g : studentGrades) {
            sum += g;
        }
        // I-return ang average (Total ÷ Pila ka Estudyante)
        return sum / studentGrades.size();
    }

    // =========================================================================
    // PROCEDURE 3: Mag-display sa Listahan ug Report
    // I-sumpay ang mga elemento gamit ang parehas nga index (i).
    // =========================================================================
    public static void displayAllStudents() {
        System.out.println("\n--- Student List (Procedural Approach) ---");

        // Loop sugod index 0 hangtod sa katapusang elemento sa list
        for (int i = 0; i < studentIds.size(); i++) {
            // Tan-awon kung 'Passed' o 'Failed' batok sa grade (Passing: 75)
            String status = studentGrades.get(i) >= 75 ? "Passed" : "Failed";

            // I-display ang impormasyon nga gikan sa magkalahi nga List
            System.out.println("ID: " + studentIds.get(i) + 
                               " | Name: " + studentNames.get(i) + 
                               " | Grade: " + studentGrades.get(i) + 
                               " | Status: " + status);
        }

        // Tawagon ang calculateAverage() procedure para sa pangkalahatang average
        System.out.printf("Class Average: %.2f\n", calculateAverage());
    }

    // =========================================================================
    // MAIN METHOD (SEQUENTIAL EXECUTION)
    // Dinhi tawagon ang mga procedure sa sunod-sunod nga paagi.
    // =========================================================================
    public static void main(String[] args) {
        // Step 1: Mag-insert ug data sa mga estudyante
        addStudent("S001", "Maria Santos", 88.5);
        addStudent("S002", "Juan Dela Cruz", 72.0);
        addStudent("S003", "Pedro Penduko", 91.0);

        // Step 2: I-display ang resulta
        displayAllStudents();
    }
}