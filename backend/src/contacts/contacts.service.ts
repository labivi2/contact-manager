import { Injectable } from '@nestjs/common';

type Contact = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
};

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];
  private id = 1;

  findAll() {
    return this.contacts;
  }

  create(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = {
      id: this.id++,
      ...contact,
    };

    this.contacts.push(newContact);
    return newContact;
  }
}