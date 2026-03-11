import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  await prisma.teamMember.createMany({
    data: [
      { name: "Mike Chen",   role: "Salesperson",     email: "mike@dhooma.com",  initials: "MC" },
      { name: "Ravi Kumar",  role: "Salesperson",     email: "ravi@dhooma.com",  initials: "RK" },
      { name: "Priya Singh", role: "DigitalMarketer", email: "priya@dhooma.com", initials: "PS" },
      { name: "Arjun Nair",  role: "Manager",         email: "arjun@dhooma.com", initials: "AN" },
      { name: "Meera Das",   role: "Salesperson",     email: "meera@dhooma.com", initials: "MD" },
    ],
    skipDuplicates: true,
  });

  const leads = await Promise.all([
    prisma.lead.create({ data: { name: "Sneha Patel",  phone: "+91 8606 200441", email: "snehapatel@gmail.com", source: "Facebook",  status: "QUALIFIED",    assignTo: "Sneha Patel" } }),
    prisma.lead.create({ data: { name: "Ravi Kumar",   phone: "+91 9876 543210", email: "ravi@gmail.com",       source: "Instagram", status: "NEW",          assignTo: "Mike Chen"   } }),
    prisma.lead.create({ data: { name: "Priya Singh",  phone: "+91 9123 456789", email: "priya@gmail.com",      source: "Google",    status: "PENDING",      assignTo: "Sneha Patel" } }),
    prisma.lead.create({ data: { name: "Arjun Nair",   phone: "+91 9988 776655", email: "arjun@gmail.com",      source: "Facebook",  status: "DISQUALIFIED", assignTo: "Mike Chen"   } }),
  ]);

  await prisma.timelineEvent.create({
    data: {
      leadId: leads[0].id,
      title: "Lead Created",
      description: "Lead created via Facebook campaign",
      performedBy: "System",
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
