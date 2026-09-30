export class student{
    constructor(private id:number , private studentCode:string , private fullName:string, private gpa:number) {}

    public getid(): number {return this.id};
    public getStudentCode(): string {return this.studentCode};
    public getFullName(): string {return this.fullName};
    public getGPA(): number {return this.gpa};

    public getInfo(): string{
        return `Student: ${this.id} ${this.studentCode} ${this.fullName} ${this.gpa}`
    }
    
    public isHonors(): boolean{
        if(this.gpa >= 3.5){
            return true;
        }
        return false;
    }
}