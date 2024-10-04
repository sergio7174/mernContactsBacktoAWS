import { Schema, model } from 'mongoose';


export interface Contacts {
   
    name: string;
    phone: string;
    category: string;
    email: string;
    imagePath: string;
    
  }

  const ContactsSchema = new Schema<Contacts>(
    {
     
      name:      { type: String, required: true },
      phone:     { type: String},
      email:     { type: String },
      category:  { type: String },
      imagePath: { type: String },
    },
    {
      timestamps: true,
    }
  );

  const Contact = model<Contacts>('Contact', ContactsSchema);

  export default Contact;


