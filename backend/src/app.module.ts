import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [ContactsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
