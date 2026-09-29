import java.util.ArrayList;
import java.util.List;

// =============================================================================
// CLASS 1: Student (BLUEPRINT SA USA KA ESTUDYANTE)
// Dinhi gihiusa ang Data (attributes) ug Aksyon/Logic (methods).
// =============================================================================
class Student {

    // ENCAPSULATION: 'private' ang variables para protektado sa gawas
    private String id;
    private String name;
    private double grade;

    // CONSTRUCTOR: Gamiton kung maghimo ug bag-ong Object (new Student(...))
    public Student(String id, String name, double grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    // GETTERS: Mga paagi para ma-access ang private attributes sa luwas nga paagi
    public String getId() { return id; }
    public String getName() { return name; }
    public double getGrade() { return grade; }

    // BEHAVIOR / METHOD: Mismo ang Student object ang nakabalo kung nakapasa ba siya
    public boolean isPassing() {
        return this.grade >= 75;
    }
}

// =============================================================================
// CLASS 2: Gradebook (TAG-DUMALA SA MGA STUDENT OBJECTS)
// Nagahabol sa koleksyon sa gihiusa nga Student objects.
// =============================================================================
class Gradebook {

    // Usa ra ka List ang kinahanglan kay kada 'Student' object naa nay ID, Pangalan, ug Grade
    private List<Student> students = new ArrayList<>();

    // Magdugang sa mismo nga Student Object didto sa listahan
    public void addStudent(Student student) {
        students.add(student);
        System.out.println("Student '" + student.getName() + "' successfully added.");
    }

    // Mag-calculate sa average gamit ang getters sa kada Student Object
    public double calculateAverage() {
        if (students.isEmpty()) {
            return 0.0;
        }

        double sum = 0;
        for (Student s : students) {
            sum += s.getGrade(); // Kuhaon ang grade gikan sa mismo nga object
        }
        return sum / students.size();
    }

    // Mag-display sa mga impormasyon gamit ang methods sa Student Object
    public void displayAllStudents() {
        System.out.println("\n--- Student List (OOP Approach) ---");

        for (Student s : students) {
            // Tawagon ang isPassing() behavior gikan sa Student object
            String status = s.isPassing() ? "Passed" : "Failed";

            System.out.println("ID: " + s.getId() + 
                               " | Name: " + s.getName() + 
                               " | Grade: " + s.getGrade() + 
                               " | Status: " + status);
        }

        System.out.printf("Class Average: %.2f\n", calculateAverage());
    }
}

// =============================================================================
// MAIN CLASS (OBJECT INTERACTION)
// Dinhi maghimo ug Objects ug ipatrabaho sila nga magkauban.
// =============================================================================
public class OopSystem {

    public static void main(String[] args) {
        // Maghimo ug Tag-dumala (Gradebook Object)
        Gradebook gradebook = new Gradebook();

        // Maghimo ug mga Estudyante (Student Objects)
        Student s1 = new Student("S001", "Maria Santos", 88.5);
        Student s2 = new Student("S002", "Juan Dela Cruz", 72.0);
        Student s3 = new Student("S003", "Pedro Penduko", 91.0);

        // I-sulod ang mga Student Objects sa Gradebook Object
        gradebook.addStudent(s1);
        gradebook.addStudent(s2);
        gradebook.addStudent(s3);

        // Patakduhon ang pag-display
        gradebook.displayAllStudents();
    }
}