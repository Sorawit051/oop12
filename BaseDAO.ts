import Database from "better-sqlite3";

export abstract class BaseDAO {
    protected db: Database.Database;
    constructor(dbName: string = 'nprn.db'){
        this.db = new Database(dbName);
        this.iniTable();
    }
    protected abstract iniTable():void;
}