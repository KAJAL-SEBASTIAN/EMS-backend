//import db.js
const db = require('../services/db')

//logic for get all employees from the database
const getAllEmployees=()=>{
    return db.employee.find().then(
        (result)=>{//result-> all employees details
            if( result){
                return{//send to frontend
                    statusCode:200,
                    employees:result
                }
            }
            else{
                    return{//send to frontend
                        statusCode:404,
                        message:'Employees not found'
                    }
            }
        }
    
    )
}

//logic for add an employees from the database
const addEmployee=(id,name,age,designation,salary)=>{
 return db.employee.findOne({id}).then((result)=>{
    //if id is present in the db
    if(result){
        return{
            statusCode:404,
            message:"Employee already exist"
        }
    }
    else{
        //if id is not present in the db, to save all data in db
        const newEmployee=new db.employee({id,name,age,designation,salary})
        newEmployee.save()
        return{
            statusCode:200,
            message:"Employee added successfully..."
        }
    }
 })
}

//logic for delete an employee from database
const deleteEmployee=(id)=>{
    return db.employee.deleteOne({id}).then((result)=>{
        //if id is present in the db
            return{
                statusCode:200,
                message:"Employee deleted successfully"
            }
    })
    .catch((error)=>{
         return{
                statusCode:404,
                message:"Can't delete an employee from the database"
            }
        
    })
}

//logic for get an employee from database
const getAnEmployee=(id)=>{
    return db.employee.findOne({id}).then((result)=>{
     if(result){

        return{//send to frontend
            statusCode:200,
            employees:result //employee details object
        }
     }
     else{
        return{ //send to frontend
            statusCode:404,
            message:"Employee not found"
        }
     }
    })
}

//logic for update an employee details
const updateEmployee =(id,name,age,designation,salary)=>{//updated details
    return db.employee.findOne({id}).then((result)=>{
        if(result){//result -> an employee details
        //assign updated employee details to the mongodb object
          result.id=id;
          result.name=name;
          result.age=age;
          result.designation=designation;
          result.salary=salary;
          // save the employee details to the mongodb
          result.save();

           return{//send to frontend
               statusCode:200,
               message:"Employee details updated successfully"
           }
        }
        else{
           return{ //send to frontend
               statusCode:404,
               message:"Employee not found"
           }
        }
       })
}

module.exports={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    getAnEmployee,
    updateEmployee
}