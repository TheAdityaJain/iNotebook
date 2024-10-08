import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type:string,
        required:true,
    },
    description:{
        type:String,
        required: true
    },
    tags:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('notes',NotesSchema) 