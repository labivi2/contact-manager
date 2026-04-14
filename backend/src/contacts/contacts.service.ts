import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  private contacts: any[] = [];
  private id = 1;

  findAll() {
    return this.contacts;
  }

  findOne(id: number) {
    return this.contacts.find(contact => contact.id === id);
  }

  create(contact: any) {
    const newContact = {
      id: this.id++,
      ...contact,
    };

    this.contacts.push(newContact);
    return newContact;
  }

  update(id: number, data: any) {
    const contact = this.contacts.find(c => c.id === id);

    if (!contact) {
      return { message: 'Contact not found' };
    }

    Object.assign(contact, data);
    return contact;
  }

  remove(id: number) {
    const index = this.contacts.findIndex(c => c.id === id);

    if (index === -1) {
      return { message: 'Contact not found' };
    }

    const deleted = this.contacts.splice(index, 1);
    return deleted[0];
  }
}