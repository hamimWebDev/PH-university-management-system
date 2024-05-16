import { Schema, model, connect } from 'mongoose'

export type Student = {
  id: string
  name: {
    firstName: string
    MiddleName: string
    LastName: string
  }
  gender: 'Male' | 'Female'
  darthOfBarth: string
  email: string
  avatar?: string
  contactNum: string
  emergencyContactNum: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: {
    fatherName: string
    motherName: string
  }
  profilePhoto: string
  isActive?: "active" | "inActive"
  
}
