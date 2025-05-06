const { prisma } = require('./lib/db.ts');

async function test() {
  const lifts = await prisma.users.findMany({
  });
  console.log("говно");
}

test().catch(console.error);