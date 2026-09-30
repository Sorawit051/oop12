import { student } from "./student";
import { BaseDAO } from "./BaseDAO";

export class StudentDAO extends BaseDAO {
    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY
                AUTOINCREMENT,
                studentCode TEXT NOT NULL,
                fullName TEXT NOT NULL,
                gpa REAL NOT NULL
            )
        `);
    }

    public insert(studentCode: string, fullName: string, gpa: number): boolean {
        const stmt = this.db.prepare('INSERT INTO students (studentCode, fullName, gpa) VALUES (?, ?, ?)');
        const result = stmt.run(studentCode, fullName, gpa);
        return result.changes > 0;
    }

    public findAll(): student[] {
        const stmt = this.db.prepare('SELECT * FROM students');
        const rows = stmt.all() as { id: number, studentCode: string, fullName: string, gpa: number }[];
        return rows.map(row => new student(row.id, row.studentCode, row.fullName, row.gpa));
    }
}
