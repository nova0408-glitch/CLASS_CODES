import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MainApp {

    static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/StudentData";
    static final String USER = "root";
    static final String PASS = "------------------";

    public static void main(String[] args) {
        try {
            // 1) Loading driver
            Class.forName(DRIVER);
            System.out.println("Driver loaded: " + DRIVER);

            // 2) Establishing connection
            try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
                System.out.println("Connected to database: StudentData");

                // Metadata requirement
                showDatabaseMetaData(conn);

                // 3, 4, 5) Statement + execute + process ResultSet
                showStudentsWithStatement(conn);

                // 6) PreparedStatement CRUD
                preparedInsert(conn);
                preparedSelect(conn, "2026-04-0101");
                preparedUpdate(conn, "2026-04-0101", 3);
                preparedDelete(conn, "2026-04-0102");

                // 7) Batch + dynamic insert
                batchInsertCourses(conn);
                batchUpdateStudents(conn);
                dynamicInsertStudents(conn, buildDynamicRows());

                // ResultSet metadata requirement
                showResultSetMetaData(conn);

                // Final check
                showStudentsWithStatement(conn);
            }
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found. Add mysql-connector-j to classpath.");
            e.printStackTrace();
        } catch (SQLException e) {
            // 4) Exception handling
            System.out.println("Database error:");
            e.printStackTrace();
        }
    }

    private static void showDatabaseMetaData(Connection conn) {
        try {
            DatabaseMetaData meta = conn.getMetaData();
            System.out.println("\n--- DatabaseMetaData ---");
            System.out.println("DB Product: " + meta.getDatabaseProductName());
            System.out.println("DB Version: " + meta.getDatabaseProductVersion());
            System.out.println("Driver Name: " + meta.getDriverName());
        } catch (SQLException error) {
            error.printStackTrace();
        }
    }

    private static void showStudentsWithStatement(Connection conn) {
        String query = "SELECT student_id, registration_no, full_name, year_of_study FROM Student ORDER BY student_id";

        try (
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query)
        ) {
            System.out.println("\n--- Students (Statement) ---");
            while (rs.next()) {
                System.out.print("ID: " + rs.getInt("student_id"));
                System.out.print(", RegNo: " + rs.getString("registration_no"));
                System.out.print(", Name: " + rs.getString("full_name"));
                System.out.println(", Year: " + rs.getInt("year_of_study"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void preparedInsert(Connection conn) {
        String deleteSql = "DELETE FROM Student WHERE registration_no IN (?, ?)";
        String insertSql = "INSERT INTO Student (registration_no, full_name, degree_programme, year_of_study, phone_number, email) VALUES (?, ?, ?, ?, ?, ?)";

        try (
            PreparedStatement deleteStmt = conn.prepareStatement(deleteSql);
            PreparedStatement insertStmt = conn.prepareStatement(insertSql)
        ) {
            deleteStmt.setString(1, "2026-04-0101");
            deleteStmt.setString(2, "2026-04-0102");
            deleteStmt.executeUpdate();

            insertStmt.setString(1, "2026-04-0101");
            insertStmt.setString(2, "Daniel Mushi");
            insertStmt.setString(3, "BSc Computer Science");
            insertStmt.setInt(4, 2);
            insertStmt.setString(5, "+255700000101");
            insertStmt.setString(6, "daniel.mushi@student.ac.tz");
            insertStmt.executeUpdate();

            insertStmt.setString(1, "2026-04-0102");
            insertStmt.setString(2, "Ester Mfinanga");
            insertStmt.setString(3, "BSc Information Technology");
            insertStmt.setInt(4, 1);
            insertStmt.setString(5, "+255700000102");
            insertStmt.setString(6, "ester.mfinanga@student.ac.tz");
            insertStmt.executeUpdate();

            System.out.println("\nPrepared INSERT complete.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void preparedSelect(Connection conn, String regNo) {
        String sql = "SELECT registration_no, full_name, degree_programme, year_of_study FROM Student WHERE registration_no = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, regNo);

            try (ResultSet rs = pstmt.executeQuery()) {
                System.out.println("\nPrepared SELECT result:");
                if (rs.next()) {
                    System.out.print("RegNo: " + rs.getString("registration_no"));
                    System.out.print(", Name: " + rs.getString("full_name"));
                    System.out.print(", Degree: " + rs.getString("degree_programme"));
                    System.out.println(", Year: " + rs.getInt("year_of_study"));
                } else {
                    System.out.println("No student found for regNo=" + regNo);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void preparedUpdate(Connection conn, String regNo, int newYear) {
        String sql = "UPDATE Student SET year_of_study = ? WHERE registration_no = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, newYear);
            pstmt.setString(2, regNo);
            int rows = pstmt.executeUpdate();
            System.out.println("\nPrepared UPDATE affected rows: " + rows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void preparedDelete(Connection conn, String regNo) {
        String sql = "DELETE FROM Student WHERE registration_no = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, regNo);
            int rows = pstmt.executeUpdate();
            System.out.println("Prepared DELETE affected rows: " + rows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void batchInsertCourses(Connection conn) {
        String sql = "INSERT INTO Course (course_code, course_name, degree_programme, semester, credits) " +
            "VALUES (?, ?, ?, ?, ?) " +
            "ON DUPLICATE KEY UPDATE " +
            "course_name = VALUES(course_name), degree_programme = VALUES(degree_programme), " +
            "semester = VALUES(semester), credits = VALUES(credits)";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            conn.setAutoCommit(false);

            addCourseBatch(pstmt, "CP220", "Operating Systems", "BSc Computer Science", "Semester 2", 4);
            addCourseBatch(pstmt, "CP230", "Computer Security", "BSc Computer Science", "Semester 2", 3);
            addCourseBatch(pstmt, "IT225", "Web Programming", "BSc Information Technology", "Semester 2", 3);

            int[] result = pstmt.executeBatch();
            conn.commit();
            conn.setAutoCommit(true);

            System.out.println("\nBatch INSERT (Course) statements executed: " + result.length);
        } catch (SQLException e) {
            try {
                conn.rollback();
                conn.setAutoCommit(true);
            } catch (SQLException rollbackError) {
                rollbackError.printStackTrace();
            }
            e.printStackTrace();
        }
    }

    private static void addCourseBatch(PreparedStatement pstmt, String code, String name,
                                       String degree, String semester, int credits) throws SQLException {
        pstmt.setString(1, code);
        pstmt.setString(2, name);
        pstmt.setString(3, degree);
        pstmt.setString(4, semester);
        pstmt.setInt(5, credits);
        pstmt.addBatch();
    }

    private static void batchUpdateStudents(Connection conn) {
        String sql = "UPDATE Student SET year_of_study = ? WHERE registration_no = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            conn.setAutoCommit(false);

            addStudentYearUpdateBatch(pstmt, 3, "2026-04-0001");
            addStudentYearUpdateBatch(pstmt, 3, "2026-04-0002");
            addStudentYearUpdateBatch(pstmt, 2, "2026-04-0003");

            int[] result = pstmt.executeBatch();
            conn.commit();
            conn.setAutoCommit(true);

            System.out.println("Batch UPDATE (Student) statements executed: " + result.length);
        } catch (SQLException e) {
            try {
                conn.rollback();
                conn.setAutoCommit(true);
            } catch (SQLException rollbackError) {
                rollbackError.printStackTrace();
            }
            e.printStackTrace();
        }
    }

    private static void addStudentYearUpdateBatch(PreparedStatement pstmt, int year, String regNo)
        throws SQLException {
        pstmt.setInt(1, year);
        pstmt.setString(2, regNo);
        pstmt.addBatch();
    }

    private static void dynamicInsertStudents(Connection conn, List<StudentRow> rows) {
        if (rows.isEmpty()) {
            return;
        }

        StringBuilder sql = new StringBuilder(
            "INSERT INTO Student (registration_no, full_name, degree_programme, year_of_study, phone_number, email) VALUES "
        );

        for (int i = 0; i < rows.size(); i++) {
            if (i > 0) {
                sql.append(", ");
            }
            sql.append("(?, ?, ?, ?, ?, ?)");
        }

        sql.append(" ON DUPLICATE KEY UPDATE ")
            .append("full_name = VALUES(full_name), ")
            .append("degree_programme = VALUES(degree_programme), ")
            .append("year_of_study = VALUES(year_of_study), ")
            .append("phone_number = VALUES(phone_number), ")
            .append("email = VALUES(email)");

        try (PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {
            int index = 1;
            for (StudentRow row : rows) {
                pstmt.setString(index++, row.registrationNo);
                pstmt.setString(index++, row.fullName);
                pstmt.setString(index++, row.degreeProgramme);
                pstmt.setInt(index++, row.yearOfStudy);
                pstmt.setString(index++, row.phoneNumber);
                pstmt.setString(index++, row.email);
            }

            int affectedRows = pstmt.executeUpdate();
            System.out.println("Dynamic multi-row INSERT affected rows: " + affectedRows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static List<StudentRow> buildDynamicRows() {
        List<StudentRow> rows = new ArrayList<>();
        rows.add(new StudentRow("2026-04-0201", "Faith Lupembe", "BSc Computer Science", 1,
            "+255700000201", "faith.lupembe@student.ac.tz"));
        rows.add(new StudentRow("2026-04-0202", "George Senkoro", "BSc Information Technology", 2,
            "+255700000202", "george.senkoro@student.ac.tz"));
        return rows;
    }

    private static void showResultSetMetaData(Connection conn) {
        String sql = "SELECT registration_no, full_name, degree_programme, year_of_study FROM Student";

        try (
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery()
        ) {
            ResultSetMetaData rsMeta = rs.getMetaData();
            System.out.println("\n--- ResultSetMetaData ---");
            System.out.println("Column count: " + rsMeta.getColumnCount());

            for (int i = 1; i <= rsMeta.getColumnCount(); i++) {
                System.out.println(
                    "Column " + i + ": " + rsMeta.getColumnName(i) +
                    " (" + rsMeta.getColumnTypeName(i) + ")"
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static class StudentRow {
        private final String registrationNo;
        private final String fullName;
        private final String degreeProgramme;
        private final int yearOfStudy;
        private final String phoneNumber;
        private final String email;

        private StudentRow(String registrationNo, String fullName, String degreeProgramme,
                           int yearOfStudy, String phoneNumber, String email) {
            this.registrationNo = registrationNo;
            this.fullName = fullName;
            this.degreeProgramme = degreeProgramme;
            this.yearOfStudy = yearOfStudy;
            this.phoneNumber = phoneNumber;
            this.email = email;
        }
    }
}
