import sys,os
import psycopg2
from sqlalchemy import create_engine

class DBconn:
    def __init__(self):
        engine = create_engine('postgresql://postgres:12345@localhost:5432/sampledb', echo=False)
        self.conn = engine.connect()
        self.trans = self.conn.begin()
    
    def getcursor(self):
        cursor = self.conn.connection.cursor()
        return cursor
    
    def dbcommit(self):
        self.trans.commit()

def spcall_list(qry, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res

def spcall(qry, param, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res

#print(spcall_list("list_of_donors",())[0][0])