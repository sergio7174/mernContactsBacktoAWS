import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import Contact from './../models/ContactModel';

class ContactController {
  async index(req: Request, res: Response) {
    const contacts = await Contact.find();
    
    //console.log("Estoy en contactController - line 10 - contacts:"+contacts[0].name)

    //res.json(contacts);
    res.status(200).json(contacts);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  async store(req: Request, res: Response) {
    const { name, email, phone, category } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (email) {
      const emailAlreadyExists = await Contact.findOne({ email });

      if (emailAlreadyExists) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }
    
    const imagePath = req.file?.filename;
    console.log ("Estoy en contactController - line 45 - imagePath:"+imagePath);

    const contact = await Contact.create({
      name, email, phone, category, imagePath
    });

    res.status(201).json(contact);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const { name, email, phone, category } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (email) {
      const emailAlreadyExists = await Contact.findOne({ email });

      if (emailAlreadyExists && emailAlreadyExists.id !== id) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }

    const imagePath = req.file?.filename;
    await Contact.findByIdAndUpdate(id, {
      name, email, phone, category, imagePath
    });

    res.sendStatus(204);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    await Contact.findByIdAndDelete(id);

    res.sendStatus(204);
  }
  
  
}

export default new ContactController();