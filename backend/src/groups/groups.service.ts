import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
  private groups: any[] = [];
  private id = 1;

  findAll() {
    return this.groups;
  }

  findOne(id: number) {
    return this.groups.find(g => g.id === id);
  }

  create(group: any) {
    const newGroup = { id: this.id++, ...group };
    this.groups.push(newGroup);
    return newGroup;
  }

  update(id: number, data: any) {
    const group = this.groups.find(g => g.id === id);
    if (!group) return null;

    Object.assign(group, data);
    return group;
  }

  remove(id: number) {
    const index = this.groups.findIndex(g => g.id === id);
    if (index === -1) return null;

    return this.groups.splice(index, 1);
  }
}