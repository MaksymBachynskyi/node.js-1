import yargs from 'yargs';
import { program } from 'commander';
import * as contacts from './contacts.js';

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, ...data }) {
	switch (action) {
		case 'list':
			contacts.listContacts().then(console.table);
			break;

		case 'get':
			contacts.getContactById(id).then(console.log);
			break;

		case 'add':
			contacts.addContact(data).then(console.log);
			break;

		case 'remove':
			contacts.removeContact(id).then(console.log);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}
invokeAction(argv);
