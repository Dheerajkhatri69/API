const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//default function
app.get('/',async(req,res)=>{
    try{
            const result = await pool.query(`  select e.employee_id,concat(e.first_name,' ',e.last_name) as "Full Name",
            concat(m.first_name,' ',m.last_name) as "Manager Name",
            e.salary,e.email,e.phone_number,d.department_name,j.job_title,
            l.street_address,l.postal_code,l.city,l.state_province,c.country_name,
            r.region_name
            from employees e inner join departments d
            on e.department_id = d.department_id
            inner join jobs j on j.job_id = e.job_id
            inner join employees m on e.manager_id = m.employee_id
            inner join locations l on d.location_id = l.location_id
            inner join countries c on c.country_id=l.country_id
            inner join regions r on c.region_id = r.region_id `);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

app.get('/:id',async(req,res)=>{
    try{
            const { id } = req.params;
            const result = await pool.query(`  select e.employee_id,concat(e.first_name,' ',e.last_name) as "Full Name",
            concat(m.first_name,' ',m.last_name) as "Manager Name",
            e.salary,e.email,e.phone_number,d.department_name,j.job_title,
            l.street_address,l.postal_code,l.city,l.state_province,c.country_name,
            r.region_name
            from employees e inner join departments d
            on e.department_id = d.department_id
            inner join jobs j on j.job_id = e.job_id
            inner join employees m on e.manager_id = m.employee_id
            inner join locations l on d.location_id = l.location_id
            inner join countries c on c.country_id=l.country_id
            inner join regions r on c.region_id = r.region_id 
            where e.employee_id=$1`,[id]);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//Employees API's
app.get('/employees',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

app.get('/employees/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const result = await pool.query('select * from employees where employee_id = $1',[id]);
        if(result.rows.length==0)
        {
            return res.status(404).json({"Error":"NOT FOUND"});
        }
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//Departments
app.get('/dpt',async(req,res)=>{
    try{
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//locations
app.get('/loc',async(req,res)=>{
    try{
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//Jobs
app.get('/jb',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//regions
app.get('/rg',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//countries
app.get('/crt',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//Job History
app.get('/jh',async(req,res)=>{
    try{
        const result = await pool.query('select * from job_history');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});












const PORT = process.env.PORT | 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
});