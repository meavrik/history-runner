
import { Person } from "app/life/person";

export class Family {
    head: Person;
    members: Person[] = [];

    constructor() {
        this.members = [];
    }

    addMember(member: Person) {
        if (!this.members.length) {
            this.head = member;
        }
        this.members = [...this.members, member];
    }

    removeMember(member: Person) {
        if (member == this.head && this.members.length > 1) {
            this.head = this.members[1];
        }
        this.members.splice(this.members.indexOf(member), 1);
        this.members = [...this.members];
    }

    get name(): string {
        return this.head ? this.head.lastName : '';
    }

}