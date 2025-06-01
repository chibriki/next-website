### DB Init

In order to initialize a MySQL db do the following steps:

1. Run comman `cd webstie`

2. Create a .env file where you define: `DATABASE_URL="mysql://user:password@localhost:3306/dbname"`

3. Run `npx prisma db push` to initialize db. The schemas defined in prisma/schema.prisma

Now you can check the db using Dbever or other tools.

Also, prisma provides with the UI for db interactions. To reach it you can run `npx prisma studio`