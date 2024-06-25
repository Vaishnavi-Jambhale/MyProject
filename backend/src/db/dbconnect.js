const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection = async() =>{
    try {
       await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log('connection establish succesfully');
    } catch (error) {
        console.log('error occurs in dbconnection :' ,error );
    }
}

module.exports = dbConnection